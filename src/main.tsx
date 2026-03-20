import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { initTelemetry } from './telemetry'
import './index.css'
import './i18n'
import App from './App.tsx'
import { appConfig } from './config/appConfig'
import { persistor, store } from './store'

initTelemetry()

const isProfilerEnabled = import.meta.env.DEV || appConfig.features.enableReactProfiler

const onRenderProfiler: React.ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime,
) => {
  console.log('[React Profiler]', {
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  })
}

const app = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isProfilerEnabled ? (
      <Profiler id="AppRoot" onRender={onRenderProfiler}>
        {app}
      </Profiler>
    ) : (
      app
    )}
  </StrictMode>,
)
