// 初始化名字

const activateInitProfile = (query, request) => {
  const data = {
    nickname: query.nickname,
  }
  return request(
    'POST',
    `https://music.163.com/eapi/activate/initProfile`,
    data,
    {
      crypto: 'eapi',
      cookie: query.cookie,
      proxy: query.proxy,
      realIP: query.realIP,
      url: '/api/activate/initProfile',
    },
  )
}

export default activateInitProfile
