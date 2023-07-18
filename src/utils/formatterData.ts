/* eslint-disable default-case */
import containerListVue from '@/views/Table/containerList.vue'
import { config } from 'process'
import { Container } from '../interface/index'

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 递归
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}

export const formatContainer = (arr: Container[]): Container[] => {
  const newArr: Container[] = []
  arr.forEach((el: Container) => {
    let newObj = Object.create(null)
    const keys = Object.keys(el)
    newObj = deepMerge(el)

    keys.forEach((key) => {
      if (key === 'size') {
        newObj.size = `${el.size.width}*${el.size.height}*${el.size.deep}`
      } else if (key === 'operationTemperature') {
        newObj.operationTemperature = `${el.operationTemperature.low}~${el.operationTemperature.high}`
      } else if (key === 'pack') {
        newObj.pack.configuration = `${el.pack.configuration.parallel}P${el.pack.configuration.series}S`
      } else if (key === 'rack') {
        newObj.rack.packNum = `${el.pack.configuration.parallel}P${el.rack.packNum * el.pack.configuration.series}S`
      } else if (key === 'rackNum') {
        newObj.rackNum = `${el.rackNum * el.pack.configuration.parallel}P${el.rack.packNum * el.pack.configuration.series}S`
      }
    })
    newArr.push(newObj)
  })
  return newArr
}

export default formatContainer
