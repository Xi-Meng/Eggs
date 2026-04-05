<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { designPages } from '@/data/designPages'

const groups = computed(() => [
  {
    title: '常用入口',
    pages: designPages.filter((page) =>
      ['otl', 'Mln', 'bQv', 'oJi', 'p3Y', 'gAr', '4-t', 'ATP'].includes(page.id),
    ),
  },
  {
    title: '全部页面',
    pages: designPages,
  },
])
</script>

<template>
  <main class="index-page">
    <section class="hero">
      <p class="eyebrow">Eggs Recovery</p>
      <h1>页面导航</h1>
      <p class="summary">
        这里收起了当前恢复出来的全部画板入口。点击任意页面后，会进入对应的 Vue Page。
      </p>
    </section>

    <section v-for="group in groups" :key="group.title" class="group">
      <h2>{{ group.title }}</h2>
      <div class="grid">
        <RouterLink
          v-for="page in group.pages"
          :key="`${group.title}-${page.id}`"
          class="card"
          :to="page.routePath"
        >
          <span class="card-id">{{ page.id }}</span>
          <strong>{{ page.title }}</strong>
          <small>{{ page.routePath }}</small>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.index-page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 20px 64px;
}

.hero {
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #a56d28;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero h1 {
  margin: 0 0 12px;
  font-size: clamp(2rem, 4vw, 3.8rem);
}

.summary {
  max-width: 640px;
  margin: 0;
  color: rgba(66, 47, 22, 0.72);
}

.group + .group {
  margin-top: 28px;
}

.group h2 {
  margin: 0 0 14px;
  font-size: 1.15rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.card {
  display: grid;
  gap: 6px;
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(146, 99, 38, 0.12);
  box-shadow: 0 14px 28px rgba(115, 82, 38, 0.08);
}

.card-id {
  color: #a56d28;
  font-size: 0.84rem;
  font-weight: 700;
}

.card strong {
  color: #2f1e10;
}

.card small {
  color: rgba(78, 57, 29, 0.66);
}
</style>
