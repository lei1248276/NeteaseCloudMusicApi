// 类别热门电台

export default (query, request) => {
  const data = {}
  return request('POST', `https://music.163.com/weapi/user/level`, data, {
    crypto: 'weapi',
    cookie: query.cookie,
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
