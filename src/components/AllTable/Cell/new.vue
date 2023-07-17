<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="手动创建" name="1">
      <EditCell />
    </el-tab-pane>
    <el-tab-pane label="Excel导入" name="2">
      <UploadExcel />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import UploadExcel from '../../Excel/uploadExcel.vue'
import EditCell from './edit.vue'

const activeName = ref('1')

const handleClick = () => {}
</script>
