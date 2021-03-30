<template>
  <div class="accountForm">
    <el-form ref="form" :model="formData" label-width="100px">
      <el-col :span="24">
        <el-form-item v-if="type === 'modify'" label="啟用狀態">
          <el-switch
            v-model="formData.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="!formData.enabled"
          >
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="卷商">
          <el-select
            v-model="formData.broker"
            class="filter-item"
            placeholder="請選擇券商"
            @change="getBrokerCode(formData.broker)"
          >
            <el-option key="Yuanta" label="元大" value="Yuanta" />
            <el-option key="KGI" label="KGI (總公司)" value="KGI" />
            <el-option key="KGI2" label="KGI2 (士林)" value="KGI2" />
            <el-option key="Capital" label="群益" value="Capital" />
            <el-option key="SinoPac" label="永豐" value="SinoPac" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="卷商code">
          <el-input v-model="formData.broker_code" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line-col"><div class="line-col-row"></div></el-col>

      <el-col :span="11" :xs="24">
        <el-form-item label="期貨帳號">
          <el-input v-model="formData.equity_account"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="期貨密碼">
          <el-input v-model="formData.equity_password"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line-col"><div class="line-col-row"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="下單帳號">
          <el-input v-model="formData.order_account"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="下單密碼">
          <el-input v-model="formData.order_password"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line-col"><div class="line-col-row"></div></el-col>

      <el-col :span="11" :xs="24">
        <el-form-item label="Equity 使用者">
          <el-input v-model="formData.ref_equity_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="order 使用者">
          <el-input v-model="formData.ref_order_id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="role">
          <el-input v-model="formData.role"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="IP">
          <el-input v-model="formData.ip_addr" placeholder="10.168.56.183"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <el-button v-if="type === 'create'" type="primary" @click="emitFormData">新增</el-button>
    <el-button v-else type="primary" @click="emitFormData">修改</el-button>
  </div>
</template>

<script>
export default {
  name: 'AccountForm',
  props: {
    type: {
      type: String,
      default: 'create' // modify
    },
    modifyData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    if (this.type === 'modify') {
      this.formData = {
        id: this.modifyData.id,
        ref_order_id: this.modifyData.ref_order_id,
        order_account: this.modifyData.order_account,
        order_password: this.modifyData.order_password,
        ref_equity_id: this.modifyData.ref_equity_id,
        equity_account: this.modifyData.equity_account,
        equity_password: this.modifyData.equity_password,
        broker_code: this.modifyData.broker_code,
        broker: this.modifyData.broker,
        ip_addr: this.modifyData.ip_addr,
        role: this.modifyData.role,
        enabled: this.modifyData.enabled
      }
    } else if (this.type === 'create') {
      this.formData = {
        ref_order_id: '',
        order_account: '',
        order_password: '',
        ref_equity_id: '',
        equity_account: '',
        equity_password: '',
        broker_code: '',
        broker: '',
        ip_addr: '',
        role: ''
      }
    }
  },
  methods: {
    getBrokerCode(broker) {
      let broker_code = ''
      if (broker) {
        switch (broker) {
          case 'Yuanta':
            broker_code = 'F021000'
            break
          case 'KGI':
            broker_code = 'F004000'
            break
          case 'KGI2':
            broker_code = 'F004011'
            break
          case 'Capital':
            broker_code = 'F020000'
            break
          case 'SinoPac':
            broker_code = 'F002000'
            break
        }
      }
      this.formData.broker_code = broker_code
    },
    emitFormData() {
      this.$emit('emit-form', this.formData)
      console.log('emitFormData:::', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './accountForm.scss';
</style>
