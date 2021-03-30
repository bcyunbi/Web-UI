<template>
  <el-form label-position="right" label-width="80px" :model="formData">
    <el-form-item label="名称">
      <el-input v-model.number="formData.account_id"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-input v-model="formData.subaccount"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
// import { fetchFundList, createFund } from '@/api/fund'
// import _ from 'lodash'
export default {
  name: 'FundForm',
  props: {
    fundList: {
      type: Array,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      formData: {
        account_id: 0,
        subaccount: ''
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    emitItemID(id) {
      this.$emit('item-id', id)
    }
  }
}
</script>

<style  lang="scss"  scoped>
@import './fund-form.scss';
</style>

