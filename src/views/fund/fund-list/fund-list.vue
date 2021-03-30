<template>
  <div v-if="fundList" class="fund-list">
    <div v-for="(item, index) in fundList" :key="index" class="fund-list__item" @click="emitItemID(item.id)">
      <div class="item">
        <div>{{ item.account_id }}</div>
        <div>{{ item.subaccount }}</div>
      </div>
      <div>
        {{ item.updated_at }}
      </div>
    </div>
    <div class="fund-list__create">
      <div class="create__btn"><span>新增</span></div>
    </div>
  </div>
</template>

<script>
// import { fetchFundList, createFund } from '@/api/fund'
// import _ from 'lodash'
export default {
  name: 'FundList',
  props: {
    fundList: {
      type: Array,
      default() {
        return null
      }
    }
  },
  data() {
    return {}
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
@import './fund-list.scss';
</style>

