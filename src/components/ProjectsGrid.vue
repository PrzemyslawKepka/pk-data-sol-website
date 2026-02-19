<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { getCompanyLogo } from '../utils/companyLogos';
import {
  projectTypeColors,
  getProjectTypeLabel,
  getCategoryLabel,
  getIndustryLabel,
  getCommercialLabel,
  getLocalizedDescription
} from '../utils/translationHelpers';

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    descriptionPl?: string; // Polish short description
    categories: string[];
    technologies: string[];
    github?: string;
    liveUrl?: string;
    image?: string;
    projectType: 'fte' | 'current' | 'side';
    company?: string;
    year?: string;
    industry?: string;
    isCommercial?: boolean;
    order: number;
  };
}

interface Translations {
  projectTypes: {
    all: string;
    fte: string;
    current: string;
    side: string;
  };
  projectTypesDesc: {
    fte: string;
    current: string;
    side: string;
  };
  categories: {
    all: string;
    webApplication: string;
    automation: string;
    developerTools: string;
    dashboard: string;
    etl: string;
    dataAnalysis: string;
    webScraping: string;
  };
  industries: {
    all: string;
    finance: string;
    creditRisk: string;
    realEstate: string;
    iot: string;
    accounting: string;
    socialMedia: string;
    gaming: string;
  };
  seeMore: string;
  viewGithub: string;
  viewLive: string;
  sideNote: string;
  fteNote: string;
  sorting?: {
    label: string;
    priority: string;
    year: string;
    type: string;
    alpha: string;
  };
  badgeLabels?: {
    fte: string;
    current: string;
    side: string;
  };
  commercial?: string;
  nonCommercial?: string;
  codeLabel?: string;
  websiteLabel?: string;
}

const props = defineProps<{
  projects: Project[];
  translations: Translations;
  lang?: string;
}>();

const basePath = computed(() => props.lang === 'pl' ? '/pl' : '');

// Multi-selection filters - empty Set means "all" (no specific filter applied)
const activeTypeFilters = ref<Set<string>>(new Set());
const activeCategoryFilters = ref<Set<string>>(new Set());
const activeIndustryFilters = ref<Set<string>>(new Set());

// Read URL parameters on mount
onMounted(() => {
  const params = new URLSearchParams(window.location.search);

  // Read industry filters
  const industryParams = params.getAll('industry');
  if (industryParams.length > 0) {
    activeIndustryFilters.value = new Set(industryParams);
  }

  // Read type filters
  const typeParams = params.getAll('type');
  if (typeParams.length > 0) {
    activeTypeFilters.value = new Set(typeParams);
  }

  // Read category filters
  const categoryParams = params.getAll('category');
  if (categoryParams.length > 0) {
    activeCategoryFilters.value = new Set(categoryParams);
  }
});

// Update URL when filters change (for shareability)
function updateURL() {
  const params = new URLSearchParams();

  activeTypeFilters.value.forEach(t => params.append('type', t));
  activeCategoryFilters.value.forEach(c => params.append('category', c));
  activeIndustryFilters.value.forEach(i => params.append('industry', i));

  const newURL = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;

  window.history.replaceState({}, '', newURL);
}

// Watch all filters and update URL
watch([activeTypeFilters, activeCategoryFilters, activeIndustryFilters], updateURL, { deep: true });

// Toggle filter selection - clicking 'all' clears the set, otherwise toggle the specific item
function toggleTypeFilter(key: string) {
  if (key === 'all') {
    activeTypeFilters.value = new Set();
  } else {
    const newSet = new Set(activeTypeFilters.value);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    // Auto-switch to "All" if all available options are selected
    const availableTypes = ['current', 'fte', 'side'].filter(t => (typeCounts.value[t] || 0) > 0);
    if (availableTypes.length > 0 && availableTypes.every(t => newSet.has(t))) {
      activeTypeFilters.value = new Set();
    } else {
      activeTypeFilters.value = newSet;
    }
  }
}

