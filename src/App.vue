<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon v-if="isShowPage" @click="router.push('/')">
        <template #default>
          <v-icon>mdi-arrow-left</v-icon>
        </template>
      </v-app-bar-nav-icon>
      <v-app-bar-title> TaskApp </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
      <task-modal></task-modal>
    </v-main>
    <v-btn @click="store.toogleCreateModal" class="mr-8 mb-8" fab location="bottom end" position="absolute" size="64">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script lang="ts" setup>
import { RouterView, useRouter } from 'vue-router'
import { useTaskStore } from './stores/task.store';
import TaskModal from './components/modals/TaskModal.vue'
import { computed } from 'vue';
const store = useTaskStore()

const router = useRouter()

const isShowPage = computed(() => router.currentRoute.value.name === 'show')
</script>
