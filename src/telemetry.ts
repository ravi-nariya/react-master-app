import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'
import { resourceFromAttributes } from '@opentelemetry/resources'
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  type SpanExporter,
} from '@opentelemetry/sdk-trace-base'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'

const RESOURCE_SERVICE_NAME = 'service.name'
const RESOURCE_DEPLOYMENT_ENVIRONMENT = 'deployment.environment.name'

let isInitialized = false

export function initTelemetry(): void {
  void initTelemetryAsync()
}

async function initTelemetryAsync(): Promise<void> {
  if (isInitialized) {
    return
  }

  if (import.meta.env.VITE_ENABLE_OTEL !== 'true') {
    return
  }

  const serviceName = import.meta.env.VITE_OTEL_SERVICE_NAME || 'master-react-ui'
  const endpoint = import.meta.env.VITE_OTEL_EXPORTER_OTLP_ENDPOINT?.trim()

  let exporter: SpanExporter = new ConsoleSpanExporter()
  if (endpoint) {
    try {
      const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http')
      exporter = new OTLPTraceExporter({
        url: endpoint,
      })
    } catch (error) {
      console.warn('[Telemetry] OTLP exporter unavailable, falling back to console exporter.', error)
    }
  }

  const provider = new WebTracerProvider({
    resource: resourceFromAttributes({
      [RESOURCE_SERVICE_NAME]: serviceName,
      [RESOURCE_DEPLOYMENT_ENVIRONMENT]: import.meta.env.VITE_APP_ENV,
    }),
    spanProcessors: [new BatchSpanProcessor(exporter)],
  })

  provider.register()

  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [/.*/],
      }),
      new XMLHttpRequestInstrumentation({
        propagateTraceHeaderCorsUrls: [/.*/],
      }),
    ],
  })

  isInitialized = true
}
