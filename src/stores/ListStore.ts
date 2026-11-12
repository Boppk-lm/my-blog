export interface ListItem {
  id: number
  // md 文件路径（如 './posts/2026-10-17.md'），详情页按需加载正文时用
  file: string
  // 封面
  cover: string
  // 标题
  title: string
  // 简介
  content: string
  // 名字
  name: string
  // 日期
  date: string
  // 分类
  tag: string
  // 分类id
  tagId: number
}
import { defineStore } from "pinia"
import { AUTHOR } from '../config'
// 由 scripts/build-posts.mjs 构建期生成，只有 frontmatter，不含正文
import index from './posts.json'

// 分类 → tagId。已知分类写死，保证 /class/:id 老链接不断；
// 新分类按日期先后自动追加编号，避免所有新分类都落到 0
const KNOWN_TAGS: Record<string, number> = {
  '生活随笔': 1,
  '前端开发': 2
}

// 索引进内存：补上作者名和 tagId，按日期新 → 旧
function buildList(): ListItem[] {
  const tagMap: Record<string, number> = { ...KNOWN_TAGS }
  let nextTagId = Math.max(0, ...Object.values(KNOWN_TAGS)) + 1
  // posts.json 是日期升序，按这个顺序编号，结果才稳定
  for (const item of index) {
    const tag = item.tag ?? ''
    if (tag && !tagMap[tag]) tagMap[tag] = nextTagId++
  }

  return index
    .map((item): ListItem => ({
      id: item.id,
      file: item.file,
      cover: item.cover,
      title: item.title,
      content: item.content,
      // md 里没写 name 就用 config 里的作者名
      name: item.name || AUTHOR,
      date: item.date,
      tag: item.tag,
      tagId: tagMap[item.tag] ?? 0
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const useListStore = defineStore('list', {
  state: (): { ListMap: ListItem[] } => ({
    ListMap: buildList()
  }),
  actions: {
  },
  getters: {
    listLength: (state) => state.ListMap.length,
    tagLength: (state) => {
      // 利用 Set 统计唯一的 tagId 数量
      const uniqueTagIds = new Set(state.ListMap.map(item => item.tagId))
      return uniqueTagIds.size
    }
  }
})
