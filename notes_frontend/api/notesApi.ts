import type { Note } from '../types/note'

/**
 * The API_BASE_URL should be set using an environment variable, e.g. NUXT_PUBLIC_API_BASE_URL.
 */
const API_BASE_URL =
  process.env.NUXT_PUBLIC_API_BASE_URL ||
  (import.meta as any).env?.NUXT_PUBLIC_API_BASE_URL ||
  ''

/**
 * PUBLIC_INTERFACE
 * Fetch list of notes (replace with real fetch when backend available)
 */
export async function fetchNotes(): Promise<Note[]> {
  // TODO: Uncomment and implement for real API:
  // const resp = await fetch(`${API_BASE_URL}/notes`)
  // return await resp.json()
  return [
    {
      id: '1',
      title: 'Welcome Note',
      content: 'This is your first note.',
      updatedAt: new Date().toISOString(),
    }
  ]
}

/**
 * PUBLIC_INTERFACE
 * Create a note (stub for integration)
 */
export async function createNoteApi(note: Omit<Note, 'id'|'updatedAt'>): Promise<Note> {
  // TODO: POST to `${API_BASE_URL}/notes`
  return {
    ...note,
    id: Date.now().toString(),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * PUBLIC_INTERFACE
 * Update a note (stub for integration)
 */
export async function updateNoteApi(note: Note): Promise<Note> {
  // TODO: PUT to `${API_BASE_URL}/notes/${note.id}`
  return {
    ...note,
    updatedAt: new Date().toISOString(),
  }
}

/**
 * PUBLIC_INTERFACE
 * Delete a note (stub for integration)
 */
export async function deleteNoteApi(id: string): Promise<void> {
  // TODO: DELETE to `${API_BASE_URL}/notes/${id}`
  return
}
