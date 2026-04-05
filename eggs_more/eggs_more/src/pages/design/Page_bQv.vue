<script setup lang="ts">
import TopBrandImageOverlay from '@/components/branding/TopBrandImageOverlay.vue'
import DesignPageShell from '@/components/DesignPageShell.vue'
import AuthOverlay from '@/components/auth/AuthOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="bQv" title="登录页">
    <TopBrandImageOverlay page-id="bQv" />
    <AuthOverlay mode="login" />
  </DesignPageShell>
</template>
