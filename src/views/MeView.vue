<template>
  <PageLayout :bg="bg" :small-bg="smallBg" :title="title" :active="active">
    <template #subtitle>
      <p>{{ string }}</p>
    </template>
  </PageLayout>
</template>

<script setup lang='ts'>
import meBg from '../assets/me_bg.webp';
import meBgTiny from '../assets/me_bg_tiny.webp';
import PageLayout from '../components/PageLayout.vue';
//使用pinia控制标题
import { useHideStore } from '../stores';
const name = 'me'
const active = 'me'  //控制导航栏地址
const hidestore = useHideStore()
const title = hidestore.TitleMap[name].hide
const string = hidestore.TitleMap[name].string[0]
const bg = meBg
const smallBg = meBgTiny
</script>
