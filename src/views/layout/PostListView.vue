<template>
        <div class="postlist">
                <div class="post">
                        <el-row :gutter="20">
                                <el-col :span="8">
                                        <div class="grid-content ep-bg-purple">
                                                <List/>
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
                <div class="my">
                        <el-row>
                                <el-col :span="22">
                                        <div class="grid-content ep-bg-purple" />
                                </el-col>
                        </el-row>
                </div>
        </div>

</template>

<script setup lang='ts'>
import List from '../../components/post/List.vue';
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
        .my {
                width: 30%;
                .el-row {
                        margin-left: 20px;
                }
                .el-col {

                        margin-bottom: 20px;
                }
                .grid-content {
                        border-radius: 10px;
                        min-height: 360px;
                        background-color: blue;
                }
        }

}
</style>
