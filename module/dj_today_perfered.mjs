// 电台今日优选

export default (query, request) => {
  const data = {
    page: query.page || 0,
  }
  return request(
    'POST',
    `https://music.163.com/weapi/djradio/home/today/perfered`,
    data,
    {
      crypto: 'weapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
    },
  )
}
