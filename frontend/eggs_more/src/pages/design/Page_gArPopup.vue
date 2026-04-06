<script setup lang="ts">
import CookPresetOverlay from '@/components/cook/CookPresetOverlay.vue'
import CookReadyPopupPreview from '@/components/cook/CookReadyPopupPreview.vue'
import DesignPageShell from '@/components/DesignPageShell.vue'
import RealtimeTemperatureOverlay from '@/components/temperature/RealtimeTemperatureOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="gAr" title="熟了吗1开始弹窗" disable-frame-switch>
    <RealtimeTemperatureOverlay page-id="gAr" />
    <CookPresetOverlay mode="start" />
    <CookReadyPopupPreview />
  </DesignPageShell>
</template>
