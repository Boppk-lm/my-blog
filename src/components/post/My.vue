<template>
        <div class="my">
                <el-row>
                        <!-- 站主 -->
                        <el-col :span="22">
                                <div class="grid-content ep-bg-purple">
                                        <div class="users">
                                                <div class="cover">
                                                        <!-- 头像+呼吸灯效果 -->
                                                        <div class="avatar-wrapper">
                                                                <span class="breath-ring"></span>
                                                                <el-avatar :size="80" :src="nameAvatar" class="name" />
                                                        </div>

                                                </div>

                                                <div class="user">
                                                        <span style="font-size: 24px; font-weight: 700;">{{ name
                                                                }}</span>
                                                        <span>{{ individuality }}</span>
                                                        <div class="count">
                                                                <div>
                                                                        <div class="title">
                                                                                文章
                                                                        </div>
                                                                        <div class="number">
                                                                                20
                                                                        </div>
                                                                </div>
                                                                <div>
                                                                        <div class="title">
                                                                                评论
                                                                        </div>
                                                                        <div class="number">
                                                                                0
                                                                        </div>
                                                                </div>
                                                                <div>
                                                                        <div class="title">
                                                                                分类
                                                                        </div>
                                                                        <div class="number">
                                                                                0
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </el-col>
                        <!-- 公告栏 -->
                        <el-col :span="22">
                                <div class="grid-content ep-bg-purple" style=" min-height: 150px;">
                                        <div class="noticeboard">
                                                <div class="title">
                                                        <el-icon size="22">
                                                                <SvgIcon iconName="icon-tongzhi"></SvgIcon>
                                                        </el-icon>
                                                        <span>公告栏</span>
                                                </div>
                                                <div class="content">
                                                        {{ affiche }}
                                                </div>
                                        </div>
                                </div>
                        </el-col>
                        <!-- 微信二维码 -->
                        <el-col :span="22">
                                <div class="grid-content ep-bg-purple" style=" min-height: 120px;">
                                        <div class="weixin">
                                                <div class="QR"></div>
                                                <div class="search">
                                                        <div class="top">
                                                                <img src="../../assets/weixin.png" alt="">
                                                                <span>微信搜一搜</span>
                                                        </div>
                                                        <div class="bottom">
                                                                <span>
                                                                        <el-icon :size="18" color="#fff">

                                                                                <Search />
                                                                        </el-icon>
                                                                </span>
                                                                <span>南下</span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </el-col>
                </el-row>
        </div>
</template>

<script setup lang='ts'>
import nameAvatar from '@/assets/name.jpg'
//用pinia控制My部分
import { useMyStore } from '../../stores';
import { ref } from 'vue';
const MyStore = useMyStore()
const name = ref(MyStore.name)
const individuality = ref(MyStore.individuality)
const affiche = ref(MyStore.affiche)
</script>

<style lang="less" scoped>
/* 呼吸灯动画 */
@keyframes breath {

        0%,
        100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.4;
        }

        50% {
                transform: translate(-50%, -50%) scale(1.5);
                opacity: 0;
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
                overflow: hidden;
                border-radius: 10px;
                min-height: 360px;
                background-color: #fff;
        }

        //我的信息
        .users {

                //封面头像
                .cover {
                        position: relative;
                        height: 150px;

                        background-image: url('../../assets/blog_meme.gif');
                        background-size: 90%;
                        //   background-size: cover;       /* 图片覆盖整个区域 */
                        background-position: center;
                        /* 图片居中 */
                        background-repeat: no-repeat;

                        /* 禁止重复 */
                        .avatar-wrapper {
                                position: absolute;
                                top: 100px;
                                left: 50%;
                                transform: translateX(-50%);
                                width: 80px;
                                height: 80px;
                                z-index: 1;


                                .breath-ring {
                                        position: absolute;
                                        top: 50%;
                                        left: 50%;
                                        width: 100%;
                                        height: 100%;
                                        transform: translate(-50%, -50%);
                                        border-radius: 50%;
                                        background: rgba(255, 247, 0, 0.9); // 清爽科技蓝
                                        filter: blur(8px);
                                        animation: breath 2.4s ease-in-out infinite;
                                        z-index: 0;
                                }

                                .name {
                                        position: relative;
                                        z-index: 2;
                                }





                        }

                }

                .user {
                        margin-top: 20px;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        .count {
                                pointer-events: none;
                                font-size: 18px;
                                margin-top: 10px;
                                width: 100%;
                                display: flex;
                                justify-content: space-around;
                                text-align: center;
                        }
                }
        }

        //公告栏
        .noticeboard {
                padding: 20px;
                pointer-events: none;

                .title {

                        display: flex;
                        align-items: center;
                        font-weight: 700;

                        span {
                                margin-left: 5px; // 让文字和头像之间留一点间距
                        }
                }

                .content {
                        font-size: 15px;
                        margin-top: 10px;
                }
        }

        //微信
        .weixin {
                display: flex;
                padding: 20px;

                .QR {
                        margin-left: 15px;
                        width: 80px;
                        height: 80px;
                        background-image: url(../../assets/QR.png);
                        background-size: cover;
                        /* 图片覆盖整个区域 */
                        background-position: center;
                        /* 图片居中 */
                        background-repeat: no-repeat;
                        /* 禁止重复 */
                }

                .search {
                        margin-left: 30px;
                        height: 80px;

                        .top {
                                margin-top: -5px;
                                display: flex;
                                align-items: center;

                                img {
                                        width: 40px;
                                        height: 40px;
                                }

                                span {
                                        font-family: "YouYuan";
                                        margin-left: 10px;
                                        font-size: 24px;
                                        font-weight: 600;
                                }
                        }

                        .bottom {
                                margin-top: 5px;
                                width: 100%;
                                height: 40px;
                                display: flex;
                                align-items: center;
                                border-radius: 4px;
                                background-color: #07c160;
                                color: #fff;

                                span {
                                        display: inline-flex;
                                        align-items: center;
                                        line-height: 1;
                                        margin-left: 10px;
                                        font-size: 18px;
                                }
                        }
                }
        }
}
</style>