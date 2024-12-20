<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          紫台有礼
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
          style="background-color:var(--q-primary);color: #ffffff"
        >
          更多资讯
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Github仓库',
    caption: 'AUNU-Daily-Astronomy',
    icon: 'code',
    link: 'https://github.com/BI7AQU/AUNU-Daily-Astronomy'
  },
  {
    title: '投稿邮箱',
    caption: '文章：mint20051018@outlook.com\n' +
      '图片：steveling0231@foxmail.com',
    icon: 'email',
    link: null
  },
  {
    title: '同好QQ群',
    caption: '62116624',
    icon: 'fa-brands fa-qq',
    link: 'https://forum.quasar.dev'
  },
  {
    title: '微信公众号',
    caption: '南天联',
    icon: 'fa-brands fa-weixin',
    link: 'http://weixin.qq.com/r/mp/I0wuKkjE24CnKQxJbxmn'
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
