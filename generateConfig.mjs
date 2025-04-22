import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { register_anonimous, anonymousToken } from './main.mjs'
import { cookieToJson } from './util/index.mjs'

// 用于在内存中更新token的函数
function updateToken(token) {
  if (typeof anonymousToken !== 'undefined' && token) {
    // 尝试更新main.mjs中导出的token变量（如果它是可变的）
    try {
      // 这里不直接修改anonymousToken，因为JS中的const导出是不可变的
      // 相反，我们存储在全局变量中，供request.mjs使用
      globalThis._ANONYMOUS_TOKEN = token;
      console.log('Token已更新到内存');
    } catch (e) {
      console.warn('无法更新token:', e);
    }
  }
}

async function generateConfig() {
  try {
    const res = await register_anonimous()
    const cookie = res.body.cookie
    if (cookie) {
      const cookieObj = cookieToJson(cookie)
      const token = cookieObj.MUSIC_A;
      
      // 检测环境
      const isDeno = typeof Deno !== 'undefined';
      
      // 在Deno环境中只更新内存中的token
      if (isDeno) {
        updateToken(token);
      } 
      // 在Node环境中同时更新文件和内存
      else {
        const tmpPath = os.tmpdir();
        fs.writeFileSync(
          path.resolve(tmpPath, 'anonymous_token'),
          token,
          'utf-8',
        );
        updateToken(token);
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default generateConfig
