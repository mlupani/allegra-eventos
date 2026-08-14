import { mockAgent } from '@/lib/agent/mock-agent'
import type { AgentService } from '@/lib/agent/types'

/**
 * Punto único de intercambio para el agente.
 * Reemplazá `mockAgent` por la implementación real (API / RAG)
 * sin reescribir la UI del chat.
 */
export function createAgentService (): AgentService {
  return mockAgent
}
