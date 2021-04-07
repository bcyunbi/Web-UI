<template>
  <div class="web-ui-page">
    <div class="web-ui-page__block">
      <div class="web-ui-title">取得標的清單</div>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="symbolList">
        <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
        <el-table-column prop="exchange" label="交易所" width="120" sortable></el-table-column>
        <el-table-column prop="pseudo_symbol" label="pseudo_symbol" width="120" sortable></el-table-column>
        <el-table-column prop="real_symbol" label="real_symbol" width="120" sortable></el-table-column>
        <el-table-column prop="created_at" label="建立時間" width="150"> </el-table-column>
        <el-table-column prop="updated_at" label="更新時間" width="150"> </el-table-column>
      </el-table>
    </div>
    <div class="web-ui-page__block">
      <div class="web-ui-title">取得標的切換清單</div>
      <el-button type="primary" icon="el-icon-plus" @click="createVisible = !createVisible">新增</el-button>
      <el-table style="width: 100%" max-height="400" highlight-current-row :data="symSwitchBolList">
        <el-table-column prop="id" label="id" width="80" sortable></el-table-column>
        <el-table-column prop="exchange" label="交易所" width="120" sortable></el-table-column>
        <el-table-column prop="pseudo_symbol" label="pseudo_symbol" width="120" sortable></el-table-column>
        <el-table-column prop="old_symbol" label="old_symbol" width="120" sortable></el-table-column>
        <el-table-column prop="new_symbol" label="new_symbol" width="120" sortable></el-table-column>
        <el-table-column prop="created_at" label="建立時間" width="150"> </el-table-column>
        <el-table-column prop="updated_at" label="更新時間" width="150"> </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增標的切換清單" :visible.sync="createVisible" width="80%">
      <create-symbol-form @emit-form="handleCreateData"></create-symbol-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchSymbolList, getSymbolSwitch, postSymbolSwitch } from '@/api/symbol'
import createSymbolForm from './createSymbolForm/createSymbolForm'
// import _ from 'lodash'
export default {
  name: 'Subscription',
  components: { createSymbolForm },
  data() {
    return {
      symbolList: [],
      symSwitchBolList: [],
      createVisible: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    fetchSymbolList().then(res => {
      if (res.error.success) {
        this.symbolList = res.result
      }
    })
    getSymbolSwitch().then(res => {
      if (res.error.success) {
        this.symSwitchBolList = res.result
      }
    })
  },
  methods: {
    handleCreateData(data) {
      console.log('handleCreateData', data)
      postSymbolSwitch(data).then(res => {
        if (res.error.success) {
          this.createVisible = false
        }
      })
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './symbol.scss';
</style>

