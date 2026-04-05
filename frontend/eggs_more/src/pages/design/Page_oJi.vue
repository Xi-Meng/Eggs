<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import HomeCategoryOverlay from '@/components/home/HomeCategoryOverlay.vue'
import RealtimeOilFumeOverlay from '@/components/oil/RealtimeOilFumeOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="oJi" title="主页">
    <HomeCategoryOverlay />
    <RealtimeOilFumeOverlay page-id="oJi" />
  </DesignPageShell>
</template>
