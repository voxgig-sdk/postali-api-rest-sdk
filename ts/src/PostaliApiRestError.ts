
import { Context } from './Context'


class PostaliApiRestError extends Error {

  isPostaliApiRestError = true

  sdk = 'PostaliApiRest'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PostaliApiRestError
}

