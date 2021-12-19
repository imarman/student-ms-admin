<template>
  <div>
    <student-pwd v-if="role === 'STUDENT'" />
    <manage-pwd v-else />
  </div>
</template>

<script>
import managePwd from '@/views/user/component/managePwd'
import studentPwd from '@/views/user/component/studentPwd'

export default {
  components: {
    managePwd,
    studentPwd
  },
  data() {
    return {
      role: this.$store.state.user.role
    }
  }
}
</script>

<style scoped>

</style>
