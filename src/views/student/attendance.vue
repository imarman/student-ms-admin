<template>
  <div class="app-container">
    考勤记录
  </div>
</template>

<script>
import { getAllAttendance } from '@/api/attendance'

export default {
  data() {
    return {
      pages: 10,
      limit: 10,
      attendanceList: []
    }
  },
  created() {
    this.getAll()
  },
  methods: {
    async getAll() {
      const res = await getAllAttendance(1, 10)
      this.attendanceList = res.data.attendanceList
      this.pages = res.data.pages
      this.limit = res.data.limit
    }
  }
}
</script>

<style scoped>

</style>
