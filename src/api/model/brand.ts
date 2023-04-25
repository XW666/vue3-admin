import request from '@/utils/request'
// 渠道管理列表
export default {
  channelList(data) {
    return request({
      url: '/channel/list',
      method: 'get',
      params: data
    })
  }
}