function toggleCategoryFilter(key: string) {
  if (key === 'all') {
    activeCategoryFilters.value = new Set();
  } else {
    const newSet = new Set(activeCategoryFilters.value);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    // Auto-switch to "All" if all available options are selected
    const categoryKeys = ['Web Application', 'Automation', 'Developer Tools', 'Dashboard', 'ETL Pipeline', 'Data Analysis', 'Web Scraping'];
    const availableCategories = categoryKeys.filter(c => (categoryCounts.value[c] || 0) > 0);
    if (availableCategories.length > 0 && availableCategories.every(c => newSet.has(c))) {
      activeCategoryFilters.value = new Set();
    } else {
      activeCategoryFilters.value = newSet;
    }
  }
}

function toggleIndustryFilter(key: string) {
  if (key === 'all') {
    activeIndustryFilters.value = new Set();
  } else {
    const newSet = new Set(activeIndustryFilters.value);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    // Auto-switch to "All" if all available options are selected
    const industryKeys = ['Finance', 'Credit Risk', 'Real Estate', 'IoT', 'Accounting', 'Social Media', 'Gaming'];
    const availableIndustries = industryKeys.filter(i => (industryCounts.value[i] || 0) > 0);
    if (availableIndustries.length > 0 && availableIndustries.every(i => newSet.has(i))) {
      activeIndustryFilters.value = new Set();
    } else {
      activeIndustryFilters.value = newSet;
    }
  }
}

// Check if a filter is active
function isTypeActive(key: string): boolean {
  return key === 'all' ? activeTypeFilters.value.size === 0 : activeTypeFilters.value.has(key);
}

function isCategoryActive(key: string): boolean {
  return key === 'all' ? activeCategoryFilters.value.size === 0 : activeCategoryFilters.value.has(key);
}

function isIndustryActive(key: string): boolean {
  return key === 'all' ? activeIndustryFilters.value.size === 0 : activeIndustryFilters.value.has(key);
}

// Sorting
type SortField = 'priority' | 'year' | 'type' | 'alpha';
type SortDirection = 'asc' | 'desc';

const activeSortField = ref<SortField>('priority');
const yearDirection = ref<SortDirection>('desc'); // desc = newest first
const alphaDirection = ref<SortDirection>('asc'); // asc = A-Z

function toggleSort(field: SortField) {
  if (activeSortField.value === field) {
    // Toggle direction if same field clicked
    if (field === 'year') {
      yearDirection.value = yearDirection.value === 'desc' ? 'asc' : 'desc';
    } else if (field === 'alpha') {
      alphaDirection.value = alphaDirection.value === 'asc' ? 'desc' : 'asc';
    }
  } else {
    activeSortField.value = field;
  }
}

const sortOptions = computed(() => [
  { key: 'priority' as SortField, label: props.translations.sorting?.priority ?? 'Priority', hasArrows: false },
  { key: 'year' as SortField, label: props.translations.sorting?.year ?? 'Year', hasArrows: true, direction: yearDirection.value },
  { key: 'type' as SortField, label: props.translations.sorting?.type ?? 'Type', hasArrows: false },
  { key: 'alpha' as SortField, label: props.translations.sorting?.alpha ?? 'Name', hasArrows: true, direction: alphaDirection.value },
]);

// Type sort order
const typeSortOrder: Record<string, number> = {
  current: 1,
  fte: 2,
  side: 3
};

const projectTypes = computed(() => [
  { key: 'all', label: props.translations.projectTypes.all },
  { key: 'current', label: props.translations.projectTypes.current },
  { key: 'fte', label: props.translations.projectTypes.fte },
  { key: 'side', label: props.translations.projectTypes.side }
]);

const categories = computed(() => [
  { key: 'all', label: props.translations.categories.all },
  { key: 'Web Application', label: props.translations.categories.webApplication },
  { key: 'Automation', label: props.translations.categories.automation },
  { key: 'Developer Tools', label: props.translations.categories.developerTools },
  { key: 'Dashboard', label: props.translations.categories.dashboard },
  { key: 'ETL Pipeline', label: props.translations.categories.etl },
  { key: 'Data Analysis', label: props.translations.categories.dataAnalysis },
  { key: 'Web Scraping', label: props.translations.categories.webScraping }
]);

