<template>
  <div class="web-ui-page">
    <div class="web-ui-page__block">
      <div class="web-ui-title">串流取得下單紀錄</div>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="streamOrderList">
        <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
        <el-table-column prop="ref_order_log_id" label="ref_order_log_id" width="120" sortable></el-table-column>
        <el-table-column prop="ref_network_id" label="ref_network_id" width="120" sortable></el-table-column>
        <el-table-column prop="ref_account_id" label="ref_account_id" width="120" sortable></el-table-column>
        <el-table-column prop="subaccount" label="subaccount" width="120" sortable> </el-table-column>
        <el-table-column prop="symbol" label="symbol" width="120" sortable> </el-table-column>
        <el-table-column prop="side" label="side" width="120" sortable> </el-table-column>
        <el-table-column prop="ref_order_id" label="ref_order_id" width="120" sortable> </el-table-column>
        <el-table-column prop="recv_time" label="recv_time" width="120" sortable> </el-table-column>
        <el-table-column prop="order_time" label="order_time" width="120" sortable> </el-table-column>
        <el-table-column prop="ideal_order_price" label="ideal_order_price" width="120" sortable> </el-table-column>
        <el-table-column prop="actual_order_price" label="actual_order_price" width="120" sortable> </el-table-column>
        <el-table-column prop="confirmed_time" label="confirmed_time" width="120" sortable> </el-table-column>
        <el-table-column prop="filled_price" label="filled_price" width="120" sortable> </el-table-column>
        <el-table-column prop="filled_time" label="filled_time" width="120" sortable> </el-table-column>
        <el-table-column prop="is_pseudo" label="is_pseudo" width="120" sortable> </el-table-column>
        <el-table-column prop="status" label="status" width="120" sortable> </el-table-column>
        <el-table-column prop="note" label="note" width="150" sortable> </el-table-column>
      </el-table>
    </div>
    {{ value }}
    <!-- :default-time="['00:00:00', '23:59:59']" -->
    <div class="web-ui-page__block">
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="開始日期"
        end-placeholder="結束日期"
        value-format="yyyy-MM-dd"
        @change="clickDate"
      >
      </el-date-picker>
    </div>
    <div class="web-ui-page__block">
      <div class="web-ui-title">取得訂單總數 count order {{ countOrderList }}</div>
    </div>
    <div class="web-ui-page__block">
      <div class="web-ui-title">詳細希望訂單資訊 detail order</div>
      <el-button type="primary" icon="el-icon-plus" @click="createVisible = !createVisible">新增</el-button>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="detailOrderList">
        <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
        <el-table-column prop="ref_order_log_id" label="ref_order_log_id" width="120" sortable></el-table-column>
        <el-table-column prop="ref_network_id" label="ref_network_id" width="120" sortable></el-table-column>
        <el-table-column prop="ref_account_id" label="ref_account_id" width="120" sortable></el-table-column>
        <el-table-column prop="subaccount" label="subaccount" width="120" sortable> </el-table-column>
        <el-table-column prop="symbol" label="symbol" width="120" sortable> </el-table-column>
        <el-table-column prop="side" label="side" width="120" sortable> </el-table-column>
        <el-table-column prop="ref_order_id" label="ref_order_id" width="120" sortable> </el-table-column>
        <el-table-column prop="recv_time" label="recv_time" width="120" sortable> </el-table-column>
        <el-table-column prop="order_time" label="order_time" width="120" sortable> </el-table-column>
        <el-table-column prop="ideal_order_price" label="ideal_order_price" width="120" sortable> </el-table-column>
        <el-table-column prop="actual_order_price" label="actual_order_price" width="120" sortable> </el-table-column>
        <el-table-column prop="confirmed_time" label="confirmed_time" width="120" sortable> </el-table-column>
        <el-table-column prop="filled_price" label="filled_price" width="120" sortable> </el-table-column>
        <el-table-column prop="filled_time" label="filled_time" width="120" sortable> </el-table-column>
        <el-table-column prop="is_pseudo" label="is_pseudo" width="120" sortable> </el-table-column>
        <el-table-column prop="status" label="status" width="120" sortable> </el-table-column>
        <el-table-column prop="note" label="note" width="150" sortable> </el-table-column>
      </el-table>
    </div>
    <!-- <el-dialog title="新增標的切換清單" :visible.sync="createVisible" width="80%">
      <create-symbol-form @emit-form="handleCreateData"></create-symbol-form>
    </el-dialog> -->
  </div>
</template>
<script>
import { getStreamOrder, getCountOrder, getDetailOrder } from '@/api/order'
// import createSymbolForm from './createSymbolForm/createSymbolForm'
// import _ from 'lodash'
export default {
  name: 'Order',
  //   components: { createSymbolForm },
  data() {
    return {
      streamOrderList: [],
      countOrderList: null,
      detailOrderList: [],
      createVisible: false,
      value: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // WebSocket?
    // getStreamOrder().then(res => {
    //   if (res.error.success) {
    //     this.streamOrderList = res.result
    //   }
    // })
    // getDetailOrder().then(res => {
    //   if (res.error.success) {
    //     this.detailOrderList = res.result
    //   }
    // })
  },
  methods: {
    clickDate() {
      var time_range = {
        starts_at: this.value[0] + 'T00:00:00+08:00',
        ends_at: this.value[1] + 'T00:00:00+08:00'
      }
      console.log('time_range:', time_range)
      //   getCountOrder(time_range).then(res => {
      //     if (res.error.success) {
      //       this.countOrderList = res.result
      //     }
      //   })
      getDetailOrder(time_range).then(res => {
        if (res.error.success) {
          this.detailOrderList = res.result
        }
      })
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './order.scss';
</style>

