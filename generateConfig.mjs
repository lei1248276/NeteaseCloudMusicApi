import fs from 'fs'
import path from 'path'
import os from 'os'
import { register_anonimous } from './main.mjs'
import { cookieToJson } from './util/index.mjs'

const tmpPath = os.tmpdir()

async function generateConfig() {
  try {
    const res = await register_anonimous()
    const cookie = res.body.cookie
    if (cookie) {
      const cookieObj = cookieToJson(cookie)
      fs.writeFileSync(
        path.resolve(tmpPath, 'anonymous_token'),
        cookieObj.MUSIC_A,
        'utf-8',
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export default generateConfig
