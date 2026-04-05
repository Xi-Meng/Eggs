<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import RealtimeOilFumeOverlay from '@/components/oil/RealtimeOilFumeOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="MYI" title="厨房空气质量检测差开">
    <RealtimeOilFumeOverlay page-id="MYI" />
  </DesignPageShell>
</template>
