<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import CookPresetOverlay from '@/components/cook/CookPresetOverlay.vue'
import RealtimeTemperatureOverlay from '@/components/temperature/RealtimeTemperatureOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="4-t" title="熟了吗1结束">
    <RealtimeTemperatureOverlay page-id="4-t" />
    <CookPresetOverlay mode="end" />
  </DesignPageShell>
</template>
