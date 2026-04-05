import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/pages/IndexPage.vue'
import { designPages } from '@/data/designPages'
import { createDesignPage } from '@/pages/design/createDesignPage'

const pageModules = import.meta.glob('../pages/design/*.vue') as Record<
  string,
  () => Promise<{ default: Component }>
>

const designRoutes: RouteRecordRaw[] = designPages.map((page) => {
  const importer = page.customComponent
    ? pageModules[`../pages/design/${page.customComponent}`]
    : undefined

  return {
    path: page.routePath,
    name: `design-${page.id}`,
    component: importer
      ? () => importer().then((module) => module.default)
      : createDesignPage(page.id),
    meta: {
      title: page.title,
      frameId: page.id,
    },
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      meta: {
        title: '页面导航',
      },
    },
    ...designRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Eggs'
  document.title = `${title} | Eggs`
})

export default router
