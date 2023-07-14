<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
    <el-form-item label="厂商名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="标称容量(Ah)" prop="capacity">
      <el-input v-model="ruleForm.capacity" />
    </el-form-item>
    <el-form-item label="标称电压(V)" prop="voltage" @change="() => (isOtherVoltage = toggle(ruleForm.voltage))">
      <el-radio-group v-model="ruleForm.voltage">
        <el-radio label="3.2V" />
        <el-radio label="其他" />
        <el-input v-show="isOtherVoltage" v-model="otherVoltage" class="other" size="small" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="充放倍率(P)" prop="rate" @change="() => (isOtherRate = toggle(ruleForm.rate))">
      <el-radio-group v-model="ruleForm.rate">
        <el-radio label="0.25P" />
        <el-radio label="0.5P" />
        <el-radio label="1P" />
        <el-radio label="2P" />
        <el-radio label="其他" />
        <el-input v-show="isOtherRate" v-model="otherRate" class="other" size="small" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="循环寿命(@25℃)" prop="old">
      <el-input v-model="ruleForm.cycle" />
    </el-form-item>
    <el-form-item label="日历寿命(年)" prop="old">
      <el-input v-model="ruleForm.old" />
    </el-form-item>
    <el-form-item label="工作温度(℃)" prop="old">
      <el-input v-model="ruleForm.temperature" />
    </el-form-item>
    <el-form-item label="重量(kg)" prop="weight">
      <el-input v-model="ruleForm.weight" />
    </el-form-item>
    <el-form-item label="工艺" prop="tag" @change="() => (isOtherTag = toggle(ruleForm.tag))">
      <el-radio-group v-model="ruleForm.tag">
        <el-radio label="卷绕" />
        <el-radio label="叠片" gji />、
        <el-radio label="其他" />
        <el-input v-show="isOtherTag" v-model="otherTag" class="other" size="small" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="尺寸(mm)" prop="size" style="font-weight: 700">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input v-model="ruleForm.weight" />
        </el-col>
        <span>W</span>
        <el-col :span="7">
          <el-input v-model="ruleForm.weight" />
        </el-col>
        <span>H</span>
        <el-col :span="7">
          <el-input v-model="ruleForm.weight" />
        </el-col>
        <span>D</span>
      </el-row>
    </el-form-item>
    <el-form-item label="认证" prop="certification">
      <el-checkbox-group v-model="ruleForm.certification">
        <el-checkbox label="UL9540A" name="type" />
        <el-checkbox label="UL9540" name="type" />
        <el-checkbox label="UL1973" name="type" />
        <el-checkbox label="IEC2023" name="type" />
        <el-checkbox label="UL9540A" name="type" />
        <el-checkbox label="UL9540" name="type" />
        <el-checkbox label="UL1973" name="type" />
        <el-checkbox label="IEC2023" name="type" />
        <el-checkbox label="UL9540A" name="type" />
        <el-checkbox label="UL9540" name="type" />
        <el-checkbox label="UL1973" name="type" />
        <el-checkbox label="IEC2023" name="type" />
        <el-checkbox label="UL1973" name="type" />
        <el-checkbox label="IEC2023" name="type" />
        <el-checkbox label="IEC2023" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Cell } from '@/interface/index'

const isOtherVoltage = ref(false)
const isOtherRate = ref(false)
const isOtherTag = ref(false)
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Cell>({
  img: '',
  name: 'Hello',
  capacity: 0,
  voltage: 3.2,
  capacity_density: 0,
  rate: 0,
  cycle: 0,
  old: 0,
  tag: '卷绕',
  size: [],
  weight: 3,
  temperature: {
    low: 10,
    heigh: 20
  },
  certification: []
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change'
    }
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change'
    }
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change'
    }
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
})

const toggle = (val: string): boolean => {
  console.log(val)
  if (val === '其他') return true
  return false
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}))
</script>
<style lang="less" scoped>
.el-checkbox-group {
  display: grid;
  grid-template-columns:
    20%
    20%
    20%
    20%
    20%;
}

:deep(.el-form-item__label) {
  width: 125px !important;
}

:deep(.other) {
  width: 80px;
  margin-left: -20px;
}
</style>
