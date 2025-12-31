<template>
        <div class="postcount">
                <div class="count">
                        <!-- 文章详情 -->
                        <el-row :gutter="20">
                                <el-col :span="24">
                                        <div class="grid-content ep-bg-purple">
                                                <el-page-header @back="goBack" icon="" title="返回">
                                                        <template #content>
                                                                <span class="text-large font-600 mr-3"> {{ tag }}
                                                                </span>
                                                        </template>

                                                </el-page-header>
                                                <!-- 内容 -->
                                                <div class="mt-4 text-sm article-content" v-html="postContent">
                                                </div>
                                        </div>
                                </el-col>
                        </el-row>
                </div>
                <div class="sidebar">
                        <My></My>
                </div>

        </div>
</template>

<script setup lang='ts'>
import My from '../../components/post/My.vue';
// 接收文章
import { useRoute } from 'vue-router';
import { useListStore } from '../../stores';
import { onMounted, ref } from 'vue';
import type { ListItem } from '../../stores/ListStore';
//引入 Markdown 渲染器
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
const route = useRoute()
const ListStore = useListStore()
const postContent = ref(''); // 存储文章内容 HTML
const tag = ref('')
const article = ref<ListItem>(); // 存储整篇文章对象
onMounted(() => {
        // 获取文章的id
        const post_id = parseInt(route.params.id as string)
        article.value = ListStore.ListMap.find(item => item.id === post_id)
        if (article.value) {
                // 把markdown字符串渲染成HTML
                postContent.value = md.render(article.value.post)
                tag.value = article.value.tag
        } else {
                postContent.value = ` <div class="not-found">
        <h3>文章未找到</h3>
        <p>抱歉，您请求的文章不存在或已被删除</p>
      </div>`
        }
})

const goBack = () => {
        window.history.back();
}
</script>

<style lang="less" scoped>
//文章列表展示布局
.postcount {
        display: flex;

        .count {
                flex: 0 0 70%; // 🔥 真正控制宽度
                min-width: 0; // 防止溢出

                // 文章内容样式
                :deep(.article-content) {
                        padding: 10px;
                        margin-top: 20px;
                        line-height: 1.8;
                        color: #333;
                        font-size: 18px;
                        border: 1px solid #eaeaea;

                        h3 {
                                font-size: 1.8rem;
                                padding-bottom: 0.5rem;
                                color: #2c3e50;
                                font-weight: 600;
                        }

                        h4 {
                                font-size: 1.5rem;
                                margin: 2rem 0 1.2rem;
                                color: #34495e;
                                font-weight: 600;
                        }

                        p {
                                margin: 1.2rem 0;
                                font-size: 1.1rem;
                                color: #444;
                        }

                        ul,
                        ol {
                                margin: 1.2rem 0;
                                padding-left: 2rem;

                                li {
                                        margin: 0.7rem 0;
                                        line-height: 1.6;
                                }

                                ul,
                                ol {
                                        margin-top: 0.5rem;
                                        margin-bottom: 0.5rem;
                                }
                        }

                        blockquote {
                                background-color: #f9f9f9;
                                border-left: 4px solid #42b983;
                                padding: 1rem 1.5rem;
                                margin: 1.5rem 0;
                                border-radius: 0 4px 4px 0;
                                color: #555;

                                p {
                                        margin: 0.5rem 0;
                                }
                        }

                        pre {
                                background-color: #f8f8f8;
                                border-radius: 6px;
                                padding: 1.2rem;
                                margin: 1.5rem 0;
                                overflow: auto;
                                border: 1px solid #eaeaea;

                                code {
                                        font-family: 'Fira Code', 'Source Code Pro', monospace;
                                        font-size: 0.95rem;
                                        line-height: 1.5;
                                        color: #333;
                                }
                        }

                        .hljs {
                                background: transparent;
                                padding: 0;
                        }

                        a {
                                color: #3498db;
                                text-decoration: none;
                                transition: color 0.2s;

                                &:hover {
                                        color: #2980b9;
                                        text-decoration: underline;
                                }
                        }

                        strong {
                                // color: #e74c3c;
                                font-weight: 600;
                        }
                }

                .el-col {
                        margin-bottom: 20px;
                }

                .grid-content {
                        padding: 30px;
                        border-radius: 10px;
                        min-height: 320px;
                        background-color: #fff;

                }
        }

        .sidebar {
                flex: 0 0 30%; // 🔥 真正控制宽度
                min-width: 0;
        }

        .sidebar>* {
                width: 100%; // 🔥 强制 My 铺满
        }
}

@media (max-width: 768px) {
        .postcount {
                overflow-x: hidden;
                flex-direction: column;

                .count {
                        flex: 0 0 100%;

                        // 头部消失
                        :deep(.el-page-header) {
                                display: none;
                        }

                        :deep(.article-content) {
                                padding: 5px;
                                margin-top: 0px;

                                h3 {
                                        font-size: 1.2rem;
                                }

                                h4 {
                                        font-size: 1.2rem;
                                }

                                p {
                                        font-size: 1rem;
                                }

                                pre {
                                        margin: 1rem 0;
                                }
                        }


                        .grid-content {
                                padding: 5px;
                        }
                }

                .sidebar {
                        display: none;
                }
        }

}
</style>