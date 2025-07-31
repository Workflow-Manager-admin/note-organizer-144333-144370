<template>
  <section class="note-editor">
    <input
      class="title-input"
      v-model="localNote.title"
      @input="emitUpdate"
      maxlength="80"
      placeholder="Title"
      aria-label="Note Title"
    />
    <textarea
      class="content-input"
      v-model="localNote.content"
      @input="emitUpdate"
      placeholder="Start typing your note..."
      aria-label="Note Content"
      spellcheck="true"
    />
    <span class="edited-at" v-if="localNote.updatedAt">Edited: {{ recent(localNote.updatedAt) }}</span>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Note } from '../types/note'

const props = defineProps<{ note: Note }>()
const emit = defineEmits<{ (e: 'update', note: Note): void }>()

/**
 * Keep a local copy to provide editing before emit
 */
const localNote = ref<Note>({ ...props.note })

watch(
  () => props.note,
  (newNote) => {
    localNote.value = { ...newNote }
  }
)

/**
 * Emit updated note up immediately on any change
 */
function emitUpdate() {
  emit('update', { ...localNote.value })
}

function recent(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = (now.getTime() - date.getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`
  return date.toLocaleDateString()
}
</script>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 1.5rem 2rem;
  height: 100%;
  background: #fff;
  min-height: 0;
  min-width: 0;
}
.title-input {
  font-size: 1.55rem;
  font-weight: 600;
  border: none;
  background: none;
  color: var(--color-primary);
  margin-bottom: 1.15rem;
  outline: none;
  width: 100%;
  padding: 0;
  font-family: inherit;
}
.title-input:focus {
  border-bottom: 2px solid var(--color-accent);
  background: #fffbe8;
}
.content-input {
  border: none;
  font-size: 1.1rem;
  color: var(--color-secondary);
  background: #f6f7fa;
  min-height: 40vh;
  flex: 1 1 auto;
  resize: vertical;
  padding: 1rem 1rem 1rem 0.5rem;
  font-family: inherit;
  border-radius: 4px;
  outline: none;
  margin-bottom: 0.8rem;
}
.content-input:focus {
  background: #fffbe8;
}
.edited-at {
  color: #bbb;
  font-size: 0.93rem;
  margin-top: 4px;
}
</style>
