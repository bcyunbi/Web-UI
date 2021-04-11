<template>
  <div class="subscriptionForm">
    <el-form ref="form" :model="formData" label-width="100px">
      <el-col :span="24">
        <el-form-item label="基金帳號">
          <el-select v-model="formData.account_id" placeholder="請選擇" filterable>
            <el-option
              v-for="item in allFundList"
              :key="item.id"
              :label="item.account_id + '-' + item.subaccount"
              :value="item.account_id"
              @click.native="temp_key = item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col v-if="type === 'modify'" :span="11" :xs="24">
        <el-form-item label="啟用狀態">
          <el-switch
            v-model="formData.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="!formData.enabled"
          >
          </el-switch>
        </el-form-item>
      </el-col>
      <el-col v-if="type === 'modify'" :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="商品" prop="symbol">
          <el-select v-model="formData.symbol" placeholder="請選擇商品" style="width: 100%" @change="checkMargin">
            <el-option key="TXF" label="TXF" value="TXF" />
            <el-option key="MXF" label="MXF" value="MXF" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="配置資金">
          <el-tooltip effect="dark" :content="formData.allocated_funds / 10000 + '萬元'" placement="bottom-start">
            <el-input v-model.number="formData.allocated_funds" type="number"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="每口保證金">
          <el-tooltip effect="dark" :content="marginText" placement="bottom-start">
            <el-input v-model="formData.margin" type="number" :min="minMargin"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-col>

      <el-col :span="11" :xs="24">
        <el-form-item label="base_rate">
          <el-input v-model.number="formData.base_rate"></el-input>
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
      <el-col :span="11" :xs="24">
        <el-form-item label="交易所" prop="exchange">
          <el-select v-model="formData.exchange" placeholder="請選擇交易所" style="width: 100%">
            <el-option key="TAIFEX" label="TAIFEX" value="TAIFEX" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="2" class="line-col"><div class="line-col-div"></div></el-col>
      <el-col :span="11" :xs="24">
        <el-form-item label="策略" prop="strategy_id">
          <el-input v-model.number="formData.strategy_id" :min="1"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="dialog-btn-layout">
      <el-button v-if="type === 'create'" type="primary" @click="emitFormData">新增</el-button>
      <el-button v-else type="primary" @click="emitFormData">修改</el-button>
    </div>
  </div>
</template>

<script>
import { fetchFundList } from '@/api/fund'
import _ from 'lodash'
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
      formData: {},
      fundList: [],
      account_id: null,
      minMargin: 0,
      temp_key: null
    }
  },
  computed: {
    allFundList() {
      var _allFundList = _.chain(this.fundList)
        .map(el => {
          var item = {
            account_id: el.account_id,
            subaccount: el.subaccount,
            enabled: el.enabled,
            id: el.id
          }
          return item
        })
        .value()
      return _allFundList
    },
    marginText() {
      var _marginText = ''
      if (this.formData.allocated_funds > 0 && this.formData.margin > 0) {
        _marginText =
          this.formData.margin / 10000 +
          '萬元，共' +
          Math.floor(this.formData.allocated_funds / this.formData.margin) +
          '口'
      } else {
        _marginText = this.formData.margin / 10000 + '萬元'
      }
      return _marginText
    }
  },
  created() {},
  mounted() {
    fetchFundList().then(r => {
      this.fundList = r.result
    })
    if (this.type === 'modify') {
      this.formData = {
        account_id: this.modifyData.account_id,
        exchange: this.modifyData.exchange,
        symbol: this.modifyData.symbol,
        strategy_id: this.modifyData.strategy_id,
        allocated_funds: this.modifyData.allocated_funds,
        margin: this.modifyData.margin,
        order_mode: this.modifyData.order_mode
      }
    } else if (this.type === 'create') {
      this.formData = {
        account_id: '',
        exchange: '',
        symbol: '',
        strategy_id: 0,
        allocated_funds: 0,
        margin: 0,
        order_mode: '',
        base_rate: 0,
        subaccount: 'test'
      }
    }
  },
  methods: {
    checkMargin() {
      switch (this.formData.symbol) {
        case 'MXF':
          this.minMargin = 75000
          break
        case 'TXF':
          this.minMargin = 300000
          break
        default:
      }
      if (!this.formData.margin || this.formData.margin < this.minMargin) {
        this.formData.margin = this.minMargin
      }
    },
    emitFormData() {
      // this.formData.subaccount = _.find(this.allFundList, { id: this.temp_key }).subaccount
      this.$emit('emit-form', this.formData)
      console.log('emitFormData:::', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './subscriptionForm.scss';
</style>
