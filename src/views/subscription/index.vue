<template>
  <div class="subscription-page">
    <el-button type="primary" icon="el-icon-plus" @click="createSubVisible = !createSubVisible">新增</el-button>
    <el-dialog title="新增訂閱" :visible.sync="createSubVisible" width="80%">
      <subscription-form :type="'create'" @emit-form="handleCreateData"></subscription-form>
    </el-dialog>
    {{ subscriptionList }}
  </div>
</template>

<script>
import {
  fetchSubscriptionList,
  createSubscription,
  modifySubscription,
  getSubscriptionChanges
} from '@/api/subscription'
// import _ from 'lodash'
import subscriptionForm from './subscriptionForm/subscriptionForm'
export default {
  name: 'Subscription',
  components: { subscriptionForm },
  data() {
    return {
      subscriptionList: [],
      createSubVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    fetchSubscriptionList(res => {
      if (res.error.success) this.subscriptionList = res.result
    })
  },
  methods: {
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
@import './index.scss';
</style>

