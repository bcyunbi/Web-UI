<template>
  <div class="subscriptionForm">
    <el-form ref="form" :model="symbolForm" label-width="100px">
      <el-col :span="11" :xs="24">
        <el-form-item label="交易所">
          <el-input v-model="symbolForm.exchange"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="pseudo_symbol" prop="pseudo_symbol">
          <el-input v-model="symbolForm.pseudo_symbol"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="old_real_symbol" prop="old_real_symbol">
          <el-input v-model="symbolForm.old_real_symbol"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="new_real_symbol" prop="new_real_symbol">
          <el-input v-model="symbolForm.new_real_symbol"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="dialog-btn-layout">
      <el-button type="primary" @click="emitSymbolForm">新增</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionForm',
  props: {},
  data() {
    return {
      symbolForm: {}
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    emitSymbolForm() {
      this.$emit('emit-form', this.symbolForm)
      console.log('emitSymbolForm:::', this.symbolForm)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './createSymbolForm.scss';
</style>
