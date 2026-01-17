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
  margin-bottom: 24px;
}

.comment-input {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e0e0e0;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 60px;
  transition: all 0.2s;
}

.comment-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(107, 140, 255, 0.3);
  box-shadow: 0 0 8px rgba(107, 140, 255, 0.1);
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: #999;
}

.char-count {
  font-size: 12px;
}

.hint-text {
  color: rgba(107, 140, 255, 0.6);
  font-size: 12px;
}
</style>
