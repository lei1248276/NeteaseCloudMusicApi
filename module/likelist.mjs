// 喜欢的歌曲(无序)

export default (query, request) => {
  const data = {
    uid: query.uid,
  }
  return request('POST', `https://music.163.com/weapi/song/like/get`, data, {
    crypto: 'weapi',
    cookie: query.cookie,
    proxy: query.proxy,
    realIP: query.realIP,
  })
}
