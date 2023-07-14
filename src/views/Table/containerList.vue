<template>
  <div class="table-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="厂商">
        <el-input v-model="formInline.name" placeholder="厂商" class="normalInput"></el-input>
      </el-form-item>
      <el-form-item label="版本">
        <el-select v-model="formInline.rate" placeholder="系统版本">
          <el-option label="国版" value="CH"></el-option>
          <el-option label="欧版" value="UK"></el-option>
          <el-option label="美版" value="US"></el-option>
          <el-option label="澳版" value="AS"></el-option>
          <el-option label="国际版" value="All"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="冷却">
        <el-select v-model="formInline.rate" placeholder="冷却方式">
          <el-option label="风冷" value="Air"></el-option>
          <el-option label="液冷" value="Liquid"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="直交侧">
        <el-select v-model="formInline.size" placeholder="直交侧">
          <el-option label="直流侧" value="DC"></el-option>
          <el-option label="直+交流侧" value="all"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="formInline.tag" placeholder="尺寸">
          <el-option label="20ft" value="20"></el-option>
          <el-option label="40ft" value="40"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="防护">
        <el-select v-model="formInline.size" placeholder="防护等级">
          <el-option label="IP5X" value="5"></el-option>
          <el-option label="IP6X" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="防腐">
        <el-select v-model="formInline.size" placeholder="防腐等级">
          <el-option label="C3" value="C3"></el-option>
          <el-option label="C4" value="C4"></el-option>
          <el-option label="C5" value="C5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="容量">
        <el-select v-model="formInline.rule" placeholder="规则" class="smallSelect">
          <el-option label="等于" value="0"></el-option>
          <el-option label="小于" value="1"></el-option>
          <el-option label="大于" value="2"></el-option>
          <el-option label="小于等于" value="3"></el-option>
          <el-option label="大于等于" value="4"></el-option>
          <el-option label="不等于" value="5"></el-option>
        </el-select>
        <el-input v-model="formInline.capacity" placeholder="容量" class="smallInput"></el-input>
        <span>Ah</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          <el-icon :size="14"> <Search /> </el-icon>
          <span style="margin-right: 2px">查询</span></el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      ref="filterTableRef"
      border
      stripe
      class="table-list"
      :data="state.tableData.filter((data) => !state.search || data.name.toLowerCase().includes(state.search.toLowerCase()))"
      style="width: 100%"
    >
      <el-table-column prop="name" label="厂商" width="120" align="center" fixed="left" />
      <el-table-column prop="type" label="型号" width="150" align="center" fixed="left" />
      <el-table-column
        align="center"
        prop="vision"
        label="版本"
        width="100"
        :filters="[
          { text: '国内版', value: 0 },
          { text: '国际版', value: 1 },
          { text: '欧版', value: 2 },
          { text: '美版', value: 3 },
          { text: '澳版', value: 4 }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="whichType(scope.row.rack.coolingConcept)" disable-transitions>{{ formatVision(scope.row) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Cell" align="center">
        <el-table-column prop="cell.capacity" label="电芯容量" width="120" align="center" sortable />
        <el-table-column prop="cell.rate" label="充放倍率" width="120" align="center" sortable />
      </el-table-column>
      <el-table-column label="Pack" align="center">
        <el-table-column prop="pack.configuration" label="配置" width="100" align="center">
          <template #default="scope">
            <span>{{ scope.row.pack.configuration.parallel + 'P' + scope.row.pack.configuration.series + 'S' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pack.ipLevel" label="防护等级" width="120" align="center" sortable />
      </el-table-column>
      <el-table-column label="Rack" align="center">
        <el-table-column prop="rack.packNum" label="配置" width="100" align="center">
          <template #default="scope">
            <span>{{ scope.row.pack.configuration.parallel + 'P' + scope.row.rack.packNum * scope.row.pack.configuration.series + 'S' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="rack.coolingConcept"
          label="冷却方式"
          width="100"
          :filters="[
            { text: '风冷', value: 0 },
            { text: '液冷', value: 1 }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="whichType(scope.row.rack.coolingConcept)" disable-transitions>{{ scope.row.rack.coolingConcept == 0 ? '风冷' : '液冷' }}</el-tag>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="Container" align="center">
        <el-table-column prop="rackNum" label="配置" width="100" align="center">
          <template #default="scope">
            <span>{{ scope.row.rackNum * scope.row.pack.configuration.parallel + 'P' + scope.row.rack.packNum * scope.row.pack.configuration.series + 'S' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="normalCapacity" label="额定容量(MWh)" width="150" align="center" sortable />
        <el-table-column prop="size" label="单箱尺寸(mm W*D*H)" width="180" align="center" :formatter="formatSize" />
        <el-table-column prop="weight" label="单箱重量(T)" width="130" align="center" sortable />
        <el-table-column prop="ipLevel" label="防护等级" width="120" align="center" sortable>
          <template #default="scope">
            <span>{{ 'IP' + scope.row.ipLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="corrosionProofLevel" label="防腐等级" width="120" align="center" sortable>
          <template #default="scope">
            <span>{{ 'C' + scope.row.corrosionProofLevel }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operationTemperature" label="运行温度(℃)" width="120" align="center" :formatter="formatTemp" />
        <el-table-column prop="altitude" label="最高海拔(m)" width="130" align="center" sortable />
        <el-table-column prop="cycle" label="循环寿命" width="120" align="center" sortable />
        <el-table-column prop="fireproof" label="耐火时长(h)" width="130" align="center" sortable />
        <el-table-column prop="lifetime" label="工况寿命" width="120" align="center" sortable />
        <el-table-column
          align="center"
          prop="isDC"
          label="直/交流"
          width="100"
          :filters="[
            { text: 'DC侧', value: 0 },
            { text: 'DC+AC侧', value: 1 }
          ]"
          :filter-method="filterDC"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="whichType(scope.row.isDC)" disable-transitions>{{ scope.row.isDC == 0 ? 'DC侧' : 'DC+AC侧' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="报价(Wh/元)" width="130" align="center" sortable />
        <el-table-column prop="deliveryCycle" label="交付周期" width="120" align="center" sortable />
      </el-table-column>
      <el-table-column align="center" fixed="right" min-width="150">
        <template #header>
          <el-input v-model="state.search" size="mini" placeholder="厂商搜索" />
        </template>
        <template #default="scope">
          <el-button circle @click="handleLook(scope.$index, scope.row)"
            ><el-icon :size="14"> <Search /> </el-icon>
          </el-button>
          <el-button circle type="primary" @click="handleEdit(scope.$index, scope.row)"
            ><el-icon :size="14"> <Edit /> </el-icon>
          </el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定删除该条记录吗？" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button circle type="danger"
                ><el-icon :size="14"> <Delete /> </el-icon
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="false"
      :current-page="state.currentPage"
      :page-sizes="[5, 10, 15, 20, 25]"
      :page-size="state.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <div id="dialog1">
      <el-dialog v-model="dialogVisible" width="70%" title="详情" draggable align-center destroy-on-close>
        <Detail :current-message="(currentMessage as Cell)" />
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
            <el-button type="primary" @click="compareVisible = true"> 去对比 </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

    <div id="dialog2">
      <el-dialog id="dialog2" v-model="compareVisible" width="40%" title="电芯对比" draggable align-center destroy-on-close>
        <CompareList :current-message="(currentMessage as Cell)" />
      </el-dialog>
    </div>

    <div id="dialog2">
      <el-dialog id="dialog2" v-model="editVisible" width="40%" title="电芯信息新建" draggable align-center destroy-on-close>
        <EditCell :current-message="currentMessage" />
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { Cell } from '@/interface/index'
import Detail from '@/components/AllTable/Container/detail.vue'

// 思考 ref 响应式和 reactive 响应式的区别； 修改对象属性值，是否会刷新数据
// const router = useRouter()
const filterTableRef = ref()
const state = reactive({
  tableData: [
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    },
    {
      name: '宁德时代',
      type: 'EnerC',
      vision: 1,
      cell: {
        capacity: 280,
        rate: 0.5
      },
      pack: {
        configuration: {
          parallel: 1,
          series: 28
        },
        ipLevel: 54
      },
      rack: {
        packNum: 8,
        coolingConcept: 1
      },
      rackNum: 8,
      normalCapacity: 3.7,
      size: {
        width: 6089,
        height: 2540,
        deep: 1980
      },
      weight: 35,
      ipLevel: 54,
      corrosionProofLevel: 5,
      operationTemperature: {
        low: -30,
        high: 55
      },
      altitude: 3000,
      cycle: 7000,
      fireproof: 2,
      lifetime: 20,
      // 0：DC侧，1：DC+AC侧
      isDC: 0,
      price: 1.4,
      deliveryCycle: 7,
      ceritification: ['UL1973', 'UL9840A']
    }
  ],
  currentPage: 1,
  pageSize: 10,
  search: ''
})
const formInline = reactive({
  name: '',
  rule: '',
  capacity: '',
  rate: '',
  tag: '',
  size: ''
})
const dialogVisible = ref(false)
const compareVisible = ref(false)
const editVisible = ref(false)
const currentMessage = ref({})

const total = computed(() => state.tableData.length)
const formatSize = (row: { size: any }) => `${row.size.width}*${row.size.height}*${row.size.deep}`
const formatTemp = (row: { operationTemperature: any }) => `${row.operationTemperature.low}~${row.operationTemperature.high}`
const formatVision = (row: { vision: number }) => {
  switch (row.vision) {
    case 0:
      return '国内版'
    case 1:
      return '国际版'
    case 2:
      return '欧版'
    case 3:
      return '美版'
    default:
      return '澳版'
  }
}
const handleLook = (index: any, row: any) => {
  currentMessage.value = { ...row }
  dialogVisible.value = true
}
const handleEdit = (index: any, row: any) => {
  currentMessage.value = { ...row }
  editVisible.value = true
}
const handleDelete = (index: any, row: any) => {
  state.tableData.splice(index, 1)
}
const handleSizeChange = (val: any) => {
  console.log(`每页 ${val} 条`)
  state.pageSize = val
}
const handleCurrentChange = (val: any) => {
  console.log(`当前页: ${val}`)
  state.currentPage = val
}

const filterTag = (value: any, row: { rack: any }) => value === row.rack.coolingConcept
const filterDC = (value: any, row: { isDC: any }) => value === row.isDC

const whichType = (type: number) => {
  if (type === 0) return 'success'
  if (type === 1) return 'primary'
  if (type === 2) return 'Warning'
  if (type === 2) return 'info'
  return 'error'
}

const onSubmit = () => {
  console.log('submit!')
}

onMounted(() => {})
</script>
<style lang="less" scoped>
.table-container {
  position: relative;
  padding: 0 30px;
  .form-inline {
    text-align: left;
    margin: 0 15px;
  }
  .table-list {
    margin: 15px;
  }

  .smallInput {
    width: 80px;
    margin-right: 5px;
  }
  .smallSelect {
    width: 140px;
  }

  .normalInput {
    width: 215px;
  }

  :deep(.el-dialog) {
    padding: 10px 30px;
    position: absolute;
    top: 50% !important;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
  }

  #dialog2 :deep(.el-dialog) {
    height: 800px !important;
  }

  .myTable {
    border-collapse: collapse;
    // margin: 0 auto;
    text-align: center;

    td,
    th {
      border: 1px solid #ecf5ff;
      color: #666;
      height: 40px;
    }

    tr td:nth-child(1) {
      width: 30%;
      padding-left: 10px;
      text-align: left;
    }
  }
}
</style>
