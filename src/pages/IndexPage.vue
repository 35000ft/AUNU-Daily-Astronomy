<template>
  <q-page class="flex flex-center">
    <ImageViewer :images="images" @error-load="handleErrorImage"/>
  </q-page>
</template>

<script setup>
import ImageViewer from "components/ImageViwer.vue";
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import axios from "axios";
import {isDateGreaterThanToday} from "src/util/time-utils.js";

onMounted(() => {
  init()
})
const instance = getCurrentInstance();

// 访问全局属性
const config = instance.appContext.config.globalProperties.$config;
const KNOWN_FILES_KEY = 'known-archive-files'
const images = computed(() => {
  // sort by date desc
  return Array.from(knownArchiveFiles.value.values()).sort((o1, o2) => {
    const _key1 = o1.split('_')[1]
    const _key2 = o2.split('_')[1]
    if (_key1 && _key2) {
      return _key2.localeCompare(_key1)
    } else {
      return 0
    }
  })
})
const knownArchiveFiles = ref(new Set())
const init = () => {
  const _knownArchiveFiles = JSON.parse(localStorage.getItem(KNOWN_FILES_KEY))
  if (_knownArchiveFiles instanceof Array) {
    _knownArchiveFiles.forEach(it => knownArchiveFiles.value.add(it))
  }
  axios.get('known-archive-files.json').then(res => {
    const _knownArchiveFiles = res.data.map(it => 'archive/' + it)
    addKnownFiles(_knownArchiveFiles)
  })
  setTimeout(() => {
    tryFindImages()
  }, 1000)
}
const addKnownFiles = (urls) => {
  if (urls instanceof Array) {
    urls.forEach(it => knownArchiveFiles.value.add(it))
    localStorage.setItem(KNOWN_FILES_KEY, JSON.stringify(Array.from(knownArchiveFiles.value.values())))
  } else if (typeof urls === "string") {
    knownArchiveFiles.value.add(urls)
    localStorage.setItem(KNOWN_FILES_KEY, JSON.stringify(Array.from(knownArchiveFiles.value.values())))
  }
}

const tryFindImages = async () => {
  const _images = images.value
  if (_images.length === 0) {
    return
  }
  console.log('try find')
  // get date Daily Astronomy_2024-12-05.jpg->2024-12-05
  let maxDate = new Date(_images[0].split('_')[1].substring(0, 10))
  while (true) {
    const nextDate = new Date(maxDate.setDate(maxDate.getDate() + 1))
    if (isDateGreaterThanToday(nextDate)) {
      return
    }
    // const nextDateStr = nextDate.toISOString().substring(0, 10) // pattern: 2024-01-01
    const nextDateStr = `${(nextDate.getMonth() + 1).toString().padStart(2, '0')}.${nextDate.getDate().toString().padStart(2, '0')}` //  pattern: 12.01
    maxDate = nextDate
    const IMAGE_FILE_PREFIX = config['imageFilePrefix'] || 'Daily Astronomy_'
    const IMAGES_SOURCES = config['imageSources'] || ['/']
    for (let source of IMAGES_SOURCES) {
      let url = `${source}${IMAGE_FILE_PREFIX}${nextDateStr}.jpg`;
      try {
        const res = await axios.get(url, {responseType: 'blob'});
        let contentType = res.headers['content-type'];
        if (contentType && contentType.startsWith('image')) {
          addKnownFiles(url);
          break;
        }
      } catch (error) {
        console.warn('get image err, url:', url, error)
      }
    }
  }

}

const handleErrorImage = (imgUrl) => {
  knownArchiveFiles.value.delete(imgUrl)
  localStorage.setItem(KNOWN_FILES_KEY, JSON.stringify(Array.from(knownArchiveFiles.value.values())))
}

</script>
