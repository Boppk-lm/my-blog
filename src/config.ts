// 站点级配置：要改笔名、署名、站点名、建站日，都只改这里
// 想给某篇文章单独署名，在那个 md 的 frontmatter 里写 name 即可（会覆盖这里）

export const AUTHOR = '南下'

// 站点名：浏览器标签页、页面标题都用它
export const SITE_NAME = 'LvDaMengの开发日志'

// 建站日：名片里的「建站 N 天」从这天开始算（第一篇博客上线的日期）
export const SITE_START = '2025-07-28'

/**
 * 设置浏览器标签标题。
 * 传栏目名/文章名 → 「XXX · LvDaMengの开发日志」；不传 → 站点名本身（首页）。
 */
export function setTitle(title?: string) {
  document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME
}

/**
 * 建站天数：含开站当天，所以 +1。
 * 用东八区零点算，避免时区差异导致半夜跳数字。
 */
export function siteDays(): number {
  const start = new Date(`${SITE_START}T00:00:00+08:00`).getTime()
  return Math.max(1, Math.floor((Date.now() - start) / 86400000) + 1)
}
