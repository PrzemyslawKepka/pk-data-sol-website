<script setup lang="ts">
import { ref, computed } from 'vue';

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    category: string;
    technologies: string[];
    github?: string;
    liveUrl?: string;
    image?: string;
    projectType: 'fte' | 'current' | 'side';
    company?: string;
    year?: string;
    order: number;
  };
}

interface Translations {
  categories: {
    all: string;
    fte: string;
    current: string;
    side: string;
  };
  categoriesDesc: {
    fte: string;
    current: string;
    side: string;
  };
  seeMore: string;
  viewGithub: string;
  viewLive: string;
  sideNote: string;
  fteNote: string;
}

const props = defineProps<{
  projects: Project[];
  translations: Translations;
}>();

const activeFilter = ref('all');

const categories = computed(() => [
  { key: 'all', label: props.translations.categories.all },
  { key: 'current', label: props.translations.categories.current },
  { key: 'fte', label: props.translations.categories.fte },
  { key: 'side', label: props.translations.categories.side }
]);

const filteredProjects = computed(() => {
  let filtered = props.projects;

  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(p => p.data.projectType === activeFilter.value);
  }

  // Sort by order (higher first), then by title
  return filtered.sort((a, b) => {
    if (b.data.order !== a.data.order) {
      return b.data.order - a.data.order;
    }
    return a.data.title.localeCompare(b.data.title);
  });
});

const currentCategoryDesc = computed(() => {
  if (activeFilter.value === 'all') return null;
  return props.translations.categoriesDesc[activeFilter.value as keyof typeof props.translations.categoriesDesc];
});

// Project type badge colors
const typeColors: Record<string, string> = {
  fte: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  current: 'bg-green-500/20 text-green-400 border-green-500/30',
  side: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const typeLabels: Record<string, string> = {
  fte: 'Corporate',
  current: 'Current',
  side: 'Side Project'
};
</script>

<template>
  <div>
    <!-- Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-3 mb-8">
      <button
        v-for="category in categories"
        :key="category.key"
        @click="activeFilter = category.key"
        :class="[
          'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
          activeFilter === category.key
            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-500 hover:text-amber-500'
        ]"
      >
        {{ category.label }}
      </button>
    </div>

    <!-- Category Description -->
    <p v-if="currentCategoryDesc" class="text-center text-slate-400 mb-8 max-w-2xl mx-auto">
      {{ currentCategoryDesc }}
    </p>

    <!-- Special Notes -->
    <div v-if="activeFilter === 'fte'" class="text-center mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg max-w-2xl mx-auto">
      <p class="text-blue-400 text-sm">{{ translations.fteNote }}</p>
    </div>
    <div v-if="activeFilter === 'side'" class="text-center mb-8 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg max-w-2xl mx-auto">
      <p class="text-purple-400 text-sm">{{ translations.sideNote }}</p>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="project in filteredProjects"
        :key="project.slug"
        class="group bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all hover:border-amber-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
      >
        <a :href="`/projects/${project.slug}`" class="block">
          <!-- Image -->
          <div class="relative w-full h-[200px] bg-gradient-to-br from-slate-700 to-slate-900 overflow-hidden">
            <img
              v-if="project.data.image"
              :src="project.data.image"
              :alt="project.data.title"
              class="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-slate-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>

            <!-- Project Type Badge -->
            <div :class="`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${typeColors[project.data.projectType]}`">
              {{ typeLabels[project.data.projectType] }}
            </div>

            <!-- Category Badge -->
            <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
              {{ project.data.category }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-500 transition-colors">
                {{ project.data.title }}
              </h3>
              <span v-if="project.data.year" class="text-sm text-slate-500 whitespace-nowrap">
                {{ project.data.year }}
              </span>
            </div>

            <p v-if="project.data.company" class="text-sm text-slate-400 mb-2">
              {{ project.data.company }}
            </p>

            <p class="text-slate-300 text-sm mb-4 line-clamp-3">
              {{ project.data.description }}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.data.technologies.slice(0, 5)"
                :key="tech"
                class="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded"
              >
                #{{ tech }}
              </span>
              <span
                v-if="project.data.technologies.length > 5"
                class="px-2 py-1 text-xs bg-slate-700 text-slate-400 rounded"
              >
                +{{ project.data.technologies.length - 5 }}
              </span>
            </div>
          </div>
        </a>

        <!-- Action Links -->
        <div class="px-6 pb-6 flex gap-3">
          <a
            :href="`/projects/${project.slug}`"
            class="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          >
            {{ translations.seeMore }}
          </a>

          <a
            v-if="project.data.github"
            :href="project.data.github"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-600 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-colors"
            @click.stop
          >
            GitHub
          </a>

          <a
            v-if="project.data.liveUrl"
            :href="project.data.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-600 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-colors"
            @click.stop
          >
            Live
          </a>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <p class="text-slate-400">No projects found in this category.</p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
