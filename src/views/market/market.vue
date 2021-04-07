<template>
  <div class="web-ui-page">
    <div class="web-ui-page__block">
      <div class="web-ui-title">取得市場資訊清單 list market status</div>
      <el-button type="primary" icon="el-icon-plus" @click="createVisible = !createVisible">新增</el-button>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="marketStatus">
        <el-table-column label="啟用" width="80" fixed="left˝">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @click="!scope.row.enabled"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
        <el-table-column prop="exchange" label="交易所" width="120" sortable></el-table-column>
        <el-table-column prop="symbol" label="symbol" width="120" sortable></el-table-column>
        <el-table-column prop="created_at" label="建立時間" width="150"> </el-table-column>
        <el-table-column prop="updated_at" label="更新時間" width="150"> </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增市場資訊" :visible.sync="createVisible" width="80%">
      <create-market-form @emit-form="handleCreateData"></create-market-form>
    </el-dialog>
  </div>
</template>
<script>
import { getMarketStatus, postMarketInfo } from '@/api/market'
import createMarketForm from './createMarketForm/createMarketForm'
// import _ from 'lodash'
export default {
  name: 'Market',
  components: { createMarketForm },
  data() {
    return {
      streamOrderList: [],
      countOrderList: null,
      marketStatus: [],
      createVisible: false,
      value: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    getMarketStatus().then(res => {
      if (res.error.success) {
        this.marketStatus = res.result
      }
    })
  },
  methods: {
    handleCreateData(data) {
      console.log('postMarketInfo', data)
      postMarketInfo(data).then(res => {
        if (res.error.success) {
          this.createVisible = false
        }
      })
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './market.scss';
</style>

