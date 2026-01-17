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
  margin-bottom: 24px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.choice-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.choice-card:hover {
  background: rgba(107, 140, 255, 0.1);
  border-color: rgba(107, 140, 255, 0.3);
  transform: translateY(-2px);
}

.choice-card.selected {
  background: rgba(107, 140, 255, 0.25);
  border-color: #6b8cff;
  box-shadow: 0 0 12px rgba(107, 140, 255, 0.3);
}

.card-title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
}

.card-description {
  font-size: 12px;
  color: #999;
  line-height: 1.4;
}
</style>
