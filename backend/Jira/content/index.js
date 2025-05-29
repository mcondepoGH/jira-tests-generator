import { extractFilenamesFromHtml } from './parser.js'
import { fetchAttachmentAsDataUri } from './attachmentService.js'
import { replaceImagesWithEmbedded } from './replacer.js'

export const parseJiraAttachments = async (html, attachments) => {
  const filenames = extractFilenamesFromHtml(html)
  const fileMap = new Map()

  for (const filename of filenames) {
    const attachment = attachments.find(att => att.filename === filename)
    if (attachment) {
      const dataUri = await fetchAttachmentAsDataUri(attachment.id, attachment.mimeType)
      fileMap.set(filename, dataUri)
    }
  }

  return replaceImagesWithEmbedded(html, fileMap)
}
