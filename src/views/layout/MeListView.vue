<template>
        <div class="melist">
                <!-- 欢迎卡片 -->
                <el-row :gutter="25">
                        <!-- 欢迎词 -->
                        <el-col :span="14">
                                <div class="grid-content ep-bg-purple"
                                        style="background: linear-gradient(to right, #BA68C8, #FFB74D);">
                                        <div class="wecome">
                                                <div class="wecome-title">欢迎来到我的博客</div>
                                                <span style="color: #F8BBD0;">一个热爱前端的小男孩</span>
                                                <el-icon size="96" class="icon">
                                                        <SvgIcon iconName="icon-caihong1"></SvgIcon>
                                                </el-icon>
                                        </div>
                                </div>
                        </el-col>
                        <!-- 个人信息 -->
                        <el-col :span="10">
                                <div class="grid-content ep-bg-purple">
                                        <div class="info">
                                                <div>
                                                        <span class="info-title">星座</span>
                                                        <br>
                                                        <span class="info-content" style="color: #E53935;">白羊</span>
                                                </div>
                                                <div>
                                                        <span class="info-title">来自</span>
                                                        <br>
                                                        <span class="info-content" style="color: #5C6BC0;">江苏</span>
                                                </div>
                                                <div>
                                                        <span class="info-title">保持热爱</span>
                                                        <br>
                                                        <span class="info-content" style="color: #9C27B0;">游戏人间</span>
                                                </div>
                                        </div>
                                </div>
                        </el-col>
                </el-row>
                <!-- 人格测试 -->
                <el-row :gutter="20">
                        <!-- 测试结果 -->
                        <el-col :span="12">
                                <div class="grid-content ep-bg-purple" style="min-height: 196px;">
                                        <div class="selfhood">
                                                <span style="font-size: 14px;">人格</span>
                                                <div class="self">
                                                        <span>提倡者</span>
                                                        <br>
                                                        <span style="color: aquamarine;">INFJ-T</span>
                                                </div>
                                                <div class="test">
                                                        <span>去</span>
                                                        <a href="https://www.16personalities.com/ch">
                                                                <img src="../../assets/test.svg" alt="测试"
                                                                        style="width: 100px;vertical-align: middle ">
                                                        </a>
                                                        <span> 免费测试人格</span>
                                                </div>
                                                <div class="selfhood-cover">
                                                        <img src="../../assets/selfhood.jpg" alt="">
                                                </div>
                                        </div>
                                </div>
                        </el-col>
                        <!-- 进度条 -->
                        <el-col :span="12">
                                <div class="grid-content ep-bg-purple" style="min-height: 196px;">
                                        <div class="demo-progress">

                                                <div class="progress" style="margin-top: 4px;">
                                                        <el-progress :percentage="64" :text-inside="true"
                                                                class="flash-progress" striped striped-flow
                                                                :show-text="false" />
                                                        <div class="title">
                                                                <span>外向 64%</span>
                                                                <span>内向 36%</span>
                                                        </div>
                                                </div>
                                                <div class="progress">
                                                        <el-progress :percentage="51" :text-inside="true" striped
                                                                striped-flow color="#e4ae3a" :show-text="false" />
                                                        <div class="title">
                                                                <span>天马行空 51%</span>
                                                                <span>求真务实 49%</span>
                                                        </div>
                                                </div>
                                                <div class="progress">
                                                        <el-progress :percentage="57" :text-inside="true" striped
                                                                striped-flow color="#33a474" :show-text="false" />
                                                        <div class="title">
                                                                <span>理性思考 57%</span>
                                                                <span>情感细腻 43%</span>
                                                        </div>
                                                </div>
                                                <div class="progress">
                                                        <el-progress :percentage="53" :text-inside="true" striped
                                                                striped-flow color="#88619a" :show-text="false" />
                                                        <div class="title">
                                                                <span>运筹帷幄 53%</span>
                                                                <span>随机应变 47%</span>
                                                        </div>
                                                </div>
                                                <div class="progress">
                                                        <el-progress :percentage="56" :text-inside="true" striped
                                                                striped-flow color="#f25e62" :show-text="false" />
                                                        <div class="title">
                                                                <span>自信果断 56%</span>
                                                                <span>情绪易波动 44%</span>
                                                        </div>
                                                </div>

                                        </div>
                                </div>
                        </el-col>
                </el-row>
                <!-- 关于我的 -->
                <el-row :gutter="20">
                        <!-- 想说的话 -->
                        <el-col :span="16">
                                <div class="grid-content ep-bg-purple" style="min-height: 300px;">
                                <div class="talk">
                                            <div class="decoration top-left">✍️</div>
        <div class="decoration bottom-right">🌍</div>
        
        <div class="welcome-text">嗨，你好呀！</div>
        
        <p>欢迎光临我的小天地！很高兴你能来到这里。</p>
        <p>这里主要分享 [我的编程学习笔记/旅行见闻/读书心得/生活随笔]。</p>
        <p>希望你能找到感兴趣的内容，也欢迎随时交流~<span class="emoji">😊</span></p>
        
                                </div>
                                </div>
                        </el-col>
                        <!-- 标签云 -->
                        <el-col :span="8">
                                <div class="grid-content ep-bg-purple" style="min-height: 300px; display: flex;">
                                        <div class="tag-cloud" id="tagcloud">
                                        </div>
                                </div>
                        </el-col>
                </el-row>
        </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
