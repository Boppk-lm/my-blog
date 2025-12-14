<template>
        <div class="postlist">
                <div class="post">
                        <!-- 文章列表 -->
                        <el-row :gutter="20">
                                <el-col v-for="item in ListMap" :key="item.id" :xs="24" :sm="12" :md="8">
                                        <div class="grid-content ep-bg-purple">
                                                <List :ListMap="item" />
                                        </div>
                                </el-col>
                        </el-row>


                </div>
                <!-- 个人信息 -->
                <div class="sidebar">
                        <My />
                </div>

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
                flex: 0 0 70%; // 🔥 真正控制宽度
                min-width: 0; // 防止溢出

                .el-col {
                        margin-bottom: 20px;
                }

                .grid-content {
                        border-radius: 10px;
                        min-height: 320px;
                        background-color: #fff;
                }
        }

        .sidebar {
                flex: 0 0 30%;
                min-width: 0;
        }

        .sidebar>* {
                width: 100%; // 🔥 强制 My 铺满
        }

}

// 移动端适配
@media (max-width: 768px) {
        .postlist {
                flex-direction: column;

                .post,
                .sidebar {
                        flex: 0 0 100%;
                }

                .sidebar {
                        order: -1; // 将侧边栏放在顶部
                }

                .post {
                        padding: 10px;

                        .el-col {
                                margin-bottom: 16px;
                        }

                        .grid-content {
                                border-radius: 10px;

                        }
                }
        }
}
</style>