const industries = computed(() => [
  { key: 'all', label: props.translations.industries.all },
  { key: 'Finance', label: props.translations.industries.finance },
  { key: 'Credit Risk', label: props.translations.industries.creditRisk },
  { key: 'Real Estate', label: props.translations.industries.realEstate },
  { key: 'IoT', label: props.translations.industries.iot },
  { key: 'Accounting', label: props.translations.industries.accounting },
  { key: 'Social Media', label: props.translations.industries.socialMedia },
  { key: 'Gaming', label: props.translations.industries.gaming }
]);

// Filter counts - calculated based on OTHER active filters
// Type counts: filtered by current category and industry selections
const typeCounts = computed(() => {
  const counts: Record<string, number> = { all: 0 };

  let baseFiltered = props.projects;

  // Apply category filters
  if (activeCategoryFilters.value.size > 0) {
    baseFiltered = baseFiltered.filter(p =>
      p.data.categories.some(cat => activeCategoryFilters.value.has(cat))
    );
  }

  // Apply industry filters
  if (activeIndustryFilters.value.size > 0) {
    baseFiltered = baseFiltered.filter(p =>
      p.data.industry && activeIndustryFilters.value.has(p.data.industry)
    );
  }

  // Count all projects matching current filters
  counts.all = baseFiltered.length;

  // Count per type
  for (const project of baseFiltered) {
    const type = project.data.projectType;
    counts[type] = (counts[type] || 0) + 1;
  }

  return counts;
});

// Category counts: filtered by current type and industry selections
const categoryCounts = computed(() => {
  const counts: Record<string, number> = { all: 0 };

  let baseFiltered = props.projects;

  // Apply type filters
  if (activeTypeFilters.value.size > 0) {
    baseFiltered = baseFiltered.filter(p => activeTypeFilters.value.has(p.data.projectType));
  }

  // Apply industry filters
  if (activeIndustryFilters.value.size > 0) {
    baseFiltered = baseFiltered.filter(p =>
      p.data.industry && activeIndustryFilters.value.has(p.data.industry)
    );
  }

  // Count all projects matching current filters
  counts.all = baseFiltered.length;

  // Count per category (a project can have multiple categories)
  for (const project of baseFiltered) {
    for (const category of project.data.categories) {
      counts[category] = (counts[category] || 0) + 1;
    }
  }

  return counts;
});

// Industry counts: filtered by current type and category selections
const industryCounts = computed(() => {
  const counts: Record<string, number> = { all: 0 };

  let baseFiltered = props.projects;

  // Apply type filters
  if (activeTypeFilters.value.size > 0) {
    baseFiltered = baseFiltered.filter(p => activeTypeFilters.value.has(p.data.projectType));
  }

  // Apply category filters
  if (activeCategoryFilters.value.size > 0) {
    baseFiltered = baseFiltered.filter(p =>
      p.data.categories.some(cat => activeCategoryFilters.value.has(cat))
    );
  }

  // Count all projects matching current filters
  counts.all = baseFiltered.length;

  // Count per industry
  for (const project of baseFiltered) {
    if (project.data.industry) {
      counts[project.data.industry] = (counts[project.data.industry] || 0) + 1;
    }
  }

  return counts;
});

