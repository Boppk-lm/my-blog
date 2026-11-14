const n=`---
cover: "cover15.webp"
title: "一次博客大修的折腾记录"
content: "花了点时间把博客从里到外翻新了一遍：文章从代码里搬进了 markdown，主包从 1.18MB 压到 145KB，顺手把五个复制粘贴的页面也收了。"
date: "2026-11-12"
tag: "前端开发"
---

# 一次博客大修的折腾记录

这个博客从去年七月断断续续写到现在，功能早就齐了，但一直有些地方让我别扭。

比如想写一篇文章，得打开一个 872 行的 \`ListStore.ts\`，在里面找到合适的位置插一大段模板字符串。比如每次构建完看体积，主包都是一点几兆。

今天索性把这些陈年旧账一次性清了。

---

## 📦 先把文章从代码里搬出来

以前十四篇文章的正文，全都硬编码在 \`ListStore.ts\` 里，一共 872 行。

\`\`\`ts
{
  id: 13,
  cover: 'cover15.webp',
  title: '我也不知道该说些什么了',
  post: \`
    正文...
  \`
}
\`\`\`

一开始觉得挺方便——数据都在一个文件里，改起来直观。但写到第二十篇你就会发现，**这不是在写博客，是在用代码编辑器写博客**。

于是搬。每篇文章一个 \`.md\`，frontmatter 放标题、日期、分类、封面和摘要：

\`\`\`md
---
cover: "cover14.webp"
title: "我也不知道该说些什么了"
content: "就随便写写吧~"
date: "2026-10-17"
tag: "生活随笔"
---

正文
\`\`\`

搬完之后 \`ListStore.ts\` 从 872 行变成 72 行，只剩一个扫描目录、拼装列表的函数。

有个代价得说清楚：**文章 id 从 \`0~13\` 变成了 \`20261017\` 这种**，以前收藏的链接全废了。我自己的博客无所谓，但这事提醒我，id 这种东西一开始就该用稳定的标识，别图省事用数组下标。

---

## ⚡ Element Plus：一直以为「无所谓」

\`main.ts\` 里原来是这样写的：

\`\`\`ts
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
\`\`\`

全量引入，外加**把几百个图标全注册一遍**。

而我数了一下，整个博客实际只用了 16 个 \`el-*\` 组件、2 个图标。

改成按需引入之后，主包从 **1.18MB 掉到 145KB**。这一刀比我之前折腾图片、字体加起来都要狠。

说句实话，我早就知道「全量引入不推荐」，但一直觉得「能跑就行」。真去看了一眼体积，才发现自己背着一个完全没必要的大包，背了很久。

---

## 🎨 代码块终于有颜色了

\`PostContent.vue\` 里有一段 \`.hljs\` 的样式，写了得有大半年。

但我从来没装过 highlight.js。

也就是说，那堆样式一直是死的，我的代码块从头到尾都是纯文本色。接上之后：

\`\`\`ts
const md = new MarkdownIt();
md.renderer.rules.fence = (tokens, idx) => {
  const info = tokens[idx].info.trim().split(/\\s+/)[0];
  const code = hljs.highlight(tokens[idx].content, { language: info }).value;
  return \`<pre class="hljs"><code>\${code}</code></pre>\`;
};
\`\`\`

为了不把整个 highlight.js 打进包里，只注册了实际用得到的几种语言。技术博客没代码高亮，确实不太像话。

---

## 🧱 五个页面长得一模一样

首页、开发日志、关于我、分类、文章列表，五个 View 的模板几乎逐字相同：

导航栏 → 封面 → 内容 → 页脚 → 回到顶部。

区别只有三个：**背景图、标题、导航栏高亮哪一项**。

于是抽了个 \`PageLayout\`，五个页面各自只剩十几行配置，总行数从 377 降到 200 出头。

以前改个页脚要改五遍，现在改一处。

---

## 📝 开发日志也优化了下

时间轴那份数据里，每条记录都手写了一个 \`id: 0\`、\`id: 1\`……

想在中间插一条，后面二十多个 id 全得改。现在直接删掉，用日期当 key。

另外加了年份分组（2025 / 2026），默认显示 15 条，剩下的点「再来一些」展开。跨两年的流水账，一条轴拉到底实在太长了。

---

## 🤖 最后的最后

这基本是 AI 陪着做的——它读代码、算体积、拆包、跑构建，我只负责拍板和挑刺。

有点奇妙的感觉：我一个人做这个博客做了一年半，磕磕绊绊；今晚动的东西，比我过去半年加起来都多。

AI还是太强大了，已经爱上这种感觉了~

> 本文章由AI生成~
`;export{n as default};
