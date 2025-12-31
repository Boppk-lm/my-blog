<template>
        <div class="postlist">
                <div class="post">
                        <!-- 文章列表 -->
                        <el-row :gutter="20">
                                <el-col :xs="24" :sm="12" :md="8" v-for="item in displayList" :key="item.id">
                                        <div class="grid-content ep-bg-purple">
                                                <List :ListMap="item" />
                                        </div>
                                </el-col>
                        </el-row>
                        <!-- 下拉线 -->
                        <div v-if="showExpand" class="expand-line" @click="expand">
                                <span>{{ '再来一些吧' }}</span>
                                <i v-if="!expanded" class="arrow"></i>
                        </div>
                        <div v-else class="expand-line" style="pointer-events: none;">
                                <span>{{ '就这么多了~' }}</span>
                        </div>
                </div>
                <!-- 个人信息 -->
                <div class="sidebar">
                        <My />
                </div>
        </div>

</template>

<script setup lang='ts'>
import { computed,ref } from 'vue';
import List from '../../components/post/List.vue';
import My from '../../components/post/My.vue';
//获取分类文章列表
import { useListStore } from '../../stores';
import { useRoute } from 'vue-router';
const ListStore = useListStore()
const route = useRoute()
const tagId = parseInt(route.params.id as string)
const ClassList = computed(() => {
        return ListStore.ListMap.filter(item => item.tagId === tagId)
})
// 文章超3行隐藏
const LIMIT = 9
// 控制展开
const expanded = ref(false)
// 展示列表
const displayList = computed(() => {
        if (expanded.value) {
                return ClassList.value
        } else {
                return ClassList.value.slice(0, LIMIT)
        }
})
// 控制显示下拉线
const showExpand = computed(() => {
        return !expanded.value && ClassList.value.length > LIMIT
})
const expand = () => {
        expanded.value = true
}

</script>

<style lang="less" scoped>
 // 统一封装css
@import '@/less/post_layout.less';
</style>
