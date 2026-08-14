export type MessageRole = 'user' | 'assistant'

export type ChatActionType =
  | 'quick_reply'
  | 'availability'
  | 'reservation'
  | 'whatsapp'
  | 'scroll'

export interface ChatAction {
  id: string
  label: string
  type: ChatActionType
  payload?: string
}

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  createdAt: string
  actions?: ChatAction[]
}

export interface AgentContext {
  eventType?: string
  date?: string
  guests?: number
  intent?: 'organize' | 'availability' | 'events'
  stage?:
    | 'greeting'
    | 'collecting'
    | 'ready_to_check'
    | 'checked'
    | 'reservation'
}

export interface SendMessageInput {
  messages: ChatMessage[]
  text: string
  action?: ChatAction
  context: AgentContext
}

export interface AgentResponse {
  messages: ChatMessage[]
  context: AgentContext
}

export interface AgentService {
  getGreeting: () => AgentResponse
  send: (input: SendMessageInput) => Promise<AgentResponse>
}
