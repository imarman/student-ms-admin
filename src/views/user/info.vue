<template>
  <div>
    <student-info v-if="role === 'STUDENT'" />
    <manager-info v-else />
  </div>
</template>

<script>
import managerInfo from '@/views/user/component/managerInfo'
import studentInfo from '@/views/user/component/studentInfo'

export default {
  components: {
    managerInfo,
    studentInfo
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