const filteredProjects = computed(() => {
  let filtered = props.projects;

  // Filter by project type (if any selected)
  if (activeTypeFilters.value.size > 0) {
    filtered = filtered.filter(p => activeTypeFilters.value.has(p.data.projectType));
  }

  // Filter by category (if any selected) - project matches if it has ANY of the selected categories
  if (activeCategoryFilters.value.size > 0) {
    filtered = filtered.filter(p =>
      p.data.categories.some(cat => activeCategoryFilters.value.has(cat))
    );
  }

  // Filter by industry (if any selected)
  if (activeIndustryFilters.value.size > 0) {
    filtered = filtered.filter(p => p.data.industry && activeIndustryFilters.value.has(p.data.industry));
  }

  // Apply selected sort
  return filtered.sort((a, b) => {
    switch (activeSortField.value) {
      case 'priority':
        // Sort by order (higher first), then by title
        if (b.data.order !== a.data.order) {
          return b.data.order - a.data.order;
        }
        return a.data.title.localeCompare(b.data.title);

      case 'year':
        // Projects without year go last regardless of direction
        const yearA = a.data.year ? parseInt(a.data.year) : (yearDirection.value === 'desc' ? -Infinity : Infinity);
        const yearB = b.data.year ? parseInt(b.data.year) : (yearDirection.value === 'desc' ? -Infinity : Infinity);
        if (yearA !== yearB) {
          return yearDirection.value === 'desc' ? yearB - yearA : yearA - yearB;
        }
        return a.data.title.localeCompare(b.data.title);

      case 'type':
        // Sort by type order, then by title
        const typeOrderA = typeSortOrder[a.data.projectType] ?? 99;
        const typeOrderB = typeSortOrder[b.data.projectType] ?? 99;
        if (typeOrderA !== typeOrderB) return typeOrderA - typeOrderB;
        return a.data.title.localeCompare(b.data.title);

      case 'alpha':
        return alphaDirection.value === 'asc'
          ? a.data.title.localeCompare(b.data.title)
          : b.data.title.localeCompare(a.data.title);

      default:
        return 0;
    }
  });
});

const currentTypeDesc = computed(() => {
  // Only show description if exactly one type is selected
  if (activeTypeFilters.value.size !== 1) return null;
  const selectedType = Array.from(activeTypeFilters.value)[0];
  return props.translations.projectTypesDesc[selectedType as keyof typeof props.translations.projectTypesDesc];
});

// Wrapper functions that use centralized helpers with component translations
const getTypeLabel = (type: string) => getProjectTypeLabel(type, props.translations);
const getCategoryLabelTranslated = (cat: string) => getCategoryLabel(cat, props.translations);
const getIndustryLabelTranslated = (ind: string) => getIndustryLabel(ind, props.translations);
const getCommercialLabelTranslated = (isCommercial: boolean) => getCommercialLabel(isCommercial, props.translations);
const getDescription = (project: Project) => getLocalizedDescription(project.data, props.lang || 'en');
</script>

