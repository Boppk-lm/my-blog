<template>
        <div class="postlist">
                <div class="post">
                        <!-- 文章列表 -->
                        <el-row :gutter="20">
                                <el-col :span="8" v-for="item in ClassList" :key="item.id">
                                        <div class="grid-content ep-bg-purple">
                                                <List :ListMap="item" />
                                        </div>
                                </el-col>
                        </el-row>
                </div>
                <My />
        </div>

</template>

<script setup lang='ts'>
import { computed } from 'vue';
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
</script>

<style lang="less" scoped>
//文章列表展示布局
.postlist {
        display: flex;

        .post {
                width: 70%;

                .el-col {
                        margin-bottom: 20px;
                }

                .grid-content {
                        border-radius: 10px;
                        min-height: 320px;
                        background-color: #fff;
                }
        }
}
</style>
