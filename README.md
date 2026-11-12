# lvdameng 的博客

纯静态个人博客，没有后端，所有文章都是 markdown。

在线地址：**https://lvdameng.xyz**

---

## 技术栈

| 分类 | 选型 |
|---|---|
| 框架 | Vue 3.5 + Vite 5 + TypeScript |
| 状态 | Pinia |
| 路由 | vue-router 4（hash 模式，为了 GitHub Pages） |
| UI | Element Plus（按需引入）+ Less |
| 内容 | markdown-it + highlight.js |
| 部署 | GitHub Actions → GitHub Pages |
| 加速 | Cloudflare CDN |

## 本地开发

需要 **Node >= 20.19**（`unplugin` 用了 `import.meta.dirname`，Node 18 会崩）。

```bash
npm install
npm run dev       # 本地预览
npm run build     # 类型检查 + 构建
npm run preview   # 预览构建产物（先 build）
```

> `dev` 和 `build` 前会自动执行 `npm run posts`，扫描文章生成索引，平时不用手动跑。

## 写一篇文章

**1. 新建 markdown**

放在 `src/stores/posts/`，文件名就是日期，例如 `2026-11-20.md`：

```md
---
cover: 'cover15.webp'
title: '文章标题'
content: '列表页显示的摘要，一两句话'
date: '2026-11-20'
tag: '生活随笔'
---

正文从这里开始，正常写 markdown 就行。
```

**2. 准备封面**

把 `cover15.png` 丢进 `src/assets/cover/` 即可，本地能直接预览。

CI 会自动把它压成 webp，所以线上加载的是压缩版。md 里写 `cover15.webp`、`cover15.png` 甚至只写 `cover15` 都能匹配到（代码会去掉后缀，按 `webp → png → jpg` 顺序找）。

**3. 重启 dev**

索引是启动时生成的，运行中新建的 md 不会自动进列表。

**4. push**

推到 `main` 就自动部署。

### 几个约定

- **一天只能发一篇**：文件名就是日期，同一天两篇会互相覆盖
- **日期必须补零**：`2026-01-05`，不是 `2026-1-5`，否则排序会歪
- **`tag` 不要写错字**：写错会自动变成一个新分类
- **作者名不用写**：在 `src/config.ts` 里统一配置，md 里想单独署名才写 `name`
- **正文插图**：放 `public/` 下，用根路径引用，例如 `![](/images/a.webp)`

## 目录结构

```
src/
├─ assets/              图片、字体、iconfont
├─ components/          通用组件
│  ├─ PageLayout.vue    五个页面共用的外壳
│  └─ post/             文章卡片、侧边栏名片
├─ views/               页面
│  └─ layout/           页面里的实际内容
├─ stores/
│  ├─ posts/            所有文章 md
│  ├─ posts.json        构建期生成的索引（勿手改）
│  ├─ postParse.ts      解析 frontmatter
│  ├─ postBody.ts       正文按需加载
│  ├─ ListStore.ts      文章列表
│  └─ LogStore.ts       开发日志
├─ router/
├─ composables/
├─ less/
└─ config.ts            作者名等站点配置
scripts/
├─ build-posts.mjs      扫描 md，生成 posts.json
└─ opt-img.py           图片转 webp + 按显示尺寸缩放
```

## 它是怎么跑的

- **文章列表**：构建期扫描 `posts/*.md`，只提取 frontmatter 生成 `posts.json`；首页只读这个索引，不碰正文
- **文章详情**：打开某篇时才 `import()` 那一篇 md，正文单独一个 chunk
- **图片**：CI 里 `opt-img.py` 统一转 webp 并缩到显示尺寸，然后删掉原图
- **分类**：`ListStore.ts` 里的 `KNOWN_TAGS` 定死已有分类的 id，新分类按日期先后自动编号

## 部署

```
push 到 main
  → GitHub Actions
      → setup-node 22
      → npm install
      → opt-img.py（png/jpg 转 webp）+ 删除原图
      → npm run build
      → 推到 gh-pages 分支
```

Cloudflare 那边对 `/assets/` 做了长缓存，`index.html` 不缓存——这样发版能立刻生效，静态资源又不用重复下载。

## 一些数字

| 项目 | 优化前 | 现在 |
|---|---|---|
| 构建产物 | 50.38 MB | 3.1 MB |
| 主 JS | 1.18 MB | 145 KB |
| 首屏 | 13.65 MB | 约 1.5 MB |

图片按实际显示尺寸缩放 + webp、字体子集化成 woff2、Element Plus 按需引入，这三步贡献了绝大部分。
