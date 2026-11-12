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
