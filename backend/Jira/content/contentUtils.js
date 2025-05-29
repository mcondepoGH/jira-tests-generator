import j2m from './lib/jira2markdown.js'
import { JSDOM } from 'jsdom'
import { parseJiraAttachments } from './index.js'

export const extractDescription = async (data) => {
  let contentHtml = j2m.jira_to_html(data.fields.description)
  contentHtml = removeParagraphFromLi(contentHtml)
  contentHtml = replaceCustomPanels(contentHtml)
  contentHtml = await parseJiraAttachments(contentHtml, data.fields.attachment)
  return contentHtml
}

function removeParagraphFromLi (htmlString) {
  const dom = new JSDOM(htmlString)
  const document = dom.window.document
  const listItems = document.querySelectorAll('li')

  listItems.forEach((li) => {
    li.querySelectorAll(':scope > p').forEach((p) => {
      const fragment = document.createDocumentFragment()

      if (p.childNodes.length > 0) {
        p.childNodes.forEach((node) => fragment.appendChild(node))
      } else {
        fragment.appendChild(document.createTextNode(''))
      }

      li.replaceChild(fragment, p)
    })
  })

  return document.body.innerHTML
}

function replaceCustomPanels (input) {
  input = input.replace(
    /<p>\s*(\{panel(:[^}]*)?}[\s\S]*?\{panel})\s*<\/p>/g,
    (_, panelBlock) => panelBlock
  )

  return input.replace(/\{panel(:[^}]*)?}([\s\S]*?)\{panel}/g, (match, rawAttributes, content) => {
    const attributes = {}

    if (rawAttributes) {
      rawAttributes
        .slice(1)
        .split(',')
        .forEach(attr => {
          const [key, value] = attr.split('=')
          if (key && value) {
            attributes[key.trim()] = value.trim()
          }
        })
    }

    let style = ''
    if (attributes.bgColor) {
      style += `margin: 20px 0; padding: 20px; border-radius: 10px;background-color: ${attributes.bgColor};`
    }

    return `<div${style ? ` style="${style}"` : ''}>${content.trim()}</div>`
  })
}