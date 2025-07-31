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
  padding: 2.2rem 1.9rem 1.45rem 2.2rem;
  height: 100%;
  background: #fff;
  min-height: 0;
  min-width: 0;
}

.title-input {
  font-size: 1.46rem;
  font-weight: 600;
  border: none;
  background: none;
  color: var(--color-primary);
  margin-bottom: 1.03rem;
  outline: none;
  width: 100%;
  padding: 0.1rem 0.25rem;
  font-family: inherit;
  border-bottom: 2.5px solid transparent;
  transition: border-bottom 0.18s, background 0.14s;
}
.title-input:focus {
  border-bottom: 2px solid var(--color-accent);
  background: #fffbe8;
}

.content-input {
  border: 1px solid var(--border-color);
  font-size: 1.1rem;
  color: var(--color-secondary);
  background: var(--input-bg);
  min-height: 40vh;
  flex: 1 1 auto;
  resize: vertical;
  padding: 1.1rem 1rem 1rem 0.7rem;
  font-family: inherit;
  border-radius: var(--border-radius);
  outline: none;
  margin-bottom: 0.8rem;
  line-height: 1.51;
  box-shadow: 0 1.5px 5px 0 rgba(25,118,210,0.025);
  transition: background 0.14s, border 0.14s;
}
.content-input:focus {
  background: #fffbe8;
  border-color: var(--color-accent);
}

.edited-at {
  color: #bbb;
  font-size: 0.89rem;
  margin-top: 6px;
  font-style: italic;
  letter-spacing: 0.02em;
}

@media (max-width: 900px) {
  .note-editor {
    padding: 1.2rem 0.7rem 1rem 1.1rem;
  }
}
@media (max-width: 640px) {
  .note-editor {
    padding: 0.65rem 0.4rem 0.1rem 0.5rem;
  }
  .title-input {
    font-size: 1.23rem;
    margin-bottom: 0.65rem;
  }
}
</style>
