<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import RealtimeTemperatureOverlay from '@/components/temperature/RealtimeTemperatureOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="p3Y" title="熟了吗总页面">
    <RealtimeTemperatureOverlay page-id="p3Y" />
  </DesignPageShell>
</template>
