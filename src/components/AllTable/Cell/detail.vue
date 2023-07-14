<template>
  <el-carousel indicator-position="outside" :autoplay="false">
    <el-carousel-item label="参数">
      <div class="dialog-content">
        <div class="right">
          <img src="@/assets/cell.png" alt="123" />
        </div>
        <div class="left">
          <el-descriptions class="margin-top" :column="2" title="电芯参数" border>
            <el-descriptions-item v-for="c in column" :key="c.prop" :span="c.prop == 'size' ? 2 : 1">
              <template #label>
                <div class="cell-item">{{ c.label }}</div>
              </template>
              {{ props.currentMessage[c.prop].toString() }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-carousel-item>
    <el-carousel-item label="优势">
      <h3>优势点</h3>
      <h4>此处省略两万字</h4>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { Cell } from '@/interface/index'

const props = defineProps<{
  currentMessage: Cell
}>()

const column = [
  { prop: 'name', label: '厂商' },
  { prop: 'capacity', label: '标称容量(Ah)' },
  { prop: 'voltage', label: '标称电压(V)' },
  { prop: 'rate', label: '充放倍率(P)' },
  { prop: 'capacity_density', label: '能量密度(Wh/kg)' },
  { prop: 'cycle', label: '循环寿命(@25℃)' },
  { prop: 'old', label: '日历寿命(年)' },
  { prop: 'temperature', label: '工作温度(℃)' },
  { prop: 'weight', label: '重量(kg)' },
  { prop: 'tag', label: '工艺' },
  { prop: 'size', label: '尺寸(mm W*D*H)' },
  { prop: 'certification', label: '认证' }
]
</script>
<style lang="less" scoped>
:deep(.el-carousel__container) {
  height: 350px !important;
}

.dialog-content {
  padding: 0 50px;
  display: flex;
  width: 100%;

  .right {
    display: flex;
    width: 30%;
    align-items: center;

    img {
      width: 80%;
      align-items: center;
    }
  }
  .left {
    flex: 1;
  }
}
</style>
@/interface
