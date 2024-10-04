<script setup lang="ts">
import type { ITask } from '@/shared/models';
import { Status } from '@/shared/types';
import { useTaskStore } from '@/stores/task.store'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const store = useTaskStore()
const router = useRouter()

onMounted(() => {
  store.task = {
    name: '',
    description: '',
    status: Status.Pending
  }
})

function show(task: ITask) {
  store.task = task
  router.push(`/show/${task.name.toLowerCase().replace(/\s/g, '-')}`)
}

function update(task: ITask) {
  store.task = task
  store.toogleCreateModal()
}
</script>

<template>
  <v-container class="tw-min-h-[80vh] tw-flex tw-items-center">
    <v-list v-if="store.tasks.length > 0" width="500" class="mx-auto">
      <v-list-item :class="index === store.tasks.length - 1 ? `py-2` : `border-b py-2`" tile
        :title="task.name" :subtitle="task.description" v-for="(task, index) in store.tasks" :key="task.id">
        <template #append>
          <v-btn variant="text" class="mx-2" icon @click="show(task)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn variant="text" class="mx-2" icon @click="update(task)">
            <v-icon>mdi-update</v-icon>
          </v-btn>
          <v-btn variant="text" class="mx-2" icon @click="store.removeTask(task.id!)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-card width="500" class="mx-auto" v-else>
      <v-card-text>
        No tasks found
      </v-card-text>
    </v-card>
  </v-container>
</template>
