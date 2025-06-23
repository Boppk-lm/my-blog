<template>
    <svg aria-hidden="true">
        <use :xlink:href="iconHref" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

// 父组件传入参数
const props = defineProps({
    iconName: {
        type: String,
        required: true // 必须传入
    },
})
// 图标在 iconfont 中的名字
const iconHref = computed(()=>{
  return `#${props.iconName}`
})
</script>

<style scoped>

</style>