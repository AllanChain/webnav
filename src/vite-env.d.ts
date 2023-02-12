/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FAVIEW_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