// 引入标签云
import TagCloud from 'TagCloud'
onMounted(() => {
        const container = document.querySelector('#tagcloud')
        const texts = [
                'Vue', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Pinia', 'GitHub', 'Git',
                '博客', '前端', '动漫', '小说', '理想主义'
        ]

        const options = {
                radius: 140,
                maxSpeed: 'fast',
                initSpeed: 'slow',
                direction: 135,
                keep: true
        }
        // @ts-ignore 跳过检查
        TagCloud(container, texts, options)
          // 使用 MutationObserver 监听 <span> 是否出现
  const observer = new MutationObserver(() => {
    const spans = document.querySelectorAll('#tagcloud span')
    if (spans.length > 0) {
      spans.forEach(span => {
        const rand = (Math.random() * 0.5 + 0.5).toFixed(2)
        span.setAttribute('style', `--scale: ${rand}`)
      })
      observer.disconnect() // 完成后停止监听
    }
  })

  observer.observe(container!, { childList: true, subtree: true })
})
</script>

<style lang="less" scoped>
// 流动条动画变慢
@keyframes slowFlow {
        0% {
                background-position: 0 0;
        }

        100% {
                background-position: 60px 0;
        }
}

.melist {
        .el-row {
                margin-bottom: 20px;
        }

        .el-col {
                border-radius: 5px;
        }

        .grid-content {
                padding: 10px;
                border-radius: 5px;
                min-height: 95px;
                background-color: #fff;
        }

        .wecome {
                position: relative;

                .wecome-title {
                             pointer-events: none;
                        margin-bottom: 5px;
                        font-size: 32px;
                        font-weight: 700;
                        color: #fff;
                }

                .icon {
                        position: absolute;
                        right: -5px;
                        top: -10px;
                }
        }

        .info {
                display: flex;
                justify-content: space-between;

                .info-title {
                        font-size: 12px;
                }

                .info-content {
                        font-weight: 700;
                        font-size: 32px;
                }
        }

        .selfhood {
                position: relative;
                display: flex;
                flex-direction: column;

                .self {
                        margin-top: 20px;
                        margin-bottom: 40px;
                        font-weight: 700;
                        font-size: 32px;
                        line-height: 1;
                }

                .test {
                        font-size: 14px;
                        display: flex;
                        gap: 8px;
                        /* 元素之间的间距 */
                }

                .selfhood-cover {
                        top: -12px;
                        right: -25px;
                        position: absolute;

                        img {
                                height: 200px;
                        }
                }
        }

        .demo-progress {
                .progress {
                        margin-bottom: 8px;

                        .title {
                                display: flex;
                                justify-content: space-between;
                                font-size: 14px;
                        }

                        ::v-deep(.el-progress-bar__inner) {
                                animation: slowFlow 8s linear infinite !important;
                        }
                }
        }
        .talk {
            position: relative;
            padding: 25px;
            font-size: 24px;
            background: white;
            text-align: center;
            line-height: 1.6;
            color: #333;
            // 装饰元素
            .decoration {
                     pointer-events: none;
                position: absolute;
                opacity: 0.1;
                font-size: 80px;
                z-index: 0;
                
                &.top-left {
                    top: -30px;
                    left: -10px;
                }
                
                &.bottom-right {
                    bottom: -30px;
                    right: -10px;
                }
            }
            
            // 欢迎标题
            .welcome-text {
                     pointer-events: none;
                font-size: 34px;
                font-weight: bold;
                margin-bottom: 15px;
                background: linear-gradient(90deg, #ff758c 0%, #ff7eb3 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            
            // 表情
            .emoji {
                font-size: 32px;
                display: inline-block;
                margin: 0 4px;
            }
            
            
            p {
                margin: 10px 0;
                font-size: 20px;
            }
            
        }
        // 标签云
        .tag-cloud {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;

                :deep(span) {
                        margin: 8px;
                        font-size: calc(14px + 6 * var(--scale));
                        font-weight: 500;
                        color: #444;
                        transition: transform 0.3s ease, color 0.3s ease;
                        cursor: pointer;
                        --scale: 0.5;
                }

                :deep(span:hover) {
                        color: #1976d2;
                        transform: scale(1.2);
                }
        }
}
</style>