<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import SaltLevelOverlay from '@/components/salt/SaltLevelOverlay.vue'
import SaltPresetOverlay from '@/components/salt/SaltPresetOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="wXj" title="咸了吗1结束">
    <SaltLevelOverlay page-id="wXj" />
    <SaltPresetOverlay page-id="wXj" mode="end" />
  </DesignPageShell>
</template>
