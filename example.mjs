#!/usr/bin/env node
import NeteaseCloudMusicApi from './main.mjs'

/**
 * 简单的API使用示例
 */
async function example() {
  try {
    // 示例1: 搜索歌曲
    const searchResult = await NeteaseCloudMusicApi.search({
      keywords: '海阔天空',
      limit: 3,
      type: 1  // 1: 单曲
    })
    console.log('搜索结果:', JSON.stringify(searchResult.body, null, 2))
    
    // 示例2: 获取歌曲URL
    if (searchResult.body.result?.songs?.length > 0) {
      const songId = searchResult.body.result.songs[0].id
      const songUrl = await NeteaseCloudMusicApi.song_url({
        id: songId
      })
      console.log('歌曲URL:', JSON.stringify(songUrl.body, null, 2))
    }
    
    // 示例3: 获取热门歌单
    const playlists = await NeteaseCloudMusicApi.top_playlist({
      limit: 3,
      order: 'hot'
    })
    console.log('热门歌单:', JSON.stringify(playlists.body, null, 2))
    
  } catch (error) {
    console.error('发生错误:', error)
  }
}

console.log('开始运行API示例...')
example() 
