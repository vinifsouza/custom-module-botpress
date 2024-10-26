import * as sdk from 'botpress/sdk'
import { SuncoNotification } from './entities/sunco-notification'

function isNotificationPayload(payload: any): payload is SuncoNotification {
  return (
    typeof payload.trigger === 'string' &&
    payload.app && typeof payload.app._id === 'string' &&
    typeof payload.version === 'string' &&
    typeof payload.timestamp === 'number' &&
    payload.destination && typeof payload.destination.type === 'string' &&
    typeof payload.isFinalEvent === 'boolean' &&
    Array.isArray(payload.externalMessages) &&
    payload.externalMessages.every(msg => typeof msg.id === 'string') &&
    payload.notification && typeof payload.notification._id === 'string'
  )
}

export default async (bp: typeof sdk) => {
  const router = bp.http.createRouterForBot('webhook', { checkAuthentication: false })

  router.post('/', async (req, res) => {
    try {
      const body = req.body as SuncoNotification

      if (!isNotificationPayload(body)) {
        res.status(400).send({ error: 'Invalid payload structure' })
      }

      if (body.trigger !== 'notification:delivery:user') {
        return res.status(200).send({ result: 'Ignored', data: body })
      }

      const phone = body.matchResult.client.raw.from
      const userId = body.matchResult.appUser._id
      const conversationId = body.matchResult.conversation._id
      const notificationId = body.notification._id

      const data = {
        phone,
        userId,
        conversationId,
        notificationId,
        createdAt: new Date(body.timestamp).toISOString()
      }

      const existing = await bp.database('snc_notifications').select('*').where('phone', phone).first()

      if (existing) {
        await bp.database('snc_notifications').where('phone', phone).update({
          userId,
          conversationId,
          notificationId,
          createdAt: new Date(body.timestamp * 1000).toISOString()
        })

        return res.send({ result: 'Updated', data }).status(200)
      }

      await bp.database('snc_notifications').insert(data)

      res.send({ result: 'Created', data }).status(201)
    } catch (err) {
      bp.logger.error('Error processing notification', err)
      res.status(500).send({ error: err.message })
    }
  })

  return router
}
