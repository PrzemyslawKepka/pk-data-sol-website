<script setup lang="ts">
interface Props {
  name: string;
  description: string;
  icon: string; // SVG content or icon identifier
  isLearning?: boolean;
  learningLabel?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="tech-card-container">
    <div class="tech-card">
      <!-- Front of card -->
      <div class="tech-card-front">
        <div class="icon-wrapper">
          <img v-if="icon" :src="icon" :alt="name" class="tech-icon" />
        </div>
        <span class="tech-name">{{ name }}</span>
        <span v-if="isLearning" class="learning-badge">{{ learningLabel || 'Learning' }}</span>
      </div>

      <!-- Back of card -->
      <div class="tech-card-back">
        <div class="back-content">
          <span class="tech-name-back">{{ name }}</span>
          <p class="tech-description">{{ description }}</p>
          <span v-if="isLearning" class="learning-badge-back">{{ learningLabel || 'Learning' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-card-container {
  perspective: 1000px;
  width: 140px;
  height: 140px;
}

.tech-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-card-container:hover .tech-card {
  transform: rotateY(180deg);
}

.tech-card-front,
.tech-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
  border: 1px solid rgb(51, 65, 85); /* slate-700 */
  background: rgb(30, 41, 59); /* slate-800 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.tech-card-container:hover .tech-card-front,
.tech-card-container:hover .tech-card-back {
  border-color: rgb(245, 158, 11); /* amber-500 */
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.tech-card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, rgb(30, 41, 59) 0%, rgb(15, 23, 42) 100%);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.tech-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tech-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgb(241, 245, 249); /* slate-100 */
  text-align: center;
  line-height: 1.2;
}

.tech-name-back {
  font-size: 0.75rem;
  font-weight: 700;
  color: rgb(245, 158, 11); /* amber-500 */
  text-align: center;
  margin-bottom: 6px;
}

.tech-description {
  font-size: 0.6875rem;
  color: rgb(203, 213, 225); /* slate-300 */
  text-align: center;
  line-height: 1.4;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.back-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 4px;
}

.learning-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 0.5625rem;
  padding: 2px 6px;
  background: rgba(245, 158, 11, 0.2);
  color: rgb(245, 158, 11);
  border-radius: 9999px;
  font-weight: 500;
}

.learning-badge-back {
  font-size: 0.5625rem;
  padding: 2px 6px;
  background: rgba(245, 158, 11, 0.2);
  color: rgb(245, 158, 11);
  border-radius: 9999px;
  font-weight: 500;
  margin-top: 4px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .tech-card-container {
    width: 120px;
    height: 120px;
  }

  .icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .tech-name {
    font-size: 0.75rem;
  }

  .tech-description {
    font-size: 0.625rem;
    -webkit-line-clamp: 3;
  }
}
</style>
