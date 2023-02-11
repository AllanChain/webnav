import { type Bookmark } from '@/store/bookmark'
import { defineStore } from 'pinia'

export interface DatalessMode {
  mode: 'normal' | 'import-dialog' | 'config-dialog' | 'edit'
  data: null
}
export interface ReorderMode {
  mode: 'reorder-dialog'
  data: number // index
}
export interface EditMode {
  mode: 'edit-dialog'
  data: Bookmark
}
export type ModeState = DatalessMode | ReorderMode | EditMode
export type ModeName =
  'normal' | 'import-dialog' | 'config-dialog' | 'edit' |
  'reorder-dialog' | 'edit-dialog'
export const useModeStore = defineStore('mode', {
  state: (): ModeState => ({
    mode: 'normal',
    data: null
  }),
  actions: {
    update (payload: ModeState | ModeName) {
      if (typeof payload === 'string') {
        this.mode = payload
        this.data = null
      } else {
        this.mode = payload.mode
        this.data = payload.data
      }
    }
  }
})
