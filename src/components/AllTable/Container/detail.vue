<template>
  <el-carousel indicator-position="outside" :autoplay="false" arrow="never">
    <el-carousel-item label="系统参数">
      <ParameterContent :column="sysColumn" />
    </el-carousel-item>
    <el-carousel-item label="热管理">
      <ParameterContent :column="heatColumn" />
    </el-carousel-item>
    <el-carousel-item label="消防">
      <ParameterContent :column="fireColumn" />
    </el-carousel-item>
    <el-carousel-item label="结构">
      <h3>结构设计模块</h3>
      <h4>此处省略两万字</h4>
    </el-carousel-item>
    <el-carousel-item label="电气">
      <h3>电气设计模块</h3>
      <h4>此处省略两万字</h4>
    </el-carousel-item>
    <el-carousel-item label="BMS">
      <h3>BMS模块</h3>
      <h4>此处省略两万字</h4>
    </el-carousel-item>
    <el-carousel-item label="运输">
      <h3>运输方案模块</h3>
      <h4>此处省略两万字</h4>
    </el-carousel-item>
    <el-carousel-item label="售后">
      <h3>售后服务模块</h3>
      <h4>此处省略两万字</h4>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { Cell } from '@/interface/index'
import ParameterContent from './parameterContent.vue'

const props = defineProps<{
  currentMessage: Cell
}>()

const sysColumn = [
  { prop: 'name', label: '厂商' },
  { prop: 'type', label: '型号' },
  { prop: 'vision', label: '版本' },
  {
    label: 'Cell',
    children: [
      { prop: 'capacity', label: '电芯容量' },
      { prop: 'rate', label: '充放倍率' }
    ]
  },
  {
    label: 'Pack',
    children: [
      { props: 'configuration', label: '配置' },
      { props: 'ipLevel', label: '防护等级' }
    ]
  },
  {
    label: 'Rack',
    children: [
      { props: 'configuration', label: '配置' },
      { props: 'coolingConcept', label: '冷却方式' }
    ]
  },
  {
    label: 'Contanier',
    children: [
      { props: 'configuration', label: '配置' },
      { props: 'normalCapacity', label: '额定容量(MWh)' },
      { prop: 'size', label: '尺寸(mm W*D*H)' },
      { prop: 'weight', label: '单箱重量(T)' },
      { props: 'ipLevel', label: '防护等级' },
      { props: 'corrosionProofLevel', label: '防腐等级' },
      { prop: 'operationTemperature', label: '运行温度(℃)' },
      { prop: 'altitude', label: '最高海拔(m)' },
      { prop: 'cycle', label: '循环寿命' },
      { prop: 'fireproof', label: '耐火时长(h)' },
      { prop: 'lifetime', label: '工况寿命' },
      { prop: 'isDC', label: '直/交流' },
      { prop: 'price', label: '报价(Wh/元)' },
      { prop: 'deliveryCycle', label: '交付周期' }
    ]
  }
]

const heatColumn = [
  {
    prop: 'construction',
    label: '管道布局'
  },
  {
    prop: 'controlLogic',
    label: '控制逻辑'
  },
  {
    prop: 'coolingConcept',
    label: '冷却方式'
  },
  {
    label: '液冷机组',
    children: [
      {
        prop: 'brand',
        label: '品牌'
      },
      {
        prop: 'type',
        label: '型号'
      },
      {
        prop: 'size',
        label: '尺寸'
      },
      {
        prop: 'normalVotage',
        label: '额定电压'
      },
      {
        prop: 'refrigeratingCapacity',
        label: '制冷量'
      },
      {
        prop: 'heatingCapacoty',
        label: '制热量'
      },
      {
        prop: 'setPosition',
        label: '安装位置'
      },
      {
        prop: 'ExhaustPosition',
        label: '排风通道位置'
      }
    ]
  }
]

const fireColumn = [
  {
    prop: 'fireSafty',
    label: '消防介质'
  },
  {
    prop: 'designStandard',
    label: '设计标准'
  },
  {
    prop: 'description',
    label: '描述'
  }
]

const construction = [
  {
    prop: 'description',
    label: '描述'
  }
]
</script>
<style lang="less" scoped>
:deep(.el-carousel__container) {
  height: 520px !important;
}
</style>
