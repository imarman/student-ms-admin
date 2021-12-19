<template>
  <div class="app-container u-center">
    <el-form :model="dialogForm">
      <el-form-item label="ID" label-width="120px">
        <el-input v-model="dialogForm.id" disabled style="width: 300px" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学号" label-width="120px">
        <el-input v-model="dialogForm.studentId" disabled style="width: 300px" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像" label-width="120px">
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
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="dialogForm.name" style="width: 300px" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" label-width="120px">
        <el-radio v-model="dialogForm.gender" label="男">男</el-radio>
        <el-radio v-model="dialogForm.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="年级" label-width="120px">
        <el-button size="small" type="default">{{ dialogForm.grade }}</el-button>
      </el-form-item>
      <el-form-item label="学院" label-width="120px">
        <el-button size="small" type="warning" round>{{ dialogForm.collegeName }}</el-button>
      </el-form-item>
      <el-form-item label="专业" label-width="120px">
        <el-button size="small" type="warning" round>{{ dialogForm.majorName }}</el-button>
      </el-form-item>
      <el-form-item label="手机号" label-width="120px">
        <el-input v-model="dialogForm.mobile" type="number" style="width: 300px" autocomplete="off" />
      </el-form-item>
      <el-form-item label="注册时间" label-width="120px">
        <el-date-picker
          v-model="dialogForm.admissionTime"
          type="datetime"
          disabled
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">修 改</el-button>
    </span>
  </div>
</template>

<script>
import { getStudentInfo, updateStudentInfo } from '@/api/userCenter'

export default {
  data() {
    return {
      role: this.$store.state.user.role,
      id: this.$store.state.user.id,
      imageUrl: '',
      dialogForm: {}
    }
  },
  created() {
    this.userInfo()
  },
  methods: {
    async submit() {
      this.dialogForm.role = this.role
      const res = await updateStudentInfo(this.dialogForm)
      this.$message.success(res.message)
    },
    async userInfo() {
      const res = await getStudentInfo(this.id)
      this.dialogForm = res.data
      this.imageUrl = this.dialogForm.avatar
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.dialogForm.avatar = res.data.picUrl
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
    }
  }
}
</script>

<style scoped>
.u-center {
  margin: 50px 600px;
}
.dialog-footer  {
  margin-left: 345px;
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
