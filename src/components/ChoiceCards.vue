<template>
  <div class="choice-cards-container">
    <div class="cards-list">
      <button
        v-for="(choice, index) in choices"
        :key="choice.id"
        class="choice-card"
        :class="{ selected: isSelected(choice.id) }"
        @click="selectChoice(choice.id)"
      >
        <div class="card-header">
           <span class="choice-letter">{{ getLetter(index) }}.</span>
           <span class="card-title">{{ choice.title }}</span>
        </div>
        
        <div v-if="choice.description" class="card-description">
          {{ choice.description }}
        </div>

        <!-- Selection Icon (Cursor/Check) -->
        <div class="selection-indicator" v-if="isSelected(choice.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="cursor-icon"><path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2L19,11C19.6,11.4 19.6,12.6 19,13L14.93,15.5L17.15,20.29C17.37,20.76 17.17,21.35 16.69,21.57L13.64,21.97Z"/></svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ChoiceCard } from "@/journey/types";

interface Props {
  choices: ChoiceCard[];
  maxSelect?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxSelect: 1,
});

const emit = defineEmits<{
  select: [choiceIds: string[]];
}>();

const selectedIds = ref<string[]>([]);

function isSelected(id: string): boolean {
  return selectedIds.value.includes(id);
}

function getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 is 'A'
}

function selectChoice(id: string) {
  if (props.maxSelect === 1) {
    selectedIds.value = [id];
  } else {
    // Multi-select logic
    if (isSelected(id)) {
      selectedIds.value = selectedIds.value.filter((cid) => cid !== id);
    } else if (selectedIds.value.length < props.maxSelect) {
      selectedIds.value.push(id);
    }
  }
  emit("select", selectedIds.value);
}
</script>

<style scoped>
.choice-cards-container {
  margin-bottom: 28px;
  width: 100%;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.choice-card {
  position: relative;
  padding: 24px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-align: left;
  overflow: hidden;
}

.choice-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
}

/* Selected State - Matches the purple gradient style in Figure 1 */
.choice-card.selected {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(99, 102, 241, 0.15) 100%);
  border: 1px solid #a78bfa; /* Slightly lighter purple border */
  box-shadow: 
    0 0 0 1px rgba(124, 58, 237, 0.4),
    0 4px 20px rgba(124, 58, 237, 0.15);
  color: white;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.choice-letter {
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
}

.choice-card.selected .choice-letter {
    color: #a78bfa;
    opacity: 1;
}

.card-title {
  font-weight: 600;
  font-size: 16px;
  color: rgba(255,255,255,0.9);
}

.choice-card.selected .card-title {
  color: white;
}

.card-description {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  line-height: 1.5;
  padding-left: 28px; /* Indent to align with title text */
}

.choice-card.selected .card-description {
    color: rgba(255,255,255,0.8);
}

.selection-indicator {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #a78bfa;
    filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.6));
    animation: float 2s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(-50%) translateX(0); }
    50% { transform: translateY(-50%) translateX(4px); }
}
</style>
