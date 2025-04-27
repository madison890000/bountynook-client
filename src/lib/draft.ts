export const DRAFT_KEY = 'bountynook_draft_task'

export function saveDraft(data: any) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
}

export function loadDraft() {
  const data = localStorage.getItem(DRAFT_KEY)
  return data ? JSON.parse(data) : null
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY)
}
