<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import SaltLevelOverlay from '@/components/salt/SaltLevelOverlay.vue'
import SaltPresetOverlay from '@/components/salt/SaltPresetOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="AnX" title="咸了吗1开始">
    <SaltLevelOverlay page-id="AnX" />
    <SaltPresetOverlay page-id="AnX" mode="start" />
  </DesignPageShell>
</template>
