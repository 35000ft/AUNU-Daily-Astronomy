<template>
  <div class="image-reader">
    <!-- 图片展示区域 -->
    <div class="image-container">
      <span class="spinner-wrapper" v-show="showLoading">
        <span class="spinner-container">
          <q-spinner
            color="primary"
            size="3em"
          />
        </span>
      </span>

      <span v-viewer v-for="img in cachedImages" :key="img"
            v-show="shownImageUrl===img"
            class="image-wrapper"
            :style="imageStyles">
              <img draggable="false" :src="img" :alt="img" class="image"
                   @load="onImageLoad(img)" @error="onloadImgError(img)">
      </span>

    </div>

    <!-- 页码和翻页控制 -->
    <div class="pagination">
      <q-btn
        flat
        icon="chevron_left"
        @click="prevPage"
        :disabled="currentPage === 0"
      />
      <span>{{ currentPage + 1 }} / {{ images.length }}</span>
      <q-btn
        flat
        icon="chevron_right"
        @click="nextPage"
        :disabled="currentPage === images.length - 1"
      />
    </div>

    <!-- 图片缩放控件 -->
    <!--    <div class="zoom-controls">-->
    <!--      <q-btn flat icon="zoom_in" @click="zoomIn"/>-->
    <!--      <q-btn flat icon="zoom_out" @click="zoomOut"/>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {ref, computed, watch, reactive, defineComponent} from 'vue';
import {QBtn} from 'quasar';

import LRUCache from "src/util/LRU.js";

// 接收图片地址数组的props
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  showImage: {
    type: String,
    default: null
  },
});

const handleSwipe = (event) => {
  if (event.direction === 'left') {
    prevPage()
    // 执行左滑操作
  } else if (event.direction === 'right') {
    // 执行右滑操作
    nextPage()
  }
}

const cachedImages = ref([])
const LRUImages = new LRUCache(10)
// 当前显示的图片页码
const currentPage = ref(0);

// 当前的缩放比例
const zoomLevel = ref(1);
const loadingMap = ref(new Map())

// 控制图片样式的计算属性
const imageStyles = computed(() => ({
  transform: `scale(${zoomLevel.value})`,
  transition: 'transform 0.2s ease'
}));

const nextPageImg = computed(() => {
  if (currentPage.value < props.images.length) {
    return props.images[currentPage.value + 1]
  }
  return null
})

const shownImageUrl = computed(() => {
  return props.images[currentPage.value]
})
watch(shownImageUrl, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    addCacheImage(newVal)
  }
  if (nextPageImg.value) {
    addCacheImage(nextPageImg.value)
  }
})


const addCacheImage = (imgUrl) => {
  if (!LRUImages.has(imgUrl)) {
    const tobeReplacedKey = LRUImages.getTobeReplacedKey()
    if (tobeReplacedKey) {
      const deleteIndex = cachedImages.value.findIndex(it => it === tobeReplacedKey)
      if (deleteIndex !== -1) {
        cachedImages.value.splice(deleteIndex, 1)
      }
    }
    console.log('load addCacheImage', imgUrl)
    cachedImages.value.push(imgUrl)
    onImageLoading(imgUrl)
  }
  LRUImages.set(imgUrl, true)
}

// 上一页
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < props.images.length - 1) {
    currentPage.value++;
  }
};

// 放大图片
const zoomIn = () => {
  zoomLevel.value += 0.1;
};

// 缩小图片
const zoomOut = () => {
  if (zoomLevel.value > 0.2) {
    zoomLevel.value -= 0.1;
  }
};

const emit = defineEmits(["errorLoad"])

// 控制 loading 状态
const showLoading = computed(() => {
  const _shownImageUrl = shownImageUrl.value
  const x = loadingMap.value.has(_shownImageUrl)
  console.log('showLoading', x)
  return x
})

const onloadImgError = (imgUrl) => {
  loadingMap.value.delete(imgUrl)
  emit('errorLoad', imgUrl)
}

// 图片加载成功的回调
const onImageLoad = (imgUrl) => {
  setTimeout(() => {
    console.log('loaded', imgUrl)
    loadingMap.value.delete(imgUrl)
  }, 500)
};
const onImageLoading = (imgUrl) => {
  console.log('loading', imgUrl)
  loadingMap.value.set(imgUrl, true)
};
</script>

<style scoped>
.image-reader {
  max-width: 100%;
  height: 80vh;
  margin: 0 auto;
  position: relative;
  text-align: center;
}

.image-container {
  width: 100%;
  height: 90%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  max-width: 100%;
  max-height: 100%;
}


.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.zoom-controls {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.q-btn {
  margin: 0 5px;
}

.spinner-wrapper {
  position: absolute;
  background-color: #dfdfdf;
  z-index: 10;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-container {
}
</style>
