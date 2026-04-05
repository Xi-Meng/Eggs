import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const vendorDir = path.join(publicDir, 'vendor')
const designDir = path.join(publicDir, 'jsdesign')

const runtimePath = path.join(vendorDir, 'jsframe.js')
const bundlePath = path.join(designDir, 'js_fqQ5obGtL8b')

const runtimeUrl = 'https://img.js.design/assets/Resources/xframe/latest/jsframe.js'
const bundleUrl = 'https://img.js.design/assets/element/js_fqQ5obGtL8b/69d120bc81a6de7b91af665d.js'
const referer = 'https://js.design/'

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function downloadWithReferer(url, targetPath) {
  const response = await fetch(url, {
    headers: {
      Referer: referer,
    },
  })

  if (!response.ok) {
    throw new Error(`request failed: ${response.status} ${response.statusText}`)
  }

  const content = await response.text()
  await fs.writeFile(targetPath, content, 'utf8')
}

async function ensureExistingFile(filePath) {
  await fs.access(filePath)
}

async function syncFile(label, url, targetPath) {
  try {
    await downloadWithReferer(url, targetPath)
    console.log(`[sync-design] synced ${label}`)
  } catch (error) {
    try {
      await ensureExistingFile(targetPath)
      console.warn(`[sync-design] reuse existing ${label}: ${error instanceof Error ? error.message : String(error)}`)
    } catch {
      throw error
    }
  }
}

async function main() {
  await ensureDir(vendorDir)
  await ensureDir(designDir)

  await syncFile('public/vendor/jsframe.js', runtimeUrl, runtimePath)
  await syncFile('public/jsdesign/js_fqQ5obGtL8b', bundleUrl, bundlePath)
}

main().catch((error) => {
  console.error('[sync-design] failed', error)
  process.exit(1)
})
