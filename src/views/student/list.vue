<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="queryForm.studentId" placeholder="请输入学号" clearable />
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="queryForm.grade" placeholder="请选择年级" clearable>
          <el-option v-for="item in gradeOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="所在学院" prop="college">
        <el-select v-model="queryForm.college" placeholder="请选择学院" clearable>
          <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-select v-model="queryForm.major" placeholder="请选择专业" clearable>
          <el-option v-for="item in majorList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="resetForm('queryForm')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isAdmin" type="success" style="margin-left: 100px" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        border
        stripe
        width="100%"
      >
        <el-table-column
          type="index"
          prop="ID"
          label="序号"
          width="80"
        >
          <template slot-scope="scope">
            <span>{{ (current - 1) * limit + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentId"
          label="学号"
          width="120"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="gender"
          label="性别"
          width="120"
        />
        <el-table-column
          prop="collegeName"
          label="所在学院"
          width="200"
        />
        <el-table-column
          prop="majorName"
          label="专业"
          width="200"
        />
        <el-table-column
          prop="grade"
          label="年级"
          width="120"
        />
        <el-table-column
          prop="room"
          label="宿舍"
          width="120"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120"
        />
        <el-table-column
          prop="admissionTime"
          label="入学时间"
          width="200"
        />
        <el-table-column
          prop="gmtModified"
          label="更新时间"
          width="200"
        />
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
          width="200"
        />
        <el-table-column
          v-if="isAdmin"
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-form :model="dialogForm">
        <el-form-item v-if="dialogForm.id" label="ID" label-width="120px">
          <el-input v-model="dialogForm.id" disabled style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学号" label-width="120px">
          <el-input v-model="dialogForm.studentId" :disabled="stuId != ''" style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学生姓名" label-width="120px">
          <el-input v-model="dialogForm.name" style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学生头像" label-width="120px">
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
        <el-form-item label="学院" label-width="120px">
          <el-select v-model="dialogForm.college" placeholder="请选择学院" clearable @change="changeOptions">
            <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" label-width="120px">
          <el-select v-model="dialogForm.major" placeholder="请选择专业" clearable @change="changeMajor">
            <el-option v-for="item in collMajor" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级" label-width="120px">
          <el-select v-model="dialogForm.grade" placeholder="请选择年级" clearable>
            <el-option v-for="item in gradeOptions" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-radio v-model="dialogForm.gender" label="男">男</el-radio>
          <el-radio v-model="dialogForm.gender" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="dialogForm.mobile" type="number" style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍" label-width="120px">
          <el-input v-model="dialogForm.room" style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入学时间" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="dialogForm.admissionTime"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </span>
    </el-dialog>

    <el-pagination
      style="margin-top: 20px"
      :current-page.sync="current"
      :page-size="pages"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="hidePage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      />

    </el-pagination>
  </div>
</template>
<script>

import { getAllStudent, save, deleteById } from '@/api/student'

import { getAll } from '@/api/college'
import { getAllMajor, listByCollege } from '@/api/major'

export default {
  data() {
    return {
      welfareForm: {},
      isAdmin: this.$store.state.user.role.split(',').indexOf('ADMIN' +
        '') !== -1,
      title: '修改学生信息',
      imageUrl: '',
      stuId: '',
      dialogVisible: false,
      hidePage: false,
      current: 1,
      limit: 10,
      total: 10,
      pages: 10,
      queryForm: {
        name: '',
        grade: '',
        college: '',
        major: ''
      },
      tableData: [],
      dialogForm: {
        gender: '男'
      },

      collMajor: [],
      collegeList: [],
      majorList: [],
      gradeOptions: [
        { id: 1, name: '大一' },
        { id: 2, name: '大二' },
        { id: 3, name: '大三' },
        { id: 4, name: '大四' }
      ]
    }
  },
  created() {
    this.getStudentList()
    this.getAllCollege()
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val
      this.getStudentList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getStudentList()
    },
    async getStudentList() {
      const response = await getAllStudent(this.current, this.limit, this.queryForm)
      this.tableData = response.data.studentList
      this.total = Number(response.data.total)
      if (this.pages <= 1 && this.total <= 5) {
        this.hidePage = true
      }
    },
    async getAllCollege() {
      const res = await getAll()
      const res2 = await getAllMajor(1, 100)
      this.collegeList = res.data
      this.majorList = res2.data.majorList
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.dialogForm.avatar = res.data.picUrl
    },
    changeOptions(val) {
      this.dialogForm.major = ''
      this.coMo(val)
    },
    async coMo(val) {
      const data = {
        'collegeId': val
      }
      const resp = await listByCollege(data)
      this.collMajor = resp.data
    },
    changeMajor(val) {
      this.$forceUpdate()
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
    search() {
      this.getStudentList()
    },
    handleClick(row) {
      this.title = '修改学生信息'
      this.dialogForm = { ...row }
      this.imageUrl = this.dialogForm.avatar
      this.stuId = this.dialogForm.studentId
      this.coMo(this.dialogForm.college)
      this.dialogVisible = true
    },
    deleteItem(row) {
      this.$confirm('此操作将永久删除【' + row.name + '】的信息吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除
        const that = this
        deleteById(row.id).then(resp => {
          if (resp.success) {
            this.$message({
              type: 'success',
              message: resp.message
            })
            that.getStudentList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async submit() {
      const res = await save(this.dialogForm)
      if (res.success) {
        await this.getStudentList()
        this.dialogVisible = false
        this.resetDialogForm()
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }
    },
    addBtn() {
      this.title = '新增学生'
      this.stuId = ''
      this.resetDialogForm()
      this.dialogVisible = true
    },
    resetDialogForm() {
      this.imageUrl = ''
      this.dialogForm = { gender: '男' }
      this.collMajor = []
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getStudentList()
    }
  }
}
</script>

<style scoped>
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
