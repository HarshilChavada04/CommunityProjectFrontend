<template>
  <div class="column justify-center items-center login-page-bg">
    <div class="login-form pa-40">
      <div class="column items-center">
        <img src="~src\assets\logo-without-bg.png" alt="" class="img-style" />
        <span class="text-bold text-uppercase font-35 text-grey-10">{{ strProjectName }}</span>
        <span class="font-25 text-bold text-grey-10 q-mb-sm">Login</span>
      </div>
      <q-form ref="login-form">
        <q-input
          v-model="strEmailAddressOrPhone"
          class="full-width"
          outlined
          dense
          placeholder="Enter email or phone"
          @keyup.enter="handleLoginSubmit"
          @copy.prevent
          @paste.prevent
        >
        </q-input>
        <q-input
          v-model="strPassword"
          :type="blnIsPwd ? 'password' : 'text'"
          class="mt-12 full-width"
          outlined
          dense
          placeholder="Enter password"
          @keyup.enter="handleLoginSubmit"
          @copy.prevent
          @paste.prevent
        >
          <template v-slot:append>
            <q-btn
              :icon="blnIsPwd ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
              flat
              dense
              rounded
              class="text-primary font-10"
              @click="blnIsPwd = !blnIsPwd"
            ></q-btn>
          </template>
        </q-input>

        <q-btn
          label="Log in"
          class="primary-btn full-width mt-20"
          @click="handleLoginSubmit()"
        ></q-btn>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import { showSuccess, showError } from 'boot/notify'
import { useAuthStore } from 'src/stores/auth'

defineOptions({
  name: 'LoginPage',
})

/** Variables storing env values */
const strProjectName = process.env.PROJECT_NAME

/** Variables */
const blnIsPwd = ref(true)
const strEmailAddressOrPhone = ref('')
const strPassword = ref('')
const router = useRouter()
const auth = useAuthStore()

/** Methods */
async function handleLoginSubmit() {
  let objData = {
    identifier: strEmailAddressOrPhone.value,
    password: strPassword.value,
  }

  try {
    const res = await api.post('/login', objData)
    auth.setToken(res.data.access_token)
    router.push('/dashboard')
    showSuccess(res.data.message)
  } catch (err) {
    showError(err?.response?.data?.message || 'Login failed')
  }
}
</script>

<style lang="scss" scoped>
.login-page-bg {
  background-image: url('../../assets/login-bg-img.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  min-height: 100vh;
}

.img-style {
  width: 180px;
  height: 100px;
}

.login-form {
  border-radius: 50px;
  background-color: var(--q-background);
  border: 2px solid var(--q-primary);
}

:deep(.q-field--outlined .q-field__control) {
  border-radius: 7px;
}
</style>
