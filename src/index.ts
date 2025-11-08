import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { createUnplugin } from 'unplugin'
import { betterLog } from './better-log'

export const unpluginFactory: UnpluginFactory<Options | undefined> = options => (

  {
    name: 'unplugin-starter',
    transform: {
      filter: {
        id: {
          exclude: options?.exclude,
          include: options?.include,
        },
      },
      handler(_code, id) {
        betterLog(id)
      },
    },
  }
)

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
