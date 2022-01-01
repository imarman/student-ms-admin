<template>
  <div class="app-container">
    <h3>请假申请</h3>
    <el-divider/>
    <el-form ref="form" :model="form" :rules="rule" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="studentId" disabled/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.studentName" disabled/>
      </el-form-item>
      <el-form-item label="请假时间" prop="dateRange">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="changeRange"
        />
      </el-form-item>
      <el-form-item label="请假事由" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item v-if="role === 'STUDENT'">
        <el-button type="primary" @click="onSubmit">提 交</el-button>
        <el-button>取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getById } from '@/api/student'
import { save } from '@/api/apply'

export default {
  data() {
    return {
      dateRange: '',
      studentId: '',
      id: this.$store.state.user.id,
      role: this.$store.state.user.role,
      formDisable: false,
      form: {
        type: 'leave'
      },
      rule: {
        content: [
          { required: true, message: '请输入事由', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.role === 'STUDENT') {
      this.getStudentInfoById()
    }
  },
  methods: {
    // async getTodayClockIn() {
    //   const response = await getTodayInfo(this.form.studentId)
    //   if (response.data != null) {
    //     this.form = { ...response.data }
    //     this.formDisable = true
    //   }
    // },
    changeRange(val) {
      this.form.startTime = val[0]
      this.form.endTime = val[1]
    },
    async getStudentInfoById() {
      const res = await getById(this.id)
      this.form.stuId = res.data.id
      this.studentId = res.data.studentId
      this.form.studentName = res.data.name
    },
    async onSubmit() {
      try {
        const valid = await this.$refs['form'].validate()
        if (valid) {
          const resp = await save(this.form)
          if (resp.code === 99999) {
            this.$message({
              type: 'success',
              message: '申请成功'
            })
            this.formDisable = true
            this.$refs['form'].resetFields()
            this.dateRange = []
            this.form.startTime = ''
            this.form.endTime = ''
          }
        }

      } catch (e) {
        console.log('error submit!!')
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 500px;
}
</style>
