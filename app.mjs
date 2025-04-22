#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import NeteaseCloudMusicApi from './main.mjs'

async function start() {
  try {
    // 检测环境
    const isDeno = typeof Deno !== 'undefined';
    
    // 只在Node.js环境下访问文件系统
    if (!isDeno) {
      const tmpPath = os.tmpdir();
      // 检测是否存在 anonymous_token 文件,没有则生成
      if (!fs.existsSync(path.resolve(tmpPath, 'anonymous_token'))) {
        fs.writeFileSync(path.resolve(tmpPath, 'anonymous_token'), '', 'utf-8')
      }
    }
    
    // 启动时更新anonymous_token
    const { default: generateConfig } = await import('./generateConfig.mjs')
    await generateConfig()
    
    // 使用main.mjs中导出的serveNcmApi函数
    NeteaseCloudMusicApi.serveNcmApi({
      checkVersion: true,
    })
  } catch (error) {
    console.error('启动失败:', error);
  }
}
start()
