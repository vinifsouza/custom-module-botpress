import * as sdk from 'botpress/sdk'

import api from './api'

// This is called when server is started, usually to set up the database
const onServerStarted = async (bp: typeof sdk) => {
  return bp.database.schema.hasTable('users').then(function (exists) {
    const tableName = 'snc_notifications'
    if (!exists) {
      return bp.database.schema
        .createTable(tableName, function (table) {
          table.string('phone', 20).primary()
          table.string('userId', 24)
          table.string('conversationId', 24)
          table.string('notificationId', 36)
          table.timestamp('createdAt').defaultTo(bp.database.fn.now())
        })
        .then(() => {
          bp.logger.info(`Table ${tableName} created`)
        }).catch((err: any) => {
          bp.logger.error(`Error creating table ${tableName}`, err)
        })
    }
  })
}

// At this point, you would likely setup the API route of your module.
const onServerReady = async (bp: typeof sdk) => {
  const _api = await api(bp)
  const publicPath = await _api.getPublicPath()
  bp.logger.info('Sunco Notifications Module is ready!', publicPath)
}

// Every time a bot is created (or enabled), this method will be called with the bot id
const onBotMount = async (bp: typeof sdk, botId: string) => { }

// This is called every time a bot is deleted (or disabled)
const onBotUnmount = async (bp: typeof sdk, botId: string) => { }

// When anything is changed using the flow editor, this is called with the new flow, so you can rename nodes if you reference them
const onFlowChanged = async (bp: typeof sdk, botId: string, flow: sdk.Flow) => { }

/**
 * This is where you would include your 'demo-bot' definitions.
 * You can copy the content of any existing bot and mark them as "templates", so you can create multiple bots from the same template.
 */
const botTemplates: sdk.BotTemplate[] = []

/**
 * Skills allows you to create custom logic and use them easily on the flow editor
 * Check this link for more information: https://botpress.com/docs/building-chatbots/developers/custom-modules#skills
 */
const skills: sdk.Skill[] = []

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  onBotMount,
  onBotUnmount,
  onFlowChanged,
  botTemplates,
  skills,
  definition: {
    // This must match the name of your module's folder, and the name in package.json
    name: 'sunco-notifications-module',
    /**
     * By default we are using the https://blueprintjs.com/docs/#icons. Use the corresponding name
     * Otherwise, create an icon in the assets module in the following format studio_${module.menuIcon}
     */
    menuIcon: 'flag',
    // This is the name of your module which will be displayed in the sidebar
    menuText: 'Sunco Notifications',
    // When set to `true`, the name and icon of your module won't be displayed in the sidebar
    noInterface: true,
    // The full name is used in other places, for example when displaying bot templates
    fullName: 'Sunco Notifications',
    // Not used anywhere, but should be a link to your website or module repository
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
