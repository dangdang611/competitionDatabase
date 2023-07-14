<template>
  <div class="table-container">
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="厂商">
        <el-input v-model="formInline.name" placeholder="厂商"></el-input>
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
      <el-form-item label="倍率">
        <el-select v-model="formInline.rate" placeholder="倍率">
          <el-option label="0.25" value="0.25"></el-option>
          <el-option label="0.5" value="0.5"></el-option>
          <el-option label="1" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工艺">
        <el-select v-model="formInline.tag" placeholder="工艺">
          <el-option label="叠片" value="叠片"></el-option>
          <el-option label="卷绕" value="卷绕"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="formInline.size" placeholder="尺寸">
          <el-option label="71137" value="71137"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
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
      <el-table-column prop="name" label="厂商" width="120" align="center" fixed="left"> </el-table-column>
      <el-table-column prop="capacity" label="标称容量(Ah)" width="135" align="center" sortable fixed="left"> </el-table-column>
      <el-table-column prop="voltage" label="标称电压(V)" width="100" align="center"> </el-table-column>
      <el-table-column prop="rate" label="充放倍率(P)" width="100" align="center"> </el-table-column>
      <el-table-column prop="capacity_density" label="能量密度(Wh/kg)" width="160" align="center" sortable> </el-table-column>
      <el-table-column prop="cycle" label="循环寿命(@25℃)" width="140" align="center"> </el-table-column>
      <el-table-column prop="old" label="日历寿命(年)" width="130" align="center" sortable> </el-table-column>
      <el-table-column prop="temperature" label="工作温度(℃)" width="120" align="center"> </el-table-column>
      <el-table-column prop="weight" label="重量(kg)" width="100" align="center"> </el-table-column>
      <el-table-column
        align="center"
        prop="tag"
        label="工艺"
        width="100"
        :filters="[
          { text: '叠片', value: '叠片' },
          { text: '卷绕', value: '卷绕' },
          { text: '其他', value: '其他' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag :type="whichType(scope.row.tag)" disable-transitions>{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="尺寸(mm W*D*H)" width="140" align="center"> </el-table-column>
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
      <el-dialog v-model="dialogVisible" width="50%" title="详情" draggable align-center destroy-on-close>
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
import { computed, ref, reactive } from 'vue'
import { Cell } from '@/interface/index'
import Detail from '@/components/AllTable/Cell/detail.vue'
import CompareList from '@/components/AllTable/Cell/compare.vue'
import EditCell from '@/components/AllTable/Cell/editCell.vue'

// 思考 ref 响应式和 reactive 响应式的区别； 修改对象属性值，是否会刷新数据
// const router = useRouter()
const filterTableRef = ref()
const state = reactive({
  tableData: [
    {
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
    },
    {
      id: '003',
      name: '宁德时代',
      capacity: 306,
      voltage: 3.2,
      rate: 0.5,
      capacity_density: 176,
      cycle: 10000,
      old: 20,
      temperature: 25,
      weight: 3,
      size: '71*173*64',
      tag: '其他',
      certification: 'UL1974'
    },
    {
      id: '004',
      name: '宁德时代',
      capacity: 314,
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
    },
    {
      id: '005',
      name: '宁德时代',
      capacity: 320,
      voltage: 3.2,
      rate: 0.5,
      capacity_density: 176,
      cycle: 10000,
      old: 20,
      temperature: 25,
      weight: 3,
      size: '71*173*64',
      tag: '叠片',
      certification: 'UL1974'
    },
    {
      id: '006',
      name: '海辰',
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
      certification: 'UL9540A'
    },
    {
      id: '007',
      name: '海辰',
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
      certification: 'UL9540A'
    },
    {
      id: '008',
      name: '海辰',
      capacity: 314,
      voltage: 3.2,
      rate: 0.5,
      capacity_density: 176,
      cycle: 10000,
      old: 20,
      temperature: 25,
      weight: 3,
      size: '71*173*64',
      tag: '叠片',
      certification: 'UL9540A'
    },
    {
      id: '009',
      name: '海辰',
      capacity: 320,
      voltage: 3.2,
      rate: 0.5,
      capacity_density: 176,
      cycle: 10000,
      old: 20,
      temperature: 25,
      weight: 3,
      size: '71*173*64',
      tag: '叠片',
      certification: 'UL9540A'
    },
    {
      id: '010',
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
    },
    {
      id: '012',
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
    },
    {
      id: '013',
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
    },
    {
      id: '014',
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
const total = computed(() => state.tableData.length)
const dialogVisible = ref(false)
const compareVisible = ref(false)
const editVisible = ref(false)
const currentMessage = ref({})

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
const filterTag = (value: any, row: { tag: any }) => row.tag === value
const whichType = (type: string) => {
  if (type === '叠片') return 'success'
  if (type === '卷绕') return 'primary'
  return 'error'
}
const onSubmit = () => {
  console.log('submit!')
}
</script>
<style lang="less" scoped>
.table-container {
  position: relative;
  padding: 0 30px;
  .form-inline {
    margin: 15px 0px 15px 15px;
    text-align: left;

    .el-form-item {
      margin-right: 23px !important;
    }
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

  :deep(.el-dialog) {
    padding: 10px 30px;
    position: absolute;
    top: 45% !important;
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
@/interface
