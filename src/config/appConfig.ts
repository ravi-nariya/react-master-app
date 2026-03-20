type AppEnv = 'development' | 'production' | 'test'

function getRequiredEnv(value: string | boolean | undefined, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`[Config] Missing required environment variable: ${name}`)
  }

  return value
}

function toBoolean(value: string | undefined, fallback = false): boolean {
  if (typeof value !== 'string') {
    return fallback
  }

  const normalized = value.trim().toLowerCase()

  if (normalized === 'true') {
    return true
  }

  if (normalized === 'false') {
    return false
  }

  return fallback
}

const appEnv = getRequiredEnv(import.meta.env.VITE_APP_ENV, 'VITE_APP_ENV') as AppEnv
const apiBaseUrl = getRequiredEnv(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL')

export const appConfig = Object.freeze({
  appEnv,
  apiBaseUrl,
  isDev: appEnv === 'development',
  isProd: appEnv === 'production',
  features: Object.freeze({
    enableReactProfiler: toBoolean(import.meta.env.VITE_ENABLE_REACT_PROFILER, false),
  }),
})

export type AppConfig = typeof appConfig
