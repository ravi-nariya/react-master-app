/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'development' | 'production'
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENABLE_REACT_PROFILER: 'true' | 'false'
  readonly VITE_ENABLE_OTEL?: 'true' | 'false'
  readonly VITE_OTEL_SERVICE_NAME?: string
  readonly VITE_OTEL_EXPORTER_OTLP_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
