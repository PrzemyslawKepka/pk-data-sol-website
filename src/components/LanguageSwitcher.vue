<script setup>
import { ref } from 'vue';

const currentLang = ref('en');

function switchLanguage(lang) {
  currentLang.value = lang;
  document.documentElement.lang = lang;
  // Future: Add actual language switching logic
}
</script>

<template>
  <div class="language-switcher">
    <button
      @click="switchLanguage('en')"
      :class="{ active: currentLang === 'en' }"
      aria-label="Switch to English"
    >
      EN
    </button>
    <span class="separator">/</span>
    <button
      @click="switchLanguage('pl')"
      :class="{ active: currentLang === 'pl' }"
      aria-label="Przełącz na polski"
    >
      PL
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

button {
  padding: 0.25rem 0.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-text-secondary);
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

button:hover {
  color: var(--color-text-primary);
}

button.active {
  color: var(--color-accent-blue);
  font-weight: 700;
}

.separator {
  color: var(--color-text-secondary);
  font-weight: 300;
}
</style>
