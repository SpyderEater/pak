export default function urlToFileName(url) {
  if (!url) return 'empty'
  let startSeparator = '/'
  let endSeparator = '.'
  let start = url.lastIndexOf(startSeparator) ? url.lastIndexOf(startSeparator) + 1 : 0
  let end = url.lastIndexOf(endSeparator)
  if (end === -1) {
    return url.slice(start) ? url.slice(start) : 'img'
  }

  return url.slice(start, end) ? url.slice(start, end) : 'img'
}
