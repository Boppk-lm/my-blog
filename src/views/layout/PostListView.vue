<template>
        <div class="postlist">
                <div class="post">
                        <el-row :gutter="20">
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

</script>

<style lang="less" scoped>
.postlist {
        display: flex;
        .post {
                width: 70%;
                .el-col {
                        border-radius: 4px;
                        margin-bottom: 20px;
                }
                .grid-content {
                        border-radius: 4px;
                        min-height: 320px;
                        background-color: pink;
                }
        }

        .my {
                width: 30%;
                .el-row {
                        margin-left: 20px;
                }
                .el-col {
                        border-radius: 4px;
                        margin-bottom: 20px;
                }

                .grid-content {
                        border-radius: 4px;
                        min-height: 360px;
                        background-color: blue;
                }
        }

}
</style>
