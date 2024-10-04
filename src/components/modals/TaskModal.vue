<script setup lang="ts">
import { Status } from '@/shared/types';
import { useTaskStore } from '@/stores/task.store'
import { computed, ref, watch } from 'vue';

const store = useTaskStore()

const isUpdate = computed(() => store.task.id === undefined)
const status = ref(store.task.status === Status.Completed)

watch(status, (value) => {
    store.task.status = value ? Status.Completed : Status.Pending
})

const rules = {
    required: (value: string) => !!value || 'Required.',
    maxi: (value: string) => value.length <= 1000 || 'Max 100 characters'
}

const taskForm = ref<any>(null)

function submit() {
    if (taskForm.value && taskForm.value.validate()) {
        store.addTask()
    }
}
</script>
<template>
    <v-dialog v-model="store.create_modal">
        <v-card width="500" class="mx-auto">
            <v-card-title>
                Create Task
            </v-card-title>
            <v-card-text>
                <v-form ref="taskForm" @submit.prevent="submit">
                    <v-text-field :rules="[rules.required]" v-model="store.task.name" label="Task name"
                        required></v-text-field>
                    <v-textarea :rules="[rules.required, rules.maxi]" v-model="store.task.description"
                        label="Task description" required></v-textarea>
                    <v-checkbox :label="`Status : ${store.task.status}`" :disabled="isUpdate"
                        v-model="status"></v-checkbox>
                    <v-btn type="submit">Create task</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>