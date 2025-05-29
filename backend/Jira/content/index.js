import { extractFilenamesFromHtml } from './parser.js'
import { fetchAttachment } from '../service/attachmentService.js'
import { replaceImagesWithEmbedded } from './replacer.js'
import { imgToBase64 } from './util.js'

export const parseJiraAttachments = async (html, attachments) => {
  const filenames = extractFilenamesFromHtml(html)
  const fileMap = new Map()

  for (const filename of filenames) {
    const attachment = attachments.find(att => att.filename === filename)
    if (attachment) {
      const dataImg = await fetchAttachment(attachment.id)
      const dataUri = await imgToBase64(dataImg, attachment.mimeType)
      fileMap.set(filename, dataUri)
    }
  }

  return replaceImagesWithEmbedded(html, fileMap)
}
