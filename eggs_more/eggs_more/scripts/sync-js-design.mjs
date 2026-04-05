import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const vendorDir = path.join(publicDir, 'vendor')
const designDir = path.join(publicDir, 'jsdesign')

const runtimePath = path.join(vendorDir, 'jsframe.js')
const bundlePath = path.join(designDir, 'js_fqQ5obGtL8b')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function ensurePlaceholder(filePath, content) {
  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, content, 'utf8')
  }
}

async function main() {
  await ensureDir(vendorDir)
  await ensureDir(designDir)

  await ensurePlaceholder(
    runtimePath,
    `customElements.get('js-frame') || customElements.define('js-frame', class extends HTMLElement {
      static get observedAttributes() { return ['src'] }
      constructor() {
        super()
        this.attachShadow({ mode: 'open' })
      }
      connectedCallback() { this.render() }
      attributeChangedCallback() { this.render() }
      on(eventName, handler) {
        this.addEventListener(eventName, (event) => handler(event.detail || {}))
      }
      off() {}
      render() {
        const src = this.getAttribute('src') || ''
        const match = src.match(/#f=([^&]+)/)
        const frameId = match ? decodeURIComponent(match[1]) : ''
        this.readyState = { label: 'rendered' }
        this.shadowRoot.innerHTML = '<div part="fallback" style="min-height:812px;display:grid;place-items:center;padding:32px;font:14px sans-serif;color:#7a5b34;background:#fff8ee">js.design 资源待恢复：' + frameId + '</div>'
        this.dispatchEvent(new Event('jsFrameReadystatechange'))
      }
    });`,
  )

  await ensurePlaceholder(
    bundlePath,
    `window.__X_COMPONENT_MAP__ = window.__X_COMPONENT_MAP__ || {};
window.__X_COMPONENT_MAP__.js_fqQ5obGtL8b = function () { return class {} };
window.__X_COMPONENT__ = window.__X_COMPONENT_MAP__.js_fqQ5obGtL8b;`,
  )

  console.log('[sync-design] ensured fallback public/vendor/jsframe.js')
  console.log('[sync-design] ensured fallback public/jsdesign/js_fqQ5obGtL8b')
}

main().catch((error) => {
  console.error('[sync-design] failed', error)
  process.exit(1)
})
