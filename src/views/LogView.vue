<template>
  <PageLayout :bg="bg" :small-bg="smallBg" :title="title" :active="active">
    <template #subtitle>
      <p>{{ string }}</p>
    </template>
  </PageLayout>
</template>

<script setup lang='ts'>
import logBg from '../assets/log_bg.webp';
import logBgTiny from '../assets/log_bg_tiny.webp?inline';
import PageLayout from '../components/PageLayout.vue';
//使用pinia控制标题
import { useHideStore } from '../stores';
const name = 'log'
const active = 'log'  //控制导航栏地址
const hidestore = useHideStore()
const title = hidestore.TitleMap[name].hide
const string = hidestore.TitleMap[name].string[0]
const bg = logBg
const smallBg = logBgTiny
</script>
