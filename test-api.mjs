#!/usr/bin/env node
import NeteaseCloudMusicApi from './main.mjs'

async function testApi() {
  console.log('测试API接口是否正常工作...')
  
  try {
    // 测试搜索接口
    const result = await NeteaseCloudMusicApi.search({
      keywords: '周杰伦',
      limit: 5,
      type: 1
    })
    
    console.log('搜索接口测试结果：', result.status)
    console.log('搜索结果数量：', result.body.result?.songs?.length || 0)
    
    // 测试获取歌单详情接口
    const playlist = await NeteaseCloudMusicApi.playlist_detail({
      id: '19723756'
    })
    
    console.log('歌单接口测试结果：', playlist.status)
    console.log('歌单名称：', playlist.body.playlist?.name)
    
    console.log('API测试完成，接口工作正常！')
  } catch (error) {
    console.error('API测试失败:', error)
  }
}

testApi() 
