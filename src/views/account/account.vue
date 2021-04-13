<template>
  <div class="account-page web-ui-page">
    <div class="web-ui-page__block">
      <div class="web-ui-title">帳戶清單</div>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <el-table :data="pagedAccountData" style="width: 100%" highlight-current-row>
        <el-table-column fixed prop="id" label="ID" width="80" sortable> </el-table-column>
        <el-table-column prop="broker" label="broker姓名" width="120"> </el-table-column>
        <el-table-column prop="broker_code" label="省份" width="120"> </el-table-column>
        <el-table-column prop="created_at" label="建立時間" width="120"> </el-table-column>
        <el-table-column prop="equity_account" label="期貨帳號" width="120"> </el-table-column>
        <el-table-column prop="equity_password" label="期貨密碼" width="120"> </el-table-column>
        <el-table-column prop="host_id" label="期貨商" width="120"> </el-table-column>
        <el-table-column prop="ip_addr" label="ip位址" width="120"> </el-table-column>
        <el-table-column prop="lease_at" label="更新時間" width="120"> </el-table-column>
        <el-table-column prop="order_account" label="期貨帳號" width="120"> </el-table-column>
        <el-table-column prop="order_password" label="期貨密碼" width="120"> </el-table-column>
        <el-table-column prop="ref_equity_id" label="ref_equity_id" width="120"> </el-table-column>
        <el-table-column prop="ref_order_id" label="ref_order_id" width="120"> </el-table-column>
        <el-table-column prop="role" label="權限" width="120"> </el-table-column>
        <el-table-column prop="status" label="狀態" width="120"> </el-table-column>
        <el-table-column prop="tenant" label="邮编" width="120"> </el-table-column>
        <el-table-column prop="updated_at" label="更新時間" width="120"> </el-table-column>
        <el-table-column fixed="right" label="啟用" width="100">
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
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="web-ui-pagination">
        <el-pagination layout="prev, pager, next" :total="accountData.length" @current-change="setPage">
        </el-pagination>
      </div>
      <el-dialog title="修改資料" :visible.sync="editDialogVisible" width="80%">
        <account-form :type="'modify'" :modify-data="formData" @emit-form="handleModifyData"></account-form>
      </el-dialog>
      <el-dialog title="新增資料" :visible.sync="createDialogVisible" width="80%">
        <account-form :type="'create'" @emit-form="handleCreateData"></account-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fetchAccountList, modifyAccount, createAccount } from '@/api/account'
import accountForm from './components/accountForm'

export default {
  name: 'Account',
  components: { accountForm },
  data() {
    return {
      accountData: [],
      page: 1,
      pageSize: 10,
      editDialogVisible: false,
      createDialogVisible: false,
      formData: {
        broker: 'broker',
        broker_code: 'broker_code',
        created_at: 'created_at',
        enabled: false,
        equity_account: 'equity_account',
        equity_password: 'AAAAA',
        host_id: 15,
        id: 0,
        ip_addr: 'AAAAA',
        lease_at: '2021-03-28T22:24:43.355131746+08:00',
        order_account: 'AAAAA',
        order_password: 'AAAAA',
        ref_equity_id: 'ref_equity_id',
        ref_order_id: 'ref_order_id',
        role: 'role',
        status: 'status',
        tenant: 'tenant',
        updated_at: 'updated_at'
      }
    }
  },
  computed: {
    pagedAccountData() {
      if (this.accountData) {
        return this.accountData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      } else return null
    }
  },
  mounted() {
    this.getAccountList()
  },
  methods: {
    setPage(val) {
      this.page = val
    },
    async getAccountList() {
      await fetchAccountList().then(r => {
        this.accountData = r.result
        console.log('accountData', this.accountData.length)
      })
    },
    handleModifyData(data) {
      console.log('handleModifyData', data)
      this.editDialogVisible = false
      var apiData = {
        account_id: data.id,
        payload: data
      }
      modifyAccount(apiData)
        .then(res => {
          if (res.error.success) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
          this.editDialogVisible = false
          this.getAccountList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '修改未成功'
          })
        })
    },
    handleCreateData(data) {
      console.log('handleModifyData', data)
      createAccount(data)
        .then(res => {
          if (res.error.success) {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
          }
          this.createDialogVisible = false
          this.getAccountList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '新增未成功'
          })
        })
    },
    handleAdd() {
      this.createDialogVisible = !this.createDialogVisible
    },
    handleEdit(index, item) {
      this.formData = item
      console.log('handleEdit', this.formData)
      this.editDialogVisible = true
    }
    // changeSwitch(row) {
    //   const data = {
    //     id: row.id,
    //     status: row.status
    //   }
    //   this.$api
    //     .accountSwitch(data)
    //     .then(res => {
    //       if (res.code === '200' || res.code === 200) {
    //         this.getTableData()
    //       } else {
    //         this.$message.error(res.msg)
    //         this.getTableData()
    //       }
    //       this.loading = false
    //     })
    //     .catch({})
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/style-import.scss';
.account-page {
  max-width: 1200px;
}
</style>
