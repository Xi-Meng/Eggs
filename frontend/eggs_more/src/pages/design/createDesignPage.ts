import { defineComponent, h } from 'vue'
import DesignPageShell from '@/components/DesignPageShell.vue'
import { designPagesById } from '@/data/designPages'

export function createDesignPage(id: string) {
  const page = designPagesById[id]

  if (!page) {
    throw new Error(`Unknown design page id: ${id}`)
  }

  const componentName = `DesignPage${page.id.replace(/[^A-Za-z0-9]+/g, '')}`

  return defineComponent({
    name: componentName,
    setup() {
      return () =>
        h(DesignPageShell, {
          frameId: page.id,
          title: page.title,
        })
    },
  })
}
