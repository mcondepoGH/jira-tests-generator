export const replaceImagesWithEmbedded = (html, fileMap) => {
  return html
    .replace(/<img\s+([^>]*?)src=["']([^"']+)["']([^>]*)>/g, (_, before, src, after) => {
      const filename = decodeURIComponent(src).split('|')[0].split('?')[0].split('/').pop()
      const dataUri = fileMap.get(filename || '')
      return dataUri ? `<img src="${dataUri}"${after} alt="${filename}">` : _
    })

    .replace(/!(.+?\.(png|jpe?g|gif|webp|svg))(?:\|[^!]+)?!/gi, (_, filename) => {
      const clean = filename.split('|')[0].split('?')[0].split('/').pop()
      const dataUri = fileMap.get(clean || '')
      return dataUri ? `<img src="${dataUri}" alt="${clean}" />` : _
    })

    .replace(/<p>!\[]\(([^)]+)\)<\/p>/g, (_, inner) => {
      const [rawFilename, attrs = ''] = inner.split('|')
      const filename = rawFilename.trim().split('?')[0].split('/').pop()
      const dataUri = fileMap.get(filename || '')

      if (!dataUri) return _

      const alt = (attrs.match(/alt=["']([^"']+)["']/)?.[1]) || filename
      const width = (attrs.match(/width=([0-9.]+%?)/)?.[1]) || ''
      const height = (attrs.match(/height=([0-9.]+)/)?.[1]) || ''

      return `<img src="${dataUri}" alt="${alt}"${width ? ` width="${width}"` : ''}${height ? ` height="${height}"` : ''} />`
    })
}
