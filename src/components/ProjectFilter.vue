<script setup lang="ts">
import { ref, computed } from 'vue';

interface Category {
  key: string;
  label: string;
}

const props = defineProps<{
  categories: Category[];
  initialFilter?: string;
}>();

const emit = defineEmits<{
  filterChange: [filter: string];
}>();

const activeFilter = ref(props.initialFilter || 'all');

const selectFilter = (key: string) => {
  activeFilter.value = key;
  emit('filterChange', key);
};
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3">
    <button
      v-for="category in categories"
      :key="category.key"
      @click="selectFilter(category.key)"
      :class="[
        'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
        activeFilter === category.key
          ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
          : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-500 hover:text-amber-500'
      ]"
    >
      {{ category.label }}
    </button>
  </div>
</template>
