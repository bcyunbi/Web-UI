<template>
  <div class="subscriptionForm">
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
        <el-form-item label="每口保證金">
          <el-input v-model="formData.margin"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="配置資金">
          <el-input v-model="formData.allocated_funds"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="line-col"><div class="line-col-row"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="base_rate">
          <el-input v-model="formData.base_rate"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="進場模式" prop="order_mode">
          <el-select v-model="formData.order_mode" class="filter-item" placeholder="請選擇進場模式" style="width: 100%">
            <el-option key="normal" label="馬上進場" value="normal" />
            <el-option key="wait-zero-passed" label="等待過 0 進場" value="wait-zero-passed" />
            <el-option key="base-rate" label="Base Rate 進場" value="base-rate" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-form>
    <el-button v-if="type === 'create'" type="primary" @click="emitFormData">新增</el-button>
    <el-button v-else type="primary" @click="emitFormData">修改</el-button>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionForm',
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
@import './subscriptionForm.scss';
</style>
