<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <button
        class="accent-btn"
        title="Create Note"
        @click="$emit('create')"
        aria-label="Create Note"
      >+</button>
      <span class="sidebar-title">Notes</span>
    </div>
    <ul class="note-list">
      <li
        v-for="note in notes"
        :key="note.id"
        :class="{ selected: note.id === selectedId }"
        @click="$emit('select', note.id)"
        tabindex="0"
      >
        <div class="note-entry">
          <span class="note-title">{{ note.title || 'Untitled' }}</span>
          <button
            class="delete-btn"
            title="Delete"
            @click.stop="$emit('delete', note.id)"
            aria-label="Delete Note"
          >
            🗑️
          </button>
        </div>
        <span class="note-updated" v-if="note.updatedAt">{{ recent(note.updatedAt) }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import type { Note } from '../types/note'
defineProps<{
  notes: Note[]
  selectedId: string | null
}>()
defineEmits<{
  (e: 'select', id: string): void
  (e: 'create'): void
  (e: 'delete', id: string): void
}>()

/**
 * Format date string to "time ago" for recency
 */
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
.sidebar {
  width: var(--sidebar-width);
  background: #fff;
  border-right: 1px solid #e0e0e0;
  height: calc(100vh - var(--topbar-height));
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
  min-width: 170px;
}
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 0.9rem 1rem 0.7rem 1rem;
  gap: 0.5rem;
  border-bottom: 1px solid #eee;
}
.sidebar-title {
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: var(--color-secondary);
}

.accent-btn {
  background: var(--color-accent);
  border: none;
  color: #fff;
  font-size: 1.25rem;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
  margin-right: 0.2rem;
}
.accent-btn:hover {
  background: #fb8c00;
}

.note-list {
  padding: 0;
  margin: 0;
  list-style: none;
  flex: 1 1 auto;
  overflow-y: auto;
}

.note-list li {
  cursor: pointer;
  padding: 0.7rem 1.1rem 0.7rem 1.2rem;
  background: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-left: 4px solid transparent;
  transition: background 0.08s, border-color 0.12s;
  position: relative;
}
.note-list li.selected {
  background: #f3f6fa;
  border-left: 4px solid var(--color-primary);
}
.note-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.note-title {
  font-weight: 500;
  color: var(--color-primary);
  font-size: 1.01rem;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
  white-space: nowrap;
}
.delete-btn {
  background: none;
  border: none;
  color: #da2b2b;
  font-size: 1rem;
  margin-left: 0.65rem;
  cursor: pointer;
  outline: none;
  opacity: 0.55;
  transition: opacity 0.13s;
}
.delete-btn:hover {
  opacity: 0.95;
  color: #b71c1c;
}
.note-updated {
  font-size: 0.8rem;
  color: #aaaaaa;
  margin-top: 2px;
}
</style>
