<template>
  <el-carousel indicator-position="outside" :autoplay="false">
    <el-carousel-item label="参数">
      <ParameterContent :column="props.column" :msg="props.currentMessage" />
    </el-carousel-item>
    <el-carousel-item label="优势">
      <h3>优势点</h3>
      <div class="advantage">1231231231231231231212222222222222312321312321312312121212121212121212121212</div>
    </el-carousel-item>
  </el-carousel>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import ParameterContent from '../parameterContent.vue'

const props = defineProps(['currentMessage', 'column'])
</script>
<style lang="less" scoped>
:deep(.el-carousel__container) {
  height: 480px !important;
}

.advantage {
  margin-top: 20px;
  padding: 0 50px;
  text-align: left;
}
</style>
