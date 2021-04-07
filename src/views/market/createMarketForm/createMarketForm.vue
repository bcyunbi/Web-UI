
<template>
  <div class="createMarketForm">
    <el-form ref="form" :model="marketForm" label-width="100px">
      <el-col :span="11" :xs="24">
        <el-form-item label="交易所">
          <el-input v-model="marketForm.exchange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="symbol" prop="symbol">
          <el-input v-model="marketForm.symbol"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="dialog-btn-layout">
      <el-button type="primary" @click="emitMarketForm">新增</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateMarketForm',
  props: {},
  data() {
    return {
      marketForm: {}
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    emitMarketForm() {
      this.$emit('emit-form', this.marketForm)
      console.log('emitMarketForm:::', this.marketForm)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './createMarketForm.scss';
</style>
