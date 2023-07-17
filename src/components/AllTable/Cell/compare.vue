<template>
  <div class="cellCompare">
    <div class="left">
      <el-select v-model="AProduct" placeholder="请选择对比的产品" class="input">
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-option-group>
      </el-select>
      <img src="@/assets/sys.png" alt="123" />
    </div>
    <div class="right">
      <el-select v-model="BProduct" placeholder="请选择对比的产品" class="input">
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-option-group>
      </el-select>
      <img src="@/assets/sys.png" alt="123" />
    </div>
  </div>
  <div class="nav">
    <span>参数对比</span>
    <span> <el-switch v-model="isDifferent" /><span id="difftxt">只看不同</span></span>
  </div>
  <div class="cellParameter">
    <!-- <el-descriptions-item :label="c.label">
          <span>{{ 123 }}</span>
        </el-descriptions-item>
        <el-descriptions-item :label="c.label">
          <span>{{ 123 }}</span>
        </el-descriptions-item> -->
    <template v-if="!isDifferent">
      <div v-for="(c, index) in column" :key="index">
        <div class="product">
          <div>{{ c.label }}</div>
          <div>{{ product1[c.prop] }}</div>
        </div>
        <div class="product">
          <div>{{ c.label }}</div>
          <div>{{ product2[c.prop] }}</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-for="(c, index) in column" :key="index">
        <template v-if="product1[c.prop] != product2[c.prop]">
          <div class="product">
            <div>{{ c.label }}</div>
            <div :class="isXiu(product1[c.prop], product2[c.prop]) ? 'xiu' : ''">{{ product1[c.prop] }}</div>
          </div>
          <div class="product">
            <div>{{ c.label }}</div>
            <div :class="isXiu(product2[c.prop], product1[c.prop]) ? 'xiu' : ''">{{ product2[c.prop] }}</div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import { Cell } from '@/interface/index'

interface Column {
  prop: string
  label: string
}

const props = defineProps<{
  currentMessage: Cell
}>()
const AProduct = props.currentMessage
const BProduct = ref('')
const isDifferent = ref(false)

const column: Array<Column> = [
  { prop: 'name', label: '厂商' },
  { prop: 'capacity', label: '标称容量(Ah)' },
  { prop: 'voltage', label: '标称电压(V)' },
  { prop: 'rate', label: '充放倍率(P)' },
  { prop: 'capacity_density', label: '能量密度(Wh/kg)' },
  { prop: 'cycle', label: '循环寿命(@25℃)' },
  { prop: 'old', label: '日历寿命(年)' },
  { prop: 'temperature', label: '工作温度(℃)' },
  { prop: 'weight', label: '重量(kg)' }
]
const options = [
  {
    label: '海辰',
    options: [
      {
        value: '280Ah 0.25P',
        label: '280Ah 0.25P'
      },
      {
        value: '280Ah 0.5P',
        label: '280Ah 0.5P'
      }
    ]
  },
  {
    label: '宁德',
    options: [
      {
        value: '280Ah 0.25P',
        label: '280Ah 0.25P'
      },
      {
        value: '280Ah 0.5P',
        label: '280Ah 0.5P'
      },
      {
        value: '280Ah 1P',
        label: '280Ah 1P'
      },
      {
        value: '320Ah 0.5P',
        label: '320Ah 0.5P'
      }
    ]
  }
]

const product1 = {
  id: '002',
  name: '宁德时代',
  capacity: 300,
  voltage: 3.2,
  rate: 0.5,
  capacity_density: 176,
  cycle: 10000,
  old: 20,
  temperature: 25,
  weight: 3,
  size: '71*173*64',
  tag: '卷绕',
  certification: 'UL1974'
}

const product2 = {
  id: '002',
  name: '海辰',
  capacity: 280,
  voltage: 3.2,
  rate: 1,
  capacity_density: 176,
  cycle: 12000,
  old: 20,
  temperature: 35,
  weight: 3,
  size: '71*173*64',
  tag: '卷绕',
  certification: 'UL1974'
}

const isXiu = (val1: any, val2: any) => {
  // eslint-disable-next-line no-restricted-globals
  if (!isNaN(parseFloat(val1)) && isFinite(val1) && !isNaN(parseFloat(val2)) && isFinite(val2)) {
    if (val1 > val2) return false
    return true
  }
  return false
}
</script>
<style lang="less" scoped>
.cellCompare {
  position: relative;
  display: flex;
  // background-color: #f3f4f6;

  .right,
  .left {
    padding: 0 20px 10px;
    width: 50%;

    .el-select {
      margin-bottom: 10px;
    }

    :deep(.el-descriptions__label:not(.is-bordered-label)) {
      color: #999;
      font-size: 15px;
    }

    img {
      margin: 20px 0;
      width: 80%;
    }
  }

  .right {
    margin-left: 20px;
  }

  .input {
    width: 100%;

    :deep(.el-input__inner) {
      height: 50px !important;
    }
  }
}

.cellParameter {
  padding: 0 20px;
  text-align: left;

  > div {
    display: flex;

    .product {
      flex: 50%;
      margin-top: 15px;

      div:nth-child(2) {
        margin-top: 10px;
        font-size: 16px;
        color: #000;
      }
    }
  }
}
.nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  padding: 10px;
  border-bottom: 3px solid #c6e2ff;

  span:nth-child(1) {
    font-size: 18px;
    color: #409eff;
    font-weight: 700;
  }

  #difftxt {
    margin-left: 10px;
    color: #999;
  }
}

.xiu {
  color: #409eff !important;
  font-weight: 700;
}
</style>
@/interface
