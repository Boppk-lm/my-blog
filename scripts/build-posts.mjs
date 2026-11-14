// 扫描 src/stores/posts/*.md，只抽出 frontmatter 生成索引 src/stores/posts.json
// 正文不参与，留在 md 里由详情页按需 import
//
// 由 package.json 的 predev / prebuild 自动调用，平时不用手动跑
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const POSTS = join(root, 'src/stores/posts')
const OUT = join(root, 'src/stores/posts.json')

const REQUIRED = ['cover', 'title', 'content', 'date', 'tag']

function parseHeader(str) {
  const obj = {}
  for (const raw of str.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) continue
    const i = line.indexOf(':')
    if (i === -1) continue
    let v = line.slice(i + 1).trim()
    if ((v.startsWith("'") && v.endsWith("'")) || (v.startsWith('"') && v.endsWith('"'))) {
      v = v.slice(1, -1)
    }
    obj[line.slice(0, i).trim()] = v
  }
  return obj
}

const files = readdirSync(POSTS).filter(f => f.endsWith('.md')).sort()
const list = []
const problems = []

for (const f of files) {
  const raw = readFileSync(join(POSTS, f), 'utf-8')
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) { problems.push(`${f}: 没有 frontmatter`); continue }

  const h = parseHeader(m[1])
  const date = h.date ?? f.match(/^(\d{4}-\d{2}-\d{2})\.md$/)?.[1] ?? ''
  if (!date) { problems.push(`${f}: 取不到日期`); continue }

  const missing = REQUIRED.filter(k => !h[k])
  if (missing.length) problems.push(`${f}: 缺字段 ${missing.join(', ')}`)

  list.push({
    id: Number(date.replace(/-/g, '')),
    file: `./posts/${f}`,
    cover: h.cover ?? '',
    title: h.title ?? '',
    content: h.content ?? '',
    name: h.name ?? '',
    date,
    tag: h.tag ?? ''
  })
}

// 日期升序写入，读的时候再倒序，保证文件内容稳定好 diff
list.sort((a, b) => a.date.localeCompare(b.date))
writeFileSync(OUT, JSON.stringify(list, null, 2) + '\n', 'utf-8')

console.log(`索引完成：${list.length} 篇 → src/stores/posts.json`)
if (problems.length) {
  console.log('\n有问题的地方：')
  for (const p of problems) console.log('  - ' + p)
}

// 字体覆盖检查：标题用「阿里巴巴普惠体」，字体是裁剪过的子集，
// 新标题里出现字库外的字会回退系统字体（同一行混排，看着很怪）。
// 这里拿 build-font.py 留下的字符表比对，提前提醒。
try {
  const chars = readFileSync(join(root, 'scripts/fonts/chars.txt'), 'utf-8')
  const known = new Set(chars)
  const missing = new Set()
  for (const p of list) {
    for (const ch of p.title + p.tag) {
      // 只查汉字，标点/假名回退很正常
      if (ch >= '\u4e00' && ch <= '\u9fff' && !known.has(ch)) missing.add(ch)
    }
  }
  if (missing.size) {
    console.log(`\n[字体] 标题里有 ${missing.size} 个字不在字体子集里：${[...missing].join('')}`)
    console.log('       跑一次 npm run font 重新生成（改了标题才需要）')
  }
} catch {
  // 没生成过字体就跳过
}

