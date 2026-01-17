<template>
  <div class="comment-box-container">
    <textarea
      v-model="comment"
      :maxlength="maxChars"
      :placeholder="placeholder"
      class="comment-input"
      @input="onInput"
    ></textarea>
    <div class="comment-footer">
      <span class="char-count">{{ comment.length }}/{{ maxChars }}</span>
      <span class="hint-text">（可选）</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  maxChars?: number;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxChars: 80,
  placeholder: "分享你的想法...",
});

const emit = defineEmits<{
  update: [comment: string];
}>();

const comment = ref("");

function onInput() {
  emit("update", comment.value);
}

// 暴露方法供父组件清空内容
defineExpose({
  clear: () => {
    comment.value = "";
  },
});
</script>

<style scoped>
.comment-box-container {
  margin-bottom: 26px;
}

.comment-input {
  width: 100%;
  padding: 14px 16px;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 12px;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 15px;
  resize: vertical;
  min-height: 70px;
  transition: all 0.3s ease;
}

.comment-input::placeholder {
  color: var(--text-secondary);
  opacity: 0.7;
}

.comment-input:focus {
  outline: none;
  background: rgba(124, 58, 237, 0.1);
  border-color: rgba(129, 140, 248, 0.45);
  box-shadow:
    0 0 15px rgba(124, 58, 237, 0.15),
    0 0 30px rgba(99, 102, 241, 0.1);
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: var(--text-secondary);
}

.char-count {
  font-size: 12px;
}

.hint-text {
  color: var(--indigo-light);
  font-size: 12px;
  opacity: 0.8;
}
</style>
