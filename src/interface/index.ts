export interface Cell {
  img: string[]
  name: string
  capacity: number
  voltage: number
  rate: number
  // eslint-disable-next-line camelcase
  capacity_density: number
  cycle: number
  old: number
  temperature: {
    low: number
    high: number
  }
  weight: number
  tag: string
  size: number[]
  certification: string[]
}

export interface Pack {
  configuration: {
    parallel: number
    series: number
  }
  ipLevel: number
}

export interface Rack {
  packNum: number
  // 0：风冷，1：液冷
  coolingConcept: number
}

export interface Container {
  img: string[]
  name: string
  type: string
  // 0：国内版，1，国际版，2：欧版，3：美版，4：澳版
  vision: number
  cell: Cell
  pack: Pack
  rack: Rack
  rackNum: number
  normalCapacity: number
  size: {
    width: number
    height: number
    deep: number
  }
  weigth: number
  ipLevel: number
  corrosionProofLevel: number
  operationTemperature: {
    low: number
    high: number
  }
  altitude: number
  cycle: number
  fireproof: number
  lifetime: number
  // 0：DC侧，1：DC+AC侧
  isDC: number
  price: number
  deliveryCycle: number
  ceritification: string[]
  heatManagement: {
    img: string[]
    construction: string
    controlLogic: string
    liquidCoolingUnit: {
      brand: string
      type: string
      size: {
        width: number
        heigth: number
        deep: number
      }
      normalVoltage: number
      refrigeratingCapacity: number
      heatingCapacity: number
      setPosition: string
      ExhaustPosition: string
    }
  }
  fireControl: {
    img: string[]
    fireSafty: []
    designStandard: string
    description: string
  }
  construction: {
    img: string[]
    description: string
  }
  bms: {
    img: string[]
    brand: string
    protocol: string
    framework: string
    description: string
  }
  electrical: {
    diagram: string
    description: string
  }
  transportation: {
    plan: string
  }
  salesAfterService: {
    installWay: string
    accessories: string[]
    personNum: number
    description: string
  }
}
