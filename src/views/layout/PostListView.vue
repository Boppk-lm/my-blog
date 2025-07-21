<template>
        <div class="postlist">
                <div class="post" >
                        <!-- 文章列表 -->
                        <el-row :gutter="20">
                                <el-col :span="8" v-for="item in ListMap" :key="item.id">
                                        <div class="grid-content ep-bg-purple">
                                                <List :ListMap="item" />
                                        </div>
                                </el-col>
                        </el-row>
                </div>
                <My/>
        </div>

</template>

<script setup lang='ts'>
import { reactive } from 'vue';
import List from '../../components/post/List.vue';
import My from '../../components/post/My.vue';
//用pinia控制文章列表
import { useListStore } from '../../stores';
const ListStore = useListStore()
const ListMap = reactive(ListStore.ListMap)
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
