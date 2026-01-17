<template>
  <div class="choice-cards-container">
    <div class="cards-grid">
      <button
        v-for="choice in choices"
        :key="choice.id"
        class="choice-card"
        :class="{ selected: isSelected(choice.id) }"
        @click="selectChoice(choice.id)"
      >
        <div class="card-title">{{ choice.title }}</div>
        <div v-if="choice.description" class="card-description">
          {{ choice.description }}
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

function selectChoice(id: string) {
  if (props.maxSelect === 1) {
    selectedIds.value = [id];
  } else {
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
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
}

.choice-card {
  padding: 18px 16px;
  background: rgba(124, 58, 237, 0.08);
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.35s ease;
  text-align: left;
}

.choice-card:hover {
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(129, 140, 248, 0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(124, 58, 237, 0.15);
}

.choice-card.selected {
  background: rgba(124, 58, 237, 0.18);
  border-color: var(--indigo-light);
  box-shadow:
    0 0 15px rgba(129, 140, 248, 0.35),
    0 0 30px rgba(124, 58, 237, 0.15);
}

.card-title {
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
  color: var(--text-primary);
}

.choice-card.selected .card-title {
  color: var(--indigo-light);
}

.card-description {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>
