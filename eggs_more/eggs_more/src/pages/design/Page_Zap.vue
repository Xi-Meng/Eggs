<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import BackNavigationOverlay from '@/components/navigation/BackNavigationOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="Zap" title="肉类">
    <BackNavigationOverlay fallback-path="/design/oJi" />
  </DesignPageShell>
</template>
