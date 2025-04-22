#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import os from 'os'
import NeteaseCloudMusicApi from './main.mjs'

const tmpPath = os.tmpdir()

async function start() {
  // 检测是否存在 anonymous_token 文件,没有则生成
  if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
    fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
  }
  // 启动时更新anonymous_token
  const { default: generateConfig } = await import('./generateConfig.mjs')
  await generateConfig()
  
  // 使用main.mjs中导出的serveNcmApi函数
  NeteaseCloudMusicApi.serveNcmApi({
    checkVersion: true,
  })
}
start()
