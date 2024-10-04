<script setup lang="ts">
import { Status } from '@/shared/types';
import { useTaskStore } from '@/stores/task.store'
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const store = useTaskStore()
const router = useRouter()

onBeforeMount(() => {
  if (!store.task.id) {
    router.push('/')
  }
})

const isCompleted = computed(() => store.task.status === Status.Completed)
</script>

<template>
  <div class="tw-flex tw-items-center tw-h-[80vh]">
    <v-card class="mx-auto" width="500" variant="outlined" :color="!isCompleted ? `blue` : `success`">
      <v-card-title>
        {{ store.task.name }}
      </v-card-title>
      <v-card-text>
        {{ store.task.description }}
        <v-divider class="my-4"></v-divider>
        {{ store.task.status }}
      </v-card-text>
    </v-card>
  </div>
</template>