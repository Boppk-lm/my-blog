// 解析 md 文本：拆出 frontmatter（header）和正文（content）
// 列表页不再需要它（索引由 scripts/build-posts.mjs 构建期生成），
// 详情页用它从 md 原文里剥掉 frontmatter

// 字符串转对象
export function parseHeader(str: string) {
  const obj: Record<string, string> = {}                          // 准备一个空对象

  const lines = str.split('\n')           // 1. 按换行切成一行行
    .map(line => line.trim())             // 2. 去掉每行首尾空格
    .filter(line => line !== '')          // 3. 扔掉空行

  for (const line of lines) {
    const index = line.indexOf(':')       // 4. 找冒号位置
    if (index === -1) continue            //    没有冒号就跳过

    const key = line.slice(0, index).trim()          // 5. 冒号左边 = 键
    let value = line.slice(index + 1).trim()         // 6. 冒号右边 = 值

    // 7. 去掉包裹的引号（' 或 "）
    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1)
    }

    obj[key] = value                      // 8. 塞进对象
  }

  return obj
}

// 解析文章内容：拆出 frontmatter 和正文
export function parsePost(raw: string): { header: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return { header: {}, content: raw }
  }

  return {
    header: parseHeader(match[1]),
    content: match[2],
  }
}
