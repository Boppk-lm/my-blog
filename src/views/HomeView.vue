<template>
  <PageLayout :bg="bg" :small-bg="smallBg" :title="title" :active="active" :bubble="false">
    <template #subtitle>
      <span ref="typingText"></span>
    </template>
  </PageLayout>
</template>

<script setup lang='ts'>
import homeBg from '../assets/home_bg.webp';
import homeBgTiny from '../assets/home_bg_tiny.webp?inline';
import PageLayout from '../components/PageLayout.vue';
import { ref, onMounted, onUnmounted, reactive } from 'vue';
//打字机效果
import Typed from 'typed.js';
//使用pinia控制标题
import { useHideStore } from '../stores';
const name = 'home'
const active = '/'  //控制导航栏地址
const hidestore = useHideStore()
const title = hidestore.TitleMap[name].hide
const string = reactive(hidestore.TitleMap[name].string)
const bg = homeBg
const smallBg = homeBgTiny

const typingText = ref<null | HTMLElement>(null)
onMounted(() => {
  if (typingText.value) {
    const typed = new Typed(typingText.value, {
      strings: string,
      typeSpeed: 100,
      backSpeed: 70,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    })
    // 可选：在组件卸载时销毁 typed 实例，防止内存泄漏
    onUnmounted(() => typed.destroy())
  }
})
</script>
