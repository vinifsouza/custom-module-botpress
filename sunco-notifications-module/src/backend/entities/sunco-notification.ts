/* eslint-disable @typescript-eslint/array-type */
export interface SuncoNotification {
  trigger: string
  app: {
    _id: string
  }
  version: string
  timestamp: number
  destination: {
    type: string
    integrationId: string
    destinationId: string
  }
  isFinalEvent: boolean
  externalMessages: Array<{
    id: string
  }>
  notification: {
    _id: string
  }
  matchResult: {
    client: {
      integrationId: string
      externalId: string
      id: string
      displayName: string
      status: string
      raw: {
        profile: {
          name: string
        }
        from: string
      }
      lastSeen: string
      linkedAt: string
      _id: string
      platform: string
      active: boolean
      blocked: boolean
      primary: boolean
    }
    appUser: {
      _id: string
      conversationStarted: boolean
    }
    conversation: {
      _id: string
      brandId: string
      activeSwitchboardIntegration: {
        _id: string
        name: string
        integrationId: string
        integrationType: string
      }
    }
  }
}
