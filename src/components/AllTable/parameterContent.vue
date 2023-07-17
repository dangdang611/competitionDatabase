<template>
  <div class="dialog-content">
    <div class="right">
      <el-carousel trigger="click" indicator-position="outside" style="width: 100%">
        <el-carousel-item v-for="index in 3" :key="index">
          <img :src="img" alt="123" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="left">
      <div class="leftContent">
        <table border="1" cellspacing="0">
          <tr>
            <td colspan="2">参数项</td>
            <td>参数</td>
          </tr>
          <template v-for="(c, index) in props.column" :key="index">
            <tr>
              <td :rowspan="c.hasOwnProperty('children') ? c.children?.length : 1" :colspan="c.hasOwnProperty('children') ? 1 : 2">{{ c.label }}</td>
              <template v-if="c.hasOwnProperty('children')">
                <td class="tableHeader2">{{ c.children[0].label }}</td>
                <td class="tableContent">{{ props.msg[c.children[0].prop] }}</td>
              </template>
              <template v-else>
                <td class="tableContent">{{ props.msg[c.prop] }}</td>
              </template>
            </tr>
            <template v-if="c.hasOwnProperty('children') && c.children[1]">
              <tr v-for="(child, index) in c.children?.slice(1)" :key="index">
                <td class="tableHeader">{{ child.label }}</td>
                <td class="tableContent">{{ props.msg[child.prop] }}</td>
              </tr>
            </template>
          </template>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import img from '@/assets/sys.png'
import { defineProps } from 'vue'

const props = defineProps(['msg', 'column'])
console.log(props.msg)
</script>

<style lang="less" scoped>
.dialog-content {
  display: flex;
  width: 100%;
  padding-left: 50px;

  .right {
    display: flex;
    width: 35%;
    align-items: center;
    justify-content: center;

    :deep(img) {
      width: 90%;
      margin-top: 100px;
    }
  }
  .left {
    flex: 1;
    margin-left: 20px;

    .leftContent {
      height: 500px;
      overflow: auto;
    }
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;

  .tableHeader {
    width: 20%;
  }
  .tableHeader2 {
    width: 25%;
  }
  .tableContent {
    width: 55%;
  }

  td,
  th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 35px;
  }

  tr td:nth-child(1) {
    background: #f5fafa;
  }

  tr:nth-child(1) td {
    background-color: #cce8eb;
    font-weight: 700;
    color: #fff;
  }
}
</style>
