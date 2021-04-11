<template>
  <div class="web-ui-page">
    <div class="order-block">
      <div class="web-ui-page__block order-block__date-picker">
        <el-date-picker
          v-model="value"
          type="daterange"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          value-format="yyyy-MM-dd"
          @change="clickDate"
        >
        </el-date-picker>
        <div v-if="countOrderList">訂單總數: {{ countOrderList.count }}</div>
      </div>
      <div class="web-ui-page__block">
        <div class="web-ui-title">詳細希望訂單資訊</div>
        <el-table style="width: 100%" max-height="800" highlight-current-row :data="pageddetailOrderList">
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
        <div class="web-ui-pagination">
          <el-pagination layout="prev, pager, next" :total="detailOrderList.length" @current-change="setPage">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="order-block">
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
    </div>
    <!-- <el-dialog title="新增標的切換清單" :visible.sync="createVisible" width="80%">
      <create-symbol-form @emit-form="handleCreateData"></create-symbol-form>
    </el-dialog> -->
  </div>
</template>
<script>
import { getCountOrder, getDetailOrder } from '@/api/order'
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
      value: null,
      wsuri: 'ws://10.168.100.31:55688/public/system/stream_order', // ws wss
      lockReconnect: false, // 連接失敗不進行重連
      maxReconnect: 5, // 最大重連次數
      socket: null,
            page: 1,
      pageSize: 10

    }
  },
  computed: {
      pageddetailOrderList() {
      if (this.detailOrderList) {
        return this.detailOrderList.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      } else return null
    },
  },
  watch: {},
  created() {
    // 頁面剛進入時開啟長連線
    this.initWebSocket()
  },
  destroyed() {
    // 頁面銷燬時關閉長連線
    this.websocketclose()
  },
  mounted() {},
  methods: {
    setPage(val) {
      this.page = val
    },
    clickDate() {
      var time_range = {
        starts_at: '2006-01-02T15:04:05Z',
        ends_at: '2006-01-03T15:04:05Z'
      }
      console.log('time_range:', time_range)
      getCountOrder(time_range).then(res => {
        if (res.error.success) {
          this.countOrderList = res.result
        }
      })
      getDetailOrder(time_range).then(res => {
        if (res.error.success) {
          this.detailOrderList = res.result
        }
      })
    },
    initWebSocket() {
      // 初始化weosocket
      try {
        if ('WebSocket' in window) {
          this.socket = new WebSocket(this.wsuri)
        } else {
          console.log('您的浏览器不支持websocket')
        }
        this.socket.onopen = this.websocketonopen
        this.socket.onerror = this.websocketonerror
        this.socket.onmessage = this.websocketonmessage
        this.socket.onclose = this.websocketclose
      } catch (e) {
        this.reconnect()
      }
    },
    websocketonopen() {
      console.log('WebSocket連線成功')
    },
    websocketonerror(e) {
      // 錯誤
      console.log('WebSocket連線發生錯誤')
    },
    websocketonmessage(e) {
      // 資料接收
      const redata = JSON.parse(e.data)
      // 接收資料
      // console.log('redata', redata)
      this.streamOrderList.push(redata[0])
    },

    websocketsend() {
      // 資料傳送
    },

    websocketclose(e) {
      // 關閉
      console.log('connection closed (' + e.code + ')')
      this.reconnect()
    },
    reconnect() {
      console.log('尝试重连')
      if (this.lockReconnect || this.maxReconnect <= 0) {
        return
      }
      setTimeout(() => {
        // this.maxReconnect-- // 不做限制 连不上一直重连
        this.initWebSocket()
      }, 60 * 1000)
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './order.scss';
</style>

