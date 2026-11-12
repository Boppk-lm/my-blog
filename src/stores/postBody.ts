// 正文按需加载：不加 eager，这里拿到的是「函数」，调用时才去下载那一篇
import { parsePost } from './postParse'

const loaders = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default'
}) as Record<string, () => Promise<string>>

export async function loadPostBody(file: string): Promise<string> {
  const load = loaders[file]
  if (!load) return ''
  return parsePost(await load()).content.trim()
}
