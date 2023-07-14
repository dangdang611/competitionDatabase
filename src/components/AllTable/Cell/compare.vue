<template>
  <div class="cellCompare">
    <div class="left">
      <el-select v-model="AProduct" placeholder="请选择对比的产品" class="input">
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-option-group>
      </el-select>
      <img src="@/assets/hithium.png" alt="123" />
      <el-descriptions direction="vertical" :column="1">
        <el-descriptions-item v-for="c in column" :key="c.prop" :label="c.label">
          <span>{{ AProduct[c.prop] }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="right">
      <el-select v-model="BProduct" placeholder="请选择对比的产品" class="input">
        <el-option-group v-for="group in options" :key="group.label" :label="group.label">
          <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-option-group>
      </el-select>
      <img src="@/assets/hithium.png" alt="123" />
      <el-descriptions direction="vertical" :column="1">
        <el-descriptions-item v-for="c in column" :key="c.prop" :label="c.label">
          <span>{{ 123 }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="nav">
      <span>参数对比</span>
      <span> <el-switch v-model="isDifferent" /><span id="difftxt">只看不同</span></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { Cell } from '@/interface/index'

const props = defineProps<{
  currentMessage: Cell
}>()
const AProduct = props.currentMessage
const BProduct = ref('')
const isDifferent = ref(false)
const column = [
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

    .el-descriptions {
      span {
        font-size: 20px;
        color: #000;
      }
    }

    :deep(.el-descriptions__label:not(.is-bordered-label)) {
      color: #999;
      font-size: 15px;
    }

    img {
      width: 200px;
      margin-bottom: 100px;
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

  .nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    position: absolute;
    top: 28%;
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
}
</style>
@/interface
