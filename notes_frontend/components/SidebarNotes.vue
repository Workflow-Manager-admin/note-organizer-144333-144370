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
  border-right: 1px solid var(--border-color);
  height: calc(100vh - var(--topbar-height));
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
  min-width: 155px;
  max-width: 99vw;
  box-sizing: border-box;
  transition: width 0.20s;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1.1rem 1.15rem 0.7rem 1.16rem;
  gap: 0.7rem;
  border-bottom: 1px solid #f1eee3;
  background: #f9fafb;
}

.sidebar-title {
  font-weight: 550;
  font-size: 1.12rem;
  letter-spacing: 0.8px;
  color: var(--color-secondary);
}

.accent-btn {
  background: var(--color-accent);
  border: none;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  width: 34px;
  height: 32px;
  border-radius: 7px;
  cursor: pointer;
  transition: background 0.15s, transform 0.14s;
  margin-right: 0.32rem;
  box-shadow: 0 1.5px 4px 0 rgba(255,168,0,.11);
}
.accent-btn:hover,
.accent-btn:focus {
  background: #fb8c00;
  transform: scale(1.06);
}
.accent-btn:active {
  background: #fdad32;
  transform: scale(0.98);
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
  padding: 0.63rem 1.13rem 0.59rem 1.19rem;
  background: none;
  display: flex;
  flex-direction: column;
  gap: 0.09rem;
  border-left: 4px solid transparent;
  transition: background 0.09s, border-color 0.12s;
  position: relative;
  user-select: none;
  border-radius: 0 6px 6px 0;
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
  font-size: 1.02rem;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 122px;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.delete-btn {
  background: none;
  border: none;
  color: #da2b2b;
  font-size: 1rem;
  margin-left: 0.55rem;
  cursor: pointer;
  outline: none;
  opacity: 0.46;
  border-radius: 4px;
  padding: 0.13rem 0.38rem 0.13rem 0.25rem;
  transition: opacity 0.12s, background 0.14s, color 0.14s;
}
.delete-btn:hover, .delete-btn:focus {
  opacity: 0.93;
  color: #b71c1c;
  background: #ffe7e7;
}

.note-updated {
  font-size: 0.82rem;
  color: #bbbbbb;
  margin-top: 2px;
  letter-spacing: 0.01em;
}

@media (max-width: 900px) {
  .sidebar {
    width: 100vw;
    border-right: none;
    border-bottom: 1.5px solid #e2e9ef;
    min-width: 0;
    background: #fff;
    padding-top: 0;
    height: auto;
    max-height: 36vw;
    border-radius: var(--border-radius);
    box-shadow: 0 1.5px 5px 0 rgba(66,66,66,.03);
  }
}

@media (max-width: 640px) {
  .sidebar {
    width: 100vw;
    border-radius: 0;
    max-width: 100vw;
    max-height: 170px;
    min-width: 0;
    border-bottom: 1px solid #edeaea;
    box-shadow: none;
  }
  .sidebar-header {
      padding-left: 0.7rem;
      padding-right: 0.7rem;
  }
  .note-title { max-width: 70vw; }
}
</style>
