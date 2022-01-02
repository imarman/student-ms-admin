<template>
  <div class="dashboard-container">
<!--    <div class="dashboard-text">name: {{ name }}</div>-->
<!--    <div class="dashboard-text">role: {{ role }}</div>-->
<!--    <div class="dashboard-text">id: {{ id }}</div>-->
    <div class="tmp">
      <h1 class="title">学 生 管 理 平 台</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'role',
      'id'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.tmp {
  margin: 0 auto;
}
.title {
  text-align: center;
  //border: 1px solid red;
  //margin: auto auto;
}
</style>
