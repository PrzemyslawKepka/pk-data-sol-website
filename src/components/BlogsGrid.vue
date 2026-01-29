<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    publishDate: Date;
    category: 'Technical' | 'Business';
    tags: string[];
    image?: string;
    readTime?: number;
    order: number;
  };
}

interface Translations {
  seeFullPost: string;
  minRead: string;
  categories: {
    all: string;
    Technical: string;
    Business: string;
  };
  filterByCategory: string;
  sorting?: {
    label: string;
    date: string;
    alpha: string;
  };
}

const props = defineProps<{
  posts: BlogPost[];
  translations: Translations;
}>();

// Category filter - empty means "all"
const activeCategoryFilter = ref<string>('');

// Read URL parameters on mount
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  if (categoryParam && ['Technical', 'Business'].includes(categoryParam)) {
    activeCategoryFilter.value = categoryParam;
  }
});

// Update URL when filters change
function updateURL() {
  const params = new URLSearchParams();
  if (activeCategoryFilter.value) {
    params.set('category', activeCategoryFilter.value);
  }
  const newURL = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  window.history.replaceState({}, '', newURL);
}

watch(activeCategoryFilter, updateURL);

// Toggle category filter
function setCategoryFilter(category: string) {
  activeCategoryFilter.value = category === 'all' ? '' : category;
}

function isCategoryActive(category: string): boolean {
  return category === 'all' ? activeCategoryFilter.value === '' : activeCategoryFilter.value === category;
}

// Sorting
type SortField = 'date' | 'alpha';
type SortDirection = 'asc' | 'desc';

const activeSortField = ref<SortField>('date');
const dateDirection = ref<SortDirection>('desc'); // desc = newest first
const alphaDirection = ref<SortDirection>('asc'); // asc = A-Z

function toggleSort(field: SortField) {
  if (activeSortField.value === field) {
    if (field === 'date') {
      dateDirection.value = dateDirection.value === 'desc' ? 'asc' : 'desc';
    } else if (field === 'alpha') {
      alphaDirection.value = alphaDirection.value === 'asc' ? 'desc' : 'asc';
    }
  } else {
    activeSortField.value = field;
  }
}

const sortOptions = computed(() => [
  { key: 'date' as SortField, label: props.translations.sorting?.date ?? 'Date', hasArrows: true, direction: dateDirection.value },
  { key: 'alpha' as SortField, label: props.translations.sorting?.alpha ?? 'Name', hasArrows: true, direction: alphaDirection.value },
]);

const categories = computed(() => [
  { key: 'all', label: props.translations.categories.all },
  { key: 'Technical', label: props.translations.categories.Technical },
  { key: 'Business', label: props.translations.categories.Business }
]);

// Category counts
const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: props.posts.length };
  for (const post of props.posts) {
    counts[post.data.category] = (counts[post.data.category] || 0) + 1;
  }
  return counts;
});

const filteredPosts = computed(() => {
  let filtered = props.posts;

  // Filter by category
  if (activeCategoryFilter.value) {
    filtered = filtered.filter(p => p.data.category === activeCategoryFilter.value);
  }

  // Apply sort
  return filtered.sort((a, b) => {
    switch (activeSortField.value) {
      case 'date':
        const dateA = new Date(a.data.publishDate).getTime();
        const dateB = new Date(b.data.publishDate).getTime();
        return dateDirection.value === 'desc' ? dateB - dateA : dateA - dateB;

      case 'alpha':
        return alphaDirection.value === 'asc'
          ? a.data.title.localeCompare(b.data.title)
          : b.data.title.localeCompare(a.data.title);

      default:
        return 0;
    }
  });
});

// Category badge colors
const categoryColors: Record<string, string> = {
  Technical: 'bg-blue-600/90 text-white border-blue-400/50 backdrop-blur-sm shadow-lg',
  Business: 'bg-green-600/90 text-white border-green-400/50 backdrop-blur-sm shadow-lg'
};

// Format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return new Date(date).toISOString().split('T')[0];
}
</script>

<template>
  <div>
    <!-- Filter Section -->
    <div class="mb-8 space-y-4">
      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="category in categories"
          v-show="category.key === 'all' || (categoryCounts[category.key] || 0) > 0"
          :key="category.key"
          @click="setCategoryFilter(category.key)"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
            isCategoryActive(category.key)
              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-500 hover:text-amber-500'
          ]"
        >
          {{ category.label }} <span class="text-xs opacity-70">({{ categoryCounts[category.key] || 0 }})</span>
        </button>
      </div>

      <!-- Sort Options -->
      <div class="flex flex-wrap justify-center items-center gap-3 pt-4 border-t border-slate-700/50">
        <span class="text-slate-500 text-sm font-medium">{{ translations.sorting?.label ?? 'Sort by' }}:</span>
        <button
          v-for="option in sortOptions"
          :key="option.key"
          @click="toggleSort(option.key)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            activeSortField === option.key
              ? 'bg-slate-600 text-white shadow-lg shadow-slate-600/30'
              : 'bg-slate-800/70 text-slate-400 border border-slate-700/70 hover:border-slate-500 hover:text-slate-300'
          ]"
        >
          {{ option.label }}<span v-if="option.hasArrows" class="ml-1 inline-flex gap-0.5"><span :class="activeSortField === option.key && option.direction === 'asc' ? 'text-white' : 'text-slate-500'">↑</span><span :class="activeSortField === option.key && option.direction === 'desc' ? 'text-white' : 'text-slate-500'">↓</span></span>
        </button>
      </div>
    </div>

    <!-- Blog Posts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="post in filteredPosts"
        :key="post.slug"
        class="group h-full flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all hover:border-amber-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
      >
        <a :href="`/blog/${post.slug}`" class="flex-1 flex flex-col">
          <!-- Image -->
          <div class="relative w-full aspect-video bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
            <img
              v-if="post.data.image"
              :src="post.data.image"
              :alt="post.data.title"
              class="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-slate-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>

            <!-- Category Badge -->
            <div :class="`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[post.data.category]}`">
              {{ post.data.category }}
            </div>

            <!-- Read Time Badge -->
            <div
              v-if="post.data.readTime"
              class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-slate-600/90 text-slate-200 border border-slate-400/50 backdrop-blur-sm shadow-lg"
            >
              {{ post.data.readTime }} {{ translations.minRead }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-500 transition-colors">
                {{ post.data.title }}
              </h3>
              <span class="text-sm text-slate-500 whitespace-nowrap">
                {{ formatDate(post.data.publishDate) }}
              </span>
            </div>

            <p class="text-slate-300 text-sm mb-4 line-clamp-3 flex-1">
              {{ post.data.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.data.tags.slice(0, 5)"
                :key="tag"
                class="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded"
              >
                #{{ tag }}
              </span>
              <span
                v-if="post.data.tags.length > 5"
                class="px-2 py-1 text-xs bg-slate-700 text-slate-400 rounded"
              >
                +{{ post.data.tags.length - 5 }}
              </span>
            </div>
          </div>
        </a>

        <!-- Action Links -->
        <div class="px-6 pb-6 flex gap-3">
          <a
            :href="`/blog/${post.slug}`"
            class="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          >
            {{ translations.seeFullPost }}
          </a>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPosts.length === 0" class="text-center py-12">
      <p class="text-slate-400">No blog posts found in this category.</p>
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