<template>
  <div>
    <!-- Filter Section -->
    <div class="mb-8 space-y-4">
      <!-- Project Type Filter -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="type in projectTypes"
          v-show="type.key === 'all' || (typeCounts[type.key] || 0) > 0"
          :key="type.key"
          @click="toggleTypeFilter(type.key)"
          :class="[
            'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
            isTypeActive(type.key)
              ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-500 hover:text-amber-500'
          ]"
        >
          {{ type.label }} <span class="text-xs opacity-70">({{ typeCounts[type.key] || 0 }})</span>
        </button>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="category in categories"
          v-show="category.key === 'all' || (categoryCounts[category.key] || 0) > 0"
          :key="category.key"
          @click="toggleCategoryFilter(category.key)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            isCategoryActive(category.key)
              ? 'bg-amber-600 text-slate-900 shadow-lg shadow-amber-600/30'
              : 'bg-slate-800/70 text-slate-400 border border-slate-700/70 hover:border-amber-500 hover:text-amber-500'
          ]"
        >
          {{ category.label }} <span class="text-xs opacity-70">({{ categoryCounts[category.key] || 0 }})</span>
        </button>
      </div>

      <!-- Industry Filter -->
      <div class="flex flex-wrap justify-center gap-3">
        <button
          v-for="industry in industries"
          v-show="industry.key === 'all' || (industryCounts[industry.key] || 0) > 0"
          :key="industry.key"
          @click="toggleIndustryFilter(industry.key)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all',
            isIndustryActive(industry.key)
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
              : 'bg-slate-800/70 text-slate-400 border border-slate-700/70 hover:border-pink-500 hover:text-pink-500'
          ]"
        >
          {{ industry.label }} <span class="text-xs opacity-70">({{ industryCounts[industry.key] || 0 }})</span>
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

    <!-- Type Description -->
    <p v-if="currentTypeDesc" class="text-center text-slate-400 mb-8 max-w-2xl mx-auto">
      {{ currentTypeDesc }}
    </p>

    <!-- Special Notes -->
    <div v-if="activeTypeFilters.has('fte') && activeTypeFilters.size === 1" class="text-center mb-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg max-w-2xl mx-auto">
      <p class="text-blue-400 text-sm">{{ translations.fteNote }}</p>
    </div>
    <div v-if="activeTypeFilters.has('side') && activeTypeFilters.size === 1" class="text-center mb-8 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg max-w-2xl mx-auto">
      <p class="text-purple-400 text-sm">{{ translations.sideNote }}</p>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <article
        v-for="project in filteredProjects"
        :key="project.slug"
        class="group h-full flex flex-col bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all hover:border-amber-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
      >
        <a :href="`${basePath}/projects/${project.slug}`" class="flex-1 flex flex-col">
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
            <div :class="`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium border ${projectTypeColors[project.data.projectType]}`">
              {{ getTypeLabel(project.data.projectType) }}
            </div>

            <!-- Category Badges -->
            <div class="absolute top-3 right-3 flex flex-row-reverse gap-2">
              <div
                v-for="category in project.data.categories"
                :key="category"
                class="px-3 py-1 rounded-full text-xs font-medium bg-amber-600/90 text-slate-900 border border-amber-400/50 backdrop-blur-sm shadow-lg"
              >
                {{ getCategoryLabelTranslated(category) }}
              </div>
            </div>

            <!-- Industry Badge -->
            <div
              v-if="project.data.industry"
              class="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium bg-pink-600/90 text-slate-100 border border-pink-400/50 backdrop-blur-sm shadow-lg"
            >
              {{ getIndustryLabelTranslated(project.data.industry) }}
            </div>

            <!-- Commercial Status Badge (only for current projects) -->
            <div
              v-if="project.data.projectType === 'current' && project.data.isCommercial !== undefined"
              :class="[
                'absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm shadow-lg border',
                project.data.isCommercial
                  ? 'bg-teal-600/90 text-slate-900 border-teal-400/50'
                  : 'bg-slate-600/90 text-slate-200 border-slate-400/50'
              ]"
            >
              {{ getCommercialLabelTranslated(project.data.isCommercial) }}
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-start justify-between gap-2 mb-2">
              <h3 class="text-xl font-bold text-slate-100 group-hover:text-amber-500 transition-colors">
                {{ project.data.title }}
              </h3>
              <span v-if="project.data.year" class="text-sm text-slate-500 whitespace-nowrap">
                {{ project.data.year }}
              </span>
            </div>

            <p v-if="project.data.company" class="text-sm text-slate-400 mb-2 flex items-center gap-2">
              <img
                v-if="getCompanyLogo(project.data.company)"
                :src="getCompanyLogo(project.data.company)!"
                :alt="project.data.company"
                class="h-6 w-auto object-contain"
                width="24"
                height="24"
              />
              {{ project.data.company }}
            </p>

            <p class="text-slate-300 text-sm mb-4 line-clamp-3 flex-1">
              {{ getDescription(project) }}
            </p>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.data.technologies.slice(0, 5)"
                :key="tech"
                class="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded"
              >
                {{ tech }}
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
            :href="`${basePath}/projects/${project.slug}`"
            class="flex-1 text-center px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 text-slate-900 hover:bg-amber-600 transition-colors"
          >
            {{ translations.seeMore }}
          </a>

          <a
            v-if="project.data.github"
            :href="project.data.github"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-600 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-colors"
            @click.stop
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
{{ translations.codeLabel || 'Code' }}
          </a>

          <a
            v-if="project.data.liveUrl"
            :href="project.data.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-600 text-slate-300 hover:border-amber-500 hover:text-amber-500 transition-colors"
            @click.stop
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
{{ translations.websiteLabel || 'Website' }}
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
