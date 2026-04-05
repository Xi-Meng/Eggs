<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import CookPresetOverlay from '@/components/cook/CookPresetOverlay.vue'
import RealtimeTemperatureOverlay from '@/components/temperature/RealtimeTemperatureOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="gAr" title="熟了吗1开始">
    <RealtimeTemperatureOverlay page-id="gAr" />
    <CookPresetOverlay />
  </DesignPageShell>
</template>
