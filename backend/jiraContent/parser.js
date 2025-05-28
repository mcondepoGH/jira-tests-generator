export const extractFilenamesFromHtml = (html) => {
  const filenames = new Set()

  const regexList = [
    /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/g,
    /!(.+?\.(png|jpe?g|gif|webp|svg))(?:\|[^!]+)?!/gi,
    /<p>!\[]\(([^)]+)\)<\/p>/g
  ]

  for (const regex of regexList) {
    let match
    while ((match = regex.exec(html)) !== null) {
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