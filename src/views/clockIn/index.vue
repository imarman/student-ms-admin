<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rule" :disabled="formDisable" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="form.studentId" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.studentName" disabled />
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade" disabled />
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="form.tel" type="number" />
      </el-form-item>
      <el-form-item label="早上体温" prop="morning">
        <el-input v-model="form.morning" type="number" />
      </el-form-item>
      <el-form-item label="中午体温" prop="moon">
        <el-input v-model="form.moon" type="number" />
      </el-form-item>
      <el-form-item label="晚上体温" prop="night">
        <el-input v-model="form.night" type="number" />
      </el-form-item>
      <el-form-item label="身体其他不适">
        <el-input v-model="form.other" />
      </el-form-item>
      <el-form-item label="当前所在位置" prop="region">
        <el-select v-model="form.region" placeholder="请选择当前所在位置">
          <el-option label="校外" value="校外" />
          <el-option label="校内" value="校内" />
        </el-select>
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
import { getTodayInfo, save } from '@/api/clockIn'

export default {
  data() {
    return {
      id: this.$store.state.user.id,
      role: this.$store.state.user.role,
      formDisable: false,
      form: {},
      rule: {
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        morning: [
          { required: true, message: '请输入早上体温', trigger: 'blur' }
        ],
        moon: [
          { required: true, message: '请输入中午体温', trigger: 'blur' }
        ],
        night: [
          { required: true, message: '请输入晚上体温', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择校区', trigger: 'blur' }
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
    async getTodayClockIn() {
      const response = await getTodayInfo(this.form.studentId)
      if (response.data != null) {
        this.form = { ...response.data }
        this.formDisable = true
      }
    },
    async getStudentInfoById() {
      const res = await getById(this.id)
      this.form.studentId = res.data.studentId
      this.form.studentName = res.data.name
      this.form.grade = res.data.grade
      await this.getTodayClockIn(res.data.studentId)
    },
    async onSubmit() {
      try {
        const valid = await this.$refs['form'].validate()
        if (valid) {
          const resp = await save(this.form)
          if (resp.code === 99999) {
            this.$message({
              type: 'success',
              message: '打卡成功'
            })
            this.formDisable = true
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
