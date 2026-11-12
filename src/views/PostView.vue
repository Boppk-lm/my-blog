<template>
  <PageLayout :bg="bg" :small-bg="smallBg" :title="title" :active="active">
    <template #subtitle>
      <p>{{ string }}</p>
    </template>
  </PageLayout>
</template>

<script setup lang='ts'>
import postBg from '../assets/post_bg.webp';
import postBgTiny from '../assets/post_bg_tiny.webp';
import PageLayout from '../components/PageLayout.vue';
//使用pinia控制标题
import { useHideStore } from '../stores';
const name = 'post'
const active = 'post'  //控制导航栏地址
const hidestore = useHideStore()
const title = hidestore.TitleMap[name].hide
const string = hidestore.TitleMap[name].string[0]
const bg = postBg
const smallBg = postBgTiny
</script>
