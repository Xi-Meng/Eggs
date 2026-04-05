const RUNTIME_ID = 'eggs-jsframe-runtime'
const LOCAL_RUNTIME_SRC = '/vendor/jsframe.js'

let runtimePromise: Promise<void> | null = null

function injectScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(RUNTIME_ID) as HTMLScriptElement | null

    if (existing) {
      if (existing.dataset.ready === 'true') {
        resolve()
        return
      }

      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('js-frame runtime load failed')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.id = RUNTIME_ID
    script.src = src
    script.async = true
    script.onload = () => {
      script.dataset.ready = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error('js-frame runtime load failed'))
    document.head.appendChild(script)
  })
}

export function ensureJsFrameRuntime() {
  if (!runtimePromise) {
    runtimePromise = injectScript(LOCAL_RUNTIME_SRC)
  }

  return runtimePromise
}
