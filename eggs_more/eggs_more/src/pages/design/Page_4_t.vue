<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import RealtimeTemperatureOverlay from '@/components/temperature/RealtimeTemperatureOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="4-t" title="熟了吗1结束">
    <RealtimeTemperatureOverlay page-id="4-t" />
  </DesignPageShell>
</template>
