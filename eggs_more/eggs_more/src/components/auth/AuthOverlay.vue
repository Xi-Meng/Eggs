<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  authOverlayLayouts,
  type AuthActionLayout,
  type AuthLayoutMode,
} from '@/config/authOverlayLayout'
import { loginByEmail, registerByEmail } from '@/services/authApi'

const props = defineProps<{
  mode: AuthLayoutMode
}>()

const router = useRouter()
const layout = computed(() => authOverlayLayouts[props.mode])

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const statusText = ref('')
const statusType = ref<'error' | 'success'>('error')
const submitting = ref(false)

const submitLabel = computed(() => (props.mode === 'register' ? '注册' : '登录'))

function toBoxStyle(box: AuthActionLayout) {
  return {
    top: `${box.top}px`,
    left: `${box.left}px`,
    width: `${box.width}px`,
    height: `${box.height}px`,
  }
}

function openRegister() {
  if (props.mode !== 'register') {
    router.push('/design/Mln')
  }
}

function openLogin() {
  if (props.mode !== 'login') {
    router.push('/design/bQv')
  }
}

async function submit() {
  if (submitting.value) {
    return
  }

  if (!form.email.trim() || !form.password.trim()) {
    statusType.value = 'error'
    statusText.value = '请输入完整邮箱和密码'
    return
  }

  if (props.mode === 'register' && form.password !== form.confirmPassword) {
    statusType.value = 'error'
    statusText.value = '两次输入的密码不一致'
    return
  }

  submitting.value = true
  statusText.value = ''

  try {
    const result =
      props.mode === 'register'
        ? await registerByEmail(form.email.trim(), form.password)
        : await loginByEmail(form.email.trim(), form.password)

    if (result.code !== 200) {
      throw new Error(result.msg || `${submitLabel.value}失败`)
    }

    statusType.value = 'success'
    statusText.value = result.msg || `${submitLabel.value}成功`

    if (props.mode === 'register') {
      setTimeout(() => {
        router.push('/design/bQv')
      }, 700)
      return
    }

    setTimeout(() => {
      router.push('/design/oJi')
    }, 500)
  } catch (error) {
    statusType.value = 'error'
    statusText.value = error instanceof Error ? error.message : `${submitLabel.value}失败`
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="auth-overlay">
    <button
      class="tab-hit"
      type="button"
      :style="toBoxStyle(layout.registerTab)"
      aria-label="打开注册页"
      @click="openRegister"
    />
    <button
      class="tab-hit"
      type="button"
      :style="toBoxStyle(layout.loginTab)"
      aria-label="打开登录页"
      @click="openLogin"
    />

    <label
      v-for="field in layout.fields"
      :key="field.key"
      class="field-wrap"
      :style="{
        top: `${field.top}px`,
        left: `${field.left}px`,
        width: `${field.width}px`,
        height: `${field.height}px`,
      }"
    >
      <input
        v-model="form[field.key]"
        class="auth-input"
        :type="field.key.includes('password') ? 'password' : 'text'"
        :placeholder="field.placeholder"
        :style="{ paddingLeft: `${field.paddingLeft}px` }"
      />
    </label>

    <button
      class="submit-hit"
      type="button"
      :style="toBoxStyle(layout.submitButton)"
      :disabled="submitting"
      @click="submit"
    >
      <span>{{ submitting ? `${submitLabel}中...` : submitLabel }}</span>
    </button>

    <p
      v-if="statusText"
      class="status-box"
      :class="statusType"
      :style="{
        top: `${layout.statusBox.top}px`,
        left: `${layout.statusBox.left}px`,
        width: `${layout.statusBox.width}px`,
        minHeight: `${layout.statusBox.height}px`,
      }"
    >
      {{ statusText }}
    </p>
  </div>
</template>

<style scoped>
.auth-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tab-hit,
.submit-hit,
.field-wrap,
.auth-input,
.status-box {
  pointer-events: auto;
}

.tab-hit,
.submit-hit {
  position: absolute;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.submit-hit {
  display: grid;
  place-items: center;
  color: transparent;
}

.submit-hit span {
  font-size: 0;
}

.field-wrap {
  position: absolute;
  display: block;
}

.auth-input {
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.001);
  color: #5b431e;
  font-size: 15px;
  outline: none;
}

.auth-input::placeholder {
  color: rgba(110, 84, 43, 0.5);
}

.status-box {
  position: absolute;
  display: grid;
  place-items: center;
  margin: 0;
  padding: 8px 12px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.status-box.error {
  background: rgba(255, 239, 235, 0.92);
  color: #b4553c;
}

.status-box.success {
  background: rgba(240, 255, 227, 0.92);
  color: #61833b;
}
</style>
