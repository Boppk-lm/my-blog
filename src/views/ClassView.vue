<template>
  <PageLayout :bg="bg" :small-bg="smallBg" :title="title" :active="active">
    <template #subtitle>
      <p>{{ string }}</p>
    </template>
  </PageLayout>
</template>

<script setup lang='ts'>
import classBg from '../assets/class_bg.webp';
import classBgTiny from '../assets/class_bg_tiny.webp?inline';
import PageLayout from '../components/PageLayout.vue';
//使用pinia控制标题
import { useHideStore } from '../stores';
const name = 'class'
const active = 'class'  //控制导航栏地址
const hidestore = useHideStore()
const title = hidestore.TitleMap[name].hide
const string = hidestore.TitleMap[name].string[0]
const bg = classBg
const smallBg = classBgTiny
</script>
