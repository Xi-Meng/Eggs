<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    copy?: string
  }>(),
  {
    title: '滋补鲜汤盐度合适了',
    copy: '当前盐度已经达到合适范围，可以结束烹饪了。',
  },
)
</script>

<template>
  <div class="salt-ready-popup-preview" @click.stop.prevent @touchend.stop.prevent>
    <div class="popup-backdrop" aria-hidden="true" />

    <section class="popup-card" role="dialog" aria-modal="true" aria-label="盐度合适提示">
      <p class="popup-kicker">烹饪提醒</p>
      <h2>{{ title }}</h2>
      <p class="popup-copy">{{ copy }}</p>
      <button class="popup-action" type="button" tabindex="-1">我知道了</button>
    </section>
  </div>
</template>

<style scoped>
.salt-ready-popup-preview {
  position: absolute;
  inset: 0;
  z-index: 12;
  pointer-events: auto;
}

.popup-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(49, 37, 19, 0.34);
}

.popup-card {
  position: absolute;
  left: 34px;
  right: 34px;
  top: 248px;
  display: grid;
  gap: 12px;
  padding: 24px 22px 22px;
  border-radius: 28px;
  background: linear-gradient(180deg, #fff9dc 0%, #fff3c1 100%);
  box-shadow:
    0 20px 42px rgba(117, 89, 33, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  text-align: center;
}

.popup-kicker {
  margin: 0;
  color: #9b7a2d;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.popup-card h2 {
  margin: 0;
  color: #5b451c;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.popup-copy {
  margin: 0;
  color: rgba(91, 69, 28, 0.82);
  font-size: 15px;
  line-height: 1.5;
}

.popup-action {
  appearance: none;
  border: 0;
  border-radius: 999px;
  min-height: 46px;
  background: #efcd62;
  color: #5c4517;
  font-size: 16px;
  font-weight: 800;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}
</style>
