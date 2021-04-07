<template>
  <div class="subscription-page web-ui-page">
    <div class="web-ui-page__block">
      <div class="web-ui-title">訂閱清單</div>
      <el-button type="primary" icon="el-icon-plus" @click="createSubVisible = !createSubVisible">新增</el-button>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="subscriptionList">
        <el-table-column label="啟用" width="80">
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
        <el-table-column prop="id" label="排序" width="80" sortable></el-table-column>
        <el-table-column prop="account_id" label="帳號ID" width="120" sortable></el-table-column>
        <el-table-column prop="fund_id" label="基金ID" width="120" sortable></el-table-column>
        <el-table-column prop="strategy_id" label="策略ID" width="120" sortable></el-table-column>
        <el-table-column prop="exchange" label="exchange" width="120" sortable></el-table-column>
        <el-table-column prop="symbol" label="商品" width="120" sortable></el-table-column>
        <el-table-column prop="margin" label="每口保證金" width="120" sortable></el-table-column>
        <el-table-column prop="allocated_funds" label="配置資金" width="120" sortable></el-table-column>
        <el-table-column prop="base_rate" label="base_rate" width="120" sortable></el-table-column>
        <el-table-column prop="order_mode" label="進場模式" width="120" sortable></el-table-column>
        <el-table-column prop="subaccount" label="帳號名字" width="120"> </el-table-column>
        <el-table-column prop="created_at" label="建立時間" width="150"> </el-table-column>
        <el-table-column prop="updated_at" label="更新時間" width="150"> </el-table-column>
        <el-table-column fixed="right" label="" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="modifySub(scope.row)">修改訂閱</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增訂閱" :visible.sync="createSubVisible" width="80%">
      <subscription-form :type="'create'" @emit-form="handleCreateData"></subscription-form>
    </el-dialog>
    <el-dialog title="修改訂閱" :visible.sync="createSubVisible" width="80%">
      <subscription-form :modify-data="beforeModify" :type="'modify'" @emit-form="handleModifyData"></subscription-form>
    </el-dialog>
    <div class="web-ui-page__block">
      <div class="web-ui-title">訂閱修改紀錄</div>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="subscriptionHistory">
        <el-table-column prop="id" label="排序" width="80" sortable></el-table-column>
        <el-table-column prop="changed_at" label="更改時間" width="120" sortable></el-table-column>
        <el-table-column prop="old_subscription_id" label="舊策略ID" width="120" sortable></el-table-column>
        <el-table-column prop="new_subscription_id" label="新策略ID" width="120" sortable></el-table-column>
        <el-table-column prop="old_fund_id" label="舊基金ID" width="120" sortable></el-table-column>
        <el-table-column prop="new_fund_id" label="新基金ID" width="120" sortable></el-table-column>
        <el-table-column prop="old_margin" label="舊保證金" width="120" sortable></el-table-column>
        <el-table-column prop="new_margin" label="新保證金" width="120" sortable></el-table-column>
        <el-table-column prop="old_allocated_funds" label="舊資金" width="120" sortable></el-table-column>
        <el-table-column prop="new_allocated_funds" label="新資金" width="120" sortable></el-table-column>
        <el-table-column prop="old_enabled" label="舊啟用狀態" width="120" sortable></el-table-column>
        <el-table-column prop="new_enabled" label="新啟用狀態" width="120" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  fetchSubscriptionList,
  createSubscription,
  modifySubscription,
  getSubscriptionChanges
} from '@/api/subscription'
import _ from 'lodash'
import subscriptionForm from './subscriptionForm/subscriptionForm'
export default {
  name: 'Subscription',
  components: { subscriptionForm },
  data() {
    return {
      subscriptionList: [],
      createSubVisible: false,
      beforeModify: {},
      subscriptionHistory: []
    }
  },
  computed: {},
  watch: {},
  created() {
    fetchSubscriptionList()
  },
  mounted() {
    fetchSubscriptionList().then(res => {
      console.log('fetchSubscriptionList')

      if (res.error.success) this.subscriptionList = res.result
      if (_.isNull(this.subscriptionList)) {
        this.subscriptionList = [
          {
            account_id: 1,
            exchange: 'string',
            symbol: 'string',
            strategy_id: 1,
            allocated_funds: 164,
            margin: 1,
            order_mode: 'string'
          }
        ]
      }
      console.log('res.error.success::', res.error.success)
      // if (_.isNull(this.subscriptionList)) {
    })
    getSubscriptionChanges().then(res => {
      if (res.error.success) this.subscriptionHistory = res.result
    })
  },
  methods: {
    modifySub(row) {
      console.log('modifySub::', row)
      this.beforeModify = row
      this.createSubVisible = true
    },
    handleModifyData(data) {
      console.log('handleModifyData', data)
      var putData = {
        sub_id: data.account_id, // test
        payload: {
          margin: data.margin,
          allocated_funds: data.allocated_funds,
          base_rate: data.base_rate,
          order_mode: data.order_mode,
          enabled: data.enabled
        }
      }
      modifySubscription(putData)
        .then(res => {
          if (res.error.success) {
            this.$message({
              type: 'success',
              message: '修改訂閱成功'
            })
          }
          this.createDialogVisible = false
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '修改訂閱未成功'
          })
        })
    },
    handleCreateData(data) {
      console.log('handleCreateData', data)
      createSubscription(data)
        .then(res => {
          if (res.error.success) {
            this.$message({
              type: 'success',
              message: '創建訂閱成功'
            })
          }
          this.createDialogVisible = false
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '創建訂閱未成功'
          })
        })
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './subscription.scss';
</style>

