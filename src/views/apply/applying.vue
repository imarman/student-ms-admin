<template>
  <div class="app-container">
    <h3>资助申请</h3>
    <el-divider />
    <el-form ref="form" :model="form" :rules="rule" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="studentId" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.studentName" disabled />
      </el-form-item>
      <el-form-item label="申请理由" prop="content">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item label="证明材料" label-width="120px">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8090/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
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
      imageUrl: '',
      dateRange: '',
      studentId: '',
      id: this.$store.state.user.id,
      role: this.$store.state.user.role,
      form: {
        type: 'scholarship'
      },
      rule: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.pic = res.data.picUrl
    },
    beforeAvatarUpload(file) {
      const testMsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension =
        testMsg === 'jpg' ||
        testMsg === 'jpeg' ||
        testMsg === 'JPG' ||
        testMsg === 'JPEG' ||
        testMsg === 'png' ||
        testMsg === 'PNG'
      if (!extension) {
        this.$message({
          message: '上传图片只能是jpg / png 格式!',
          type: 'error'
        })
        return false // 必须加上return false; 才能阻止
      }
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
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
            this.$refs['form'].resetFields()
            this.imageUrl = ''
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
}

.avatar-uploader-icon:hover {
  border-color: #409EFF;
}

el-form-item {
  margin-right: 20px;
}
</style>
