<template>
  <div class="app-root">
    <TopNavBar />
    <div class="main-layout">
      <SidebarNotes
        :notes="notes"
        :selectedId="selectedNoteId"
        @select="selectNote"
        @create="createNote"
        @delete="deleteNote"
      />
      <main class="main-area">
        <NoteEditor
          v-if="selectedNote"
          :note="selectedNote"
          @update="updateNote"
        />
        <div v-else class="empty-state">
          <span>Select or create a note from the sidebar.</span>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TopNavBar from './components/TopNavBar.vue'
import SidebarNotes from './components/SidebarNotes.vue'
import NoteEditor from './components/NoteEditor.vue'
import type { Note } from './types/note'

// Placeholder notes - replace with API integration as needed
const initialNotes: Note[] = [
  { id: '1', title: 'Welcome Note', content: 'This is your first note.', updatedAt: new Date().toISOString() }
]

const notes = ref<Note[]>(initialNotes)
const selectedNoteId = ref<string | null>(notes.value[0]?.id || null)

const selectedNote = computed(() =>
  notes.value.find(n => n.id === selectedNoteId.value) || null
)

function selectNote(id: string) {
  selectedNoteId.value = id
}

function createNote() {
  const id = Date.now().toString()
  const note: Note = {
    id,
    title: 'Untitled',
    content: '',
    updatedAt: new Date().toISOString()
  }
  notes.value.unshift(note)
  selectedNoteId.value = id
}

/**
 * Update note content/title by id
 * @param updatedNote Note object with new values
 */
function updateNote(updatedNote: Note) {
  const idx = notes.value.findIndex(n => n.id === updatedNote.id)
  if (idx > -1) {
    notes.value[idx] = { ...updatedNote, updatedAt: new Date().toISOString() }
  }
}

/**
 * Remove note by id
 * @param id Note ID to delete
 */
function deleteNote(id: string) {
  const idx = notes.value.findIndex(n => n.id === id)
  if (idx > -1) {
    notes.value.splice(idx, 1)
    if (selectedNoteId.value === id) {
      selectedNoteId.value = notes.value[0]?.id || null
    }
  }
}
</script>

<style scoped>
:root {
  --color-primary: #1976d2;
  --color-secondary: #424242;
  --color-accent: #ff9800;
  --sidebar-width: 260px;
  --topbar-height: 50px;
  --bg-main: #fafbfc;
}

.app-root {
  min-height: 100vh;
  background: var(--bg-main);
  display: flex;
  flex-direction: column;
}

.main-layout {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
}

.main-area {
  flex: 1 1 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: #fff;
}

.empty-state {
  padding: 2rem;
  color: var(--color-secondary);
  text-align: center;
  font-size: 1.15rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
