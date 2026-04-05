<script setup lang="ts">
import TopBrandImageOverlay from '@/components/branding/TopBrandImageOverlay.vue'
import DesignPageShell from '@/components/DesignPageShell.vue'
import AuthOverlay from '@/components/auth/AuthOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="Mln" title="注册页">
    <TopBrandImageOverlay page-id="Mln" />
    <AuthOverlay mode="register" />
  </DesignPageShell>
</template>
