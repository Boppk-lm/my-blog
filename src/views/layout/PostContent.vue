<template>
        <div class="postcount">
                <div class="count">
                        <!-- 文章详情 -->
                        <el-row :gutter="20">
                                <el-col :span="24">
                                        <div class="grid-content ep-bg-purple">
                                                <el-page-header @back="goBack" icon="" title="返回">
                                                        <template #content>
                                                                <span class="text-large font-600 mr-3"> 技术 </span>
                                                        </template>
                                                        <div class="mt-4 text-sm article-content">

                                                                <h3><a id="_0"></a>何谓缓存？</h3>
                                                                <p>用一个现实生活中的例子类比：</p>
                                                                <p>假如你开了一家小卖部，冰箱中摆满了各种饮料，经过观察，你发现：</p>
                                                                <p>夏天时，每10个顾客里有8个是来买可乐的，而他饮料（比如橙汁、矿泉水）买的人很少，</p>
                                                                <p>一旦冰箱里的可乐售罄，你不得不频繁跑去后面的仓库补货。</p>
                                                                <p>这怎么办呢？</p>
                                                                <p>聪明的你，选择把冰箱里的空间重新分配，80%的位置放可乐，20%的位置放其他饮料。</p>
                                                                <p>效果果然很好，现在可乐很少断货了，不用再频繁跑仓库，顾客也能随时在冰箱中拿到可乐。</p>
                                                                <p>好，回到现实！你现在是一名前/后端开发者：</p>
                                                                <p>把上面的小例子对应到技术场景：</p>
                                                                <p>现实对应：</p>
                                                                <ul>
                                                                        <li>货架 = 浏览器缓存空间</li>
                                                                        <li>可乐 = 高频访问的静态资源（如图片、CSS、JS文件）</li>
                                                                        <li>仓库 = 远程服务器</li>
                                                                        <li>补货 = 重新下载资源</li>
                                                                </ul>
                                                                <p>问题：</p>
                                                                <ul>
                                                                        <li>每次补货都要花时间，顾客得等着</li>
                                                                        <li>你跑来跑去特别累（相当于服务器压力大）</li>
                                                                </ul>
                                                                <p>优化方案：</p>
                                                                <ul>
                                                                        <li>
                                                                                <p>你把货架空间重新分配：</p>
                                                                                <ul>
                                                                                        <li>80%的位置放可乐（高频需求）</li>
                                                                                        <li>20%的位置放其他饮料（低频需求）</li>
                                                                                </ul>
                                                                        </li>
                                                                        <li>
                                                                                <p>这样：</p>
                                                                                <ul>
                                                                                        <li>可乐很少断货了（缓存命中率高）</li>
                                                                                        <li>你不用总跑仓库了（减少服务器请求）</li>
                                                                                        <li>顾客几乎随时都能买到可乐（访问速度快）</li>
                                                                                </ul>
                                                                        </li>
                                                                </ul>
                                                                <p>结果：</p>
                                                                <ul>
                                                                        <li>顾客满意（用户体验好）</li>
                                                                        <li>你轻松（服务器负载低）</li>
                                                                        <li>生意更好了（网站性能提升）</li>
                                                                </ul>
                                                                <p>引用缓存，对双方来说，创建了一种“双赢”的局面，</p>
                                                                <p>缓存让用户体验更加丝滑，同时也使服务器大大减少压力，能服务的更多的用户。</p>
                                                                <h4><a id="_54"></a>浏览器与服务器</h4>
                                                                <p>缓存技术有很多，今天主要分享的是关于网络方面的，</p>
                                                                <p>一个图片文件，从服务器到用户的浏览器中，经历了哪些过程呢？</p>
                                                                <p>浏览器首先发起请求，告诉服务器，我需要一张图片，</p>
                                                                <p>经过网络的传输，服务器收到了浏览器的请求，得知他要一张图片，</p>
                                                                <p>于是服务器开始从本地硬盘中查找，找到了，从硬盘中读出来，</p>
                                                                <p>然后通过网络把图片数据传回浏览器。</p>
                                                                <p>在上面这个过程中，主要有两个地方，很费时间：</p>
                                                                <ul>
                                                                        <li>网络传输，一来一回</li>
                                                                        <li>服务器从本地硬盘中取图片</li>
                                                                </ul>
                                                                <p>所以，要是能这样就好了：</p>
                                                                <ul>
                                                                        <li>
                                                                                <p>浏览器尽量很少向服务器索要图片，</p>
                                                                        </li>
                                                                        <li>
                                                                                <p>服务器减少从本地硬盘中读取图片，</p>
                                                                        </li>
                                                                </ul>
                                                                <blockquote>
                                                                        <p>在一次会话中，如果页面中使用了两张名字一样的图片，</p>
                                                                        <p>浏览器并不会去老老实实请求两次，而是选择复用。</p>
                                                                </blockquote>
                                                                <h4><a id="_83"></a>静态文件</h4>
                                                                <p>一个网站中有很多的静态文件，比如：图片、音视频、CSS文件和JS文件等，</p>
                                                                <p>他们是很少变化的，除非后面网站升级或其他情况，</p>
                                                                <p>而100个人访问网站，这些静态文件，很大概率会使用到，</p>
                                                                <p>浏览器和服务器，距离千山万水，在用户第一次访问网站时，必须请求这些资源，</p>
                                                                <p>而请求这些资源，是一件成本不低的事（比较耗时间和性能），</p>
                                                                <p>这也是没办法的事，你不可能让用户的浏览器上凭空出现网站中需要的数据。</p>
                                                                <p>而且，用户后续很可能会隔三岔五地访问原网站，而一访问就又要经历上面过程，请求这些静态资源，</p>
                                                                <p>其实，这些资源完全可以在第一次从服务器拿到后，当场进行保存，后续用户访问网站时再翻出来使用，完全不需要又去麻烦服务器一遍，他们是静态资源，又不会经常变化。
                                                                </p>
                                                                <p>但是呢，也存在特殊情况，比如一张a图片，因为某些必要原因，服务器必须要改变它，还需要用户的在下次访问网站时能及时显示，这又该如何呢？（卖个关子）
                                                                </p>
                                                                <h3><a id="_103"></a>实施</h3>
                                                                <p>我们可以使用HTTP协议中的，<strong>强缓存</strong>和<strong>协商缓存</strong>来完成。
                                                                </p>
                                                                <h4><a id="_107"></a>强缓存</h4>
                                                                <p>强制使用缓存，不再去骚扰服务器，</p>
                                                                <p>比如一个图片文件，被标记为强缓存后，浏览器压根不会去发网络请求。</p>
                                                                <p>具体怎么做，在HTTP的响应头中设置这条属性就行了：</p>
                                                                <pre>
                <div class="hljs"><code class="lang-tex">Cache-Control: max-age=60
                        </code></div>
        </pre>
                                                                <p>单位是秒，也就是在60秒后过期，</p>
                                                                <blockquote>
                                                                        <p>缓存的资源，可能会放在用户的硬盘或者内存中，</p>
                                                                        <p>这个看浏览器内部的规则，开发者无法指定。</p>
                                                                </blockquote>
                                                                <p>当过期时间到达后，浏览器会向服务器发一个协商缓存的请求，进行判断要不要继续使用老缓存资源。</p>
                                                                <h4><a id="_127"></a>协商缓存</h4>
                                                                <p>所谓协商，当浏览器在准备使用缓存时，不会立马使用，而是先询问服务器，和服务器商量一下。</p>
                                                                <p>当强缓存过期，或者HTTP响应头中具有：</p>
                                                                <pre>
                <div class="hljs"><code class="lang-tex">Cache-Control: no-cache
                        </code></div>
        </pre>
                                                                <p>此时，浏览器还是会保存缓存资源，但在下一次使用时，会先发一条http请求询问服务器，</p>
                                                                <p>浏览器：我现在还能用这张图片吗？</p>
                                                                <p>服务器：嗯，可以的，你用吧</p>
                                                                <p>于是浏览器便使用缓存资源了。</p>
                                                                <p>虽然还是和服务器进行通信了，但服务器并没有向浏览器返回具体的资源数据，只是返回了一个答复，</p>
                                                                <p>这消耗相比正常的请求，肯定是小很多很多的。</p>
                                                                <p>如果资源真的改动了，浏览器询问服务器时，服务器可以返回最新的资源，从而实现浏览器上的缓存更新。</p>
                                                                <h4><a id="_151"></a>协商缓存实现细节</h4>
                                                                <p>还有一个地方没讲，服务器怎么判断这是一个协商请求？又怎么判断浏览器所缓存的资源版本？</p>
                                                                <p>比如一张图片，服务器怎么知道浏览器缓存的是老图片还是最新图片？</p>
                                                                <p>其实不难做到，只需在服务器给浏览器资源时，额外告诉浏览器一些信息：</p>
                                                                <p>告诉浏览器这个资源的版本，亦或是上一次的修改时间，</p>
                                                                <p>浏览器把这些信息保存，在发送协商请求时，再把信息也带上，</p>
                                                                <blockquote>
                                                                        <p>如果服务器没告诉浏览器这些信息，那浏览器就不管了，不会携带这些信息</p>
                                                                </blockquote>
                                                                <p>服务器能根据浏览器提供的这些信息，与当前最新资源进行对比，从而判断资源是否有改动。</p>
                                                                <p>实际中，只需服务器设置相应的响应头就行了，不需要开发者构造请求头</p>
                                                                <pre>
                <div class="hljs"><code class="lang-tex">last-modified: Sun, 15 Jun 2025 12:42:36 GMT
                                或者：
                                Etag：123456
                        </code></div>
        </pre>
                                                                <p>这两个响应头，如果同时设置，好像Etag优先级稍微高一点。</p>
                                                                <h3><a id="_177"></a>实操视频</h3>
                                                                <p>文字表达，总没有带你实操一遍理解深刻，其中还藏有一些细节，</p>
                                                                <p>我将通过视频进行演示和补充。</p>
                                                                <p>（目前还没上传视频，请留意后续，上传视频后会在这留下地址）</p>
                                                                <h3><a id="_185"></a>总结</h3>
                                                                <p>前端关于缓存方面的技术，除了本次介绍的，还有其他的，</p>
                                                                <p>比如：Service Worker、Storage、indexedDB等，</p>
                                                                <blockquote>
                                                                        <p>以前有个App Cache方案，现在被官方废弃了，</p>
                                                                        <p>大概是列一个清单文件，浏览器对这些文件进行缓存</p>
                                                                </blockquote>
                                                                <p>往大了说，缓存是一种思想，具体看怎么实现，</p>
                                                                <p>比如：你可以在写代码时，为了提高代码运行效率，选择创建了一个Map对象，而不是再套几层For循环。</p>
                                                                <p>缓存思想本质上是用空间换时间，虽然好，但并非毫无代价，这需要占用用户的内存或硬盘的空间。</p>
                                                                <blockquote>
                                                                        <p>我的QQ微信为什么占了手机十几二十G空间？</p>
                                                                        <p>为什么现在电脑16GB运行内存都有点不太够用了？</p>
                                                                </blockquote>
                                                                <p>好了，结束，有问题，请评论区留言。</p>
                                                        </div>
                                                </el-page-header>
                                        </div>
                                </el-col>
                        </el-row>
                </div>
                <My></My>
        </div>
</template>

<script setup lang='ts'>
import My from '../../components/post/My.vue';
const goBack = () => {
        window.history.back();
}
</script>

<style lang="less" scoped>
//文章列表展示布局
.postcount {
        display: flex;

        .count {
                width: 70%;

                // 文章内容样式
                .article-content {
                        padding: 20px;
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
                                color: #e74c3c;
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
}
</style>