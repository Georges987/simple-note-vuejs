import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ITask } from '@/shared/models'
import { Status } from '@/shared/types'

export const useTaskStore = defineStore('task', () => {
  const task = ref<ITask>({
    name: "",
    description: "",
    status: Status.Pending
  });

  const create_modal = ref(false);

  const clearTask = () => {
    task.value = {
      name: "",
      description: "",
      status: Status.Pending
    }
  }

  const tasks = ref<ITask[]>([]);

  const toogleCreateModal = () => {
    create_modal.value = !create_modal.value;
  }

  const addTask = () => {
    task.value.id = tasks.value.length + 1;
    tasks.value.push(task.value);
    toogleCreateModal();
    clearTask();
  };

  const removeTask = (id: number) => {
    tasks.value = tasks.value.filter(task => task.id !== id);
  };

  const updateTask = () => {
    const index = tasks.value.findIndex(t => t.id === task.value.id);
    tasks.value[index] = task.value;
    toogleCreateModal();
    clearTask();
  }

  const completedTasks = computed(() => tasks.value.filter(ts => ts.status === Status.Completed));

  const filteredTasksByStatusP = computed(() => tasks.value.filter(ts => ts.status === Status.Pending));

  const filteredTasksByStatusC = computed(() => tasks.value.filter(ts => ts.status === Status.Completed));

  const filteredByName = computed(() => tasks.value.filter(ts => ts.name.toLowerCase().includes(task.value.name.toLowerCase())));

  return {
    task,
    tasks,
    create_modal,
    addTask,
    clearTask,
    removeTask,
    updateTask,
    toogleCreateModal,
    completedTasks,
    filteredTasksByStatusP,
    filteredTasksByStatusC,
    filteredByName
  };
},
  {
    persist: true,
  },
);
