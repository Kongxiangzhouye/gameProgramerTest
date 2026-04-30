import { clientQuestions } from './client.js'
import { serverQuestions } from './server.js'
import { designQuestions } from './design.js'
import { operationQuestions } from './operation.js'
import { artQuestions } from './art.js'
import { qaQuestions } from './qa.js'

export const questionBanks = {
  client: clientQuestions,
  server: serverQuestions,
  design: designQuestions,
  operation: operationQuestions,
  art: artQuestions,
  qa: qaQuestions,
}
