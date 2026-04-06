<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import SaltLevelOverlayPreview from '@/components/salt/SaltLevelOverlayPreview.vue'
import SaltPresetOverlayPreview from '@/components/salt/SaltPresetOverlayPreview.vue'
import SaltReadyPopupPreview from '@/components/salt/SaltReadyPopupPreview.vue'
</script>

<template>
  <DesignPageShell frame-id="AnX" title="咸了吗1开始弹窗-汤" disable-frame-switch>
    <SaltLevelOverlayPreview page-id="AnX" value="0.5%" />
    <SaltPresetOverlayPreview page-id="AnX" />
    <SaltReadyPopupPreview />
  </DesignPageShell>
</template>
