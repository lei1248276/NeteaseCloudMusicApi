// 歌手介绍

export default (query, request) => {
  const data = {
    id: query.id,
  }
  return request(
    'POST',
    `https://music.163.com/weapi/artist/introduction`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
