<template>
        <div class="postlist">
                <div class="post">
                        <!-- 文章列表 -->
                        <el-row :gutter="20">
                                <el-col :span="8">
                                        <div class="grid-content ep-bg-purple">
                                                <List />
                                        </div>
                                </el-col>
                                <el-col :span="8">
                                        <div class="grid-content ep-bg-purple" />
                                </el-col>
                                <el-col :span="8">
                                        <div class="grid-content ep-bg-purple" />
                                </el-col>
                                <el-col :span="8">
                                        <div class="grid-content ep-bg-purple" />
                                </el-col>
                                <el-col :span="8">
                                        <div class="grid-content ep-bg-purple" />
                                </el-col>
                        </el-row>
                </div>
                <My/>
        </div>

</template>

<script setup lang='ts'>
import List from '../../components/post/List.vue';
import My from '../../components/post/My.vue';
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
