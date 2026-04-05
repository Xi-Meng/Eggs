<script setup lang="ts">
import DesignPageShell from '@/components/DesignPageShell.vue'
import AuthOverlay from '@/components/auth/AuthOverlay.vue'
</script>

<template>
  <DesignPageShell frame-id="Mln" title="注册页">
    <AuthOverlay mode="register" />
  </DesignPageShell>
</template>
