import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { cookieToJson } from './util/index.mjs'
import { serveNcmApi, getModulesDefinitions } from './server.mjs'
import { fileURLToPath } from 'node:url'

// 使用fs读取package.json内容
import packageJSON from './package.json' assert { type: 'json' }

// 导出匿名token变量，供其他模块使用
export const anonymousToken = '';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 移除临时文件操作，避免Deno环境中的文件系统访问错误
// const tmpPath = os.tmpdir()
// if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
//   fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
// }

let firstRun = true
/** @type {Record<string, any>} */
let obj = {}

const moduleFiles = fs.readdirSync(path.join(__dirname, 'module'))
  .reverse()
  .filter(file => file.endsWith('.mjs'))

for (const file of moduleFiles) {
  const fn = file.split('.').shift() || ''
  obj[fn] = async function (data = {}) {
    if (typeof data.cookie === 'string') {
      data.cookie = cookieToJson(data.cookie)
    }
    
    // 动态导入模块
    const fileModule = await import(path.join(__dirname, 'module', file))
    
    return fileModule.default(
      {
        ...data,
        cookie: data.cookie ? data.cookie : {},
      },
      async (...args) => {
        if (firstRun) {
          firstRun = false
          const { default: generateConfig } = await import('./generateConfig.mjs')
          await generateConfig()
        }
        const { default: request } = await import('./util/request.mjs')
        return request(...args)
      },
    )
  }
}

// 导出register_anonimous函数
export const register_anonimous = obj.register_anonimous

/**
 * @type {Record<string, any> & import("./server")}
 */
// 导出所有API函数和服务器函数
export default {
  serveNcmApi,
  getModulesDefinitions,
  ...obj,
}
