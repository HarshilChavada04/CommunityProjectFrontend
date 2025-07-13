<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated v-if="isMobile">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerOpen = !drawerOpen"
          class="q-mr-sm"
        />
        <q-toolbar-title>{{ projectName }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!-- Sidebar Drawer -->

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      :mini="miniState"
      mini-to-overlay
      :width="250"
      :breakpoint="500"
      elevated
      class="column no-wrap full-height bg-primary"
      behavior="desktop"
    >
      <!-- Toggle Button -->
      <q-btn
        dense
        round
        @click="toggleLeftDrawer"
        class="bg-secondary text-white absolute"
        :icon="miniState ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"
        size="7px"
        style="right: -8px; top: 68px; z-index: 1"
      />

      <!-- Logo -->
      <q-item class="column justify-center items-center">
        <q-item-section avatar class="q-px-xl">
          <img src="src/assets/logo.png" alt="Logo" height="50px" style="border-radius: 50%" />
        </q-item-section>
        <q-item-section v-if="drawerOpen" class="font-22 text-bold text-active-class">
          {{ projectName }}
        </q-item-section>
      </q-item>

      <q-separator />

      <!-- Scrollable Menu Items -->

      <q-list>
        <q-item
          v-for="item in menuItems"
          :key="item.name"
          clickable
          v-ripple
          class="text-snowwhite"
          @click="redirectToScreen(item)"
          :active="currentTabName == item.name"
          :active-class="`bg-secondary text-active-class ${!miniState ? 'active-class-border-radius' : ''}`"
          :style="{ margin: !miniState ? '0 12px' : '' }"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section v-if="drawerOpen">
            {{ item.label }}
          </q-item-section>
          <q-tooltip v-if="miniState" anchor="center right" self="center middle">
            {{ item.label }}
          </q-tooltip>
        </q-item>
      </q-list>

      <!-- Spacer + Logout at bottom -->
      <q-space />

      <q-separator />

      <q-item
        clickable
        v-ripple
        @click="handleLogout"
        class="text-snowwhite"
        :style="{ margin: !miniState ? '0 12px' : '' }"
      >
        <q-item-section avatar>
          <q-icon name="fa-solid fa-right-from-bracket" />
        </q-item-section>
        <q-item-section v-if="drawerOpen"> Logout </q-item-section>
      </q-item>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <transition
        appear
        enter-active-class="animated slideInDown slower"
        leave-active-class="animated slideInUp slower"
      >
        <q-bar class="q-px-md q-py-lg bg-secondary-30">
          <q-breadcrumbs class="text-bold text-capitalize">
            <template v-slot:separator>
              <q-icon size="1.8em" name="chevron_right" color="secondary" />
            </template>
            <q-breadcrumbs-el :label="projectName" />
            <q-breadcrumbs-el
              :label="currentTabName"
              class="text-capitalize text-active-class text-bold"
            />
          </q-breadcrumbs>
        </q-bar>
      </transition>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const $q = useQuasar()
const isMobile = $q.platform.is.mobile
const drawerOpen = isMobile ? ref(false) : ref(true)
const miniState = isMobile ? ref(false) : ref(true)
const auth = useAuthStore()
import { showSuccess } from 'boot/notify'
const router = useRouter()

const menuItems = router
  .getRoutes()
  .filter((r) => r.meta?.showInSidebar)
  .map((r) => ({
    name: r.name,
    label: r.meta.label,
    icon: r.meta.icon,
    path: r.path,
  }))
const projectName = process.env.PROJECT_NAME
const currentTabName = ref('')

function toggleLeftDrawer() {
  if (isMobile) {
    drawerOpen.value = !drawerOpen.value
  } else {
    miniState.value = !miniState.value
  }
}

function handleLogout() {
  auth.clearToken()
  router.push('/')
  showSuccess('Logout successfully!')
}

function redirectToScreen(item) {
  currentTabName.value = item.name
  router.push(item.path)
}

onBeforeMount(() => {
  currentTabName.value = router.currentRoute.value.name
})
</script>

<style scoped>
::v-deep(.fit) {
  overflow: hidden;
}
.active-class-border-radius {
  border-radius: 8px;
}
</style>
