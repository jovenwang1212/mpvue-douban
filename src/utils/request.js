export default function request (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      data: options.data || {},
      method: options.method | 'GET',
      dataType: 'json',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: res => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
