import request from '@/utils/request'

const containerApi = {
  getContainerList: 'api/data/container/getContainerList',
  getContainerColumn: 'api/data/container/getContainerColumn'
}

class Service {
  /**
   * @description POST 获取集装箱列表信息
   */
  static getContainerList(page: number, size: number) {
    return request({
      url: containerApi.getContainerList,
      method: 'POST',
      json: true,
      data: {
        page,
        size
      }
    }).then((res) => {
      if (res.status === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }

  /**
   * @description POST 获取集装箱表头信息
   */
  static getContainerColumn(page: number, size: number) {
    return request({
      url: containerApi.getContainerList,
      method: 'POST',
      json: true,
      data: {
        page,
        size
      }
    }).then((res) => {
      if (res.status === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }
}
