export const extractFilenamesFromHtml = (html) => {
  const filenames = new Set()
  const regexList = [
    /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g,
    /!(.+?\.(png|jpe?g|gif|webp|svg))(?:\|[^!]+)?!/gi,
    /<p>!\[]\(([^)]+)\)<\/p>/g
  ]

  // Width and height in percentages are bitchy in HTML and can cause issues with data URIs.
  // This regex is a bit noisy, but we won't be using the width and height attributes in the data URIs, so fuck it.
  const sanitizeHtmlImgSrc = html
    .replaceAll(/width=([+-]?(?=\.\d|\d)(?:\d+)?\.?\d*)(?:[Ee]([+-]?\d+))?%/g, '')
    .replaceAll(/height=([+-]?(?=\.\d|\d)(?:\d+)?\.?\d*)(?:[Ee]([+-]?\d+))?%/g, '')

  for (const regex of regexList) {
    let match
    while ((match = regex.exec(sanitizeHtmlImgSrc)) !== null) {
      let fullPath

      try {
        fullPath = decodeURIComponent(match[1])
      } catch {
        fullPath = match[1]
      }

      const filename = fullPath.split('|')[0].split('?')[0].split('/').pop()
      if (filename) filenames.add(filename)
    }
  }

  return filenames
}