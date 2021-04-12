<template>
  <div class="fund-page web-ui-page">
    <div class="web-ui-page__block">
      <div class="web-ui-title">基金清單</div>
      <div class="fund-page__funtional-block">
        <div class="fund-page__create">
          <div class="create__btn">
            <el-button type="primary" @click="createDialogVisible = true">新增基金</el-button>
          </div>
        </div>
        <div>
          <el-select v-model="search" placeholder="請選擇" filterable>
            <el-option
              v-for="item in allFundList"
              :key="item.id"
              :label="item.account_id + '-' + item.subaccount"
              :value="item.subaccount"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-if="pagedTableData" class="fund-page__table">
        <el-table
          style="width: 100%"
          highlight-current-row
          :data="pagedTableData.filter(data => !search || data.subaccount.toLowerCase().includes(search.toLowerCase()))"
        >
          <el-table-column label="啟用" width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                disabled
                @click="!scope.row.enabled"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="排序" width="80" sortable></el-table-column>
          <el-table-column prop="account_id" label="帳號ID" width="120" sortable></el-table-column>
          <el-table-column prop="subaccount" label="帳號名字" width="120"> </el-table-column>
          <el-table-column prop="created_at" label="建立時間" width="150"> </el-table-column>
          <el-table-column prop="updated_at" label="更新時間" width="150"> </el-table-column>
        </el-table>
        <div class="web-ui-pagination">
          <el-pagination layout="prev, pager, next" :total="allFundList.length" @current-change="setPage">
          </el-pagination>
        </div>
      </div>

      <el-dialog title="新增資料" :visible.sync="createDialogVisible" width="80%">
        <el-form label-position="right" label-width="80px" :model="createFundData">
          <el-form-item label="帳號ID" required>
            <el-input v-model.number="createFundData.account_id" type="number" :min="1"></el-input>
          </el-form-item>
          <el-form-item label="帳號名稱">
            <el-input v-model="createFundData.subaccount" type="text"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" :disabled="!createFundData.account_id" @click="handelCreateFund">新增基金</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// createFund
import { fetchFundList, createFund } from '@/api/fund'
import _ from 'lodash'
export default {
  data() {
    return {
      fundList: [],
      value: null,
      windowSize: 0,
      createDialogVisible: false,
      createFundData: {
        account_id: 0,
        subaccount: ''
      },
      search: '',
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    pagedTableData() {
      if (this.allFundList) {
        return this.allFundList.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      } else return null
    },
    allFundList() {
      var _allFundList = _.chain(this.fundList)
        .map(el => {
          var json_date = new Date(el.enabled).toJSON()
          var formatDate = new Date(new Date(json_date)).toISOString().substr(0, 10)
          var item = {
            account_id: el.account_id,
            subaccount: el.subaccount,
            enabled: el.enabled,
            updated_at: formatDate,
            id: el.id
          }
          return item
        })
        .value()
      console.log('_allFundList', _allFundList)
      return _allFundList
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.getFundList()
  },
  methods: {
    setPage(val) {
      this.page = val
    },
    async getFundList() {
      await fetchFundList().then(r => {
        this.fundList = r.result
      })
    },
    onResize() {
      this.windowSize = window.innerWidth
    },
    clickCreateBtn() {
      this.createDialogVisible = true
    },
    handelCreateFund() {
      console.log('createFundData', this.createFundData)
      createFund(this.createFundData)
        .then(res => {
          if (res.error.success) {
            this.$message({
              type: 'success',
              message: '創建成功'
            })
          }
          this.createDialogVisible = false
          this.getFundList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '創建未成功'
          })
        })
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './fund.scss';
</style>

