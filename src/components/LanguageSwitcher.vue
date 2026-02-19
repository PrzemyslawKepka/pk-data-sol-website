<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLanguageFromPath, getLocalizedPath, setStoredLanguage } from '../utils/languageStore';
import type { Language } from '../utils/languageStore';

const currentLang = ref<Language>('en');

onMounted(() => {
  currentLang.value = getLanguageFromPath();
});

function switchLanguage(lang: Language) {
  if (lang === currentLang.value) return;

  setStoredLanguage(lang);
  const newPath = getLocalizedPath(lang, window.location.pathname);
  window.location.href = newPath + window.location.hash;
}
</script>

<template>
  <div class="flex gap-2 items-center">
    <button
      @click="switchLanguage('en')"
      :class="[
        'py-1 px-2 border-none bg-transparent cursor-pointer font-medium text-sm transition-all',
        currentLang === 'en' ? 'text-sky-500 font-bold' : 'text-slate-400 hover:text-slate-100'
      ]"
      aria-label="Switch to English"
    >
      EN
    </button>
    <span class="text-slate-400 font-light">/</span>
    <button
      @click="switchLanguage('pl')"
      :class="[
        'py-1 px-2 border-none bg-transparent cursor-pointer font-medium text-sm transition-all',
        currentLang === 'pl' ? 'text-sky-500 font-bold' : 'text-slate-400 hover:text-slate-100'
      ]"
      aria-label="Przełącz na polski"
    >
      PL
    </button>
  </div>
</template>
