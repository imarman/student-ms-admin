<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="queryForm.studentId" placeholder="请输入学号" clearable />
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
        :data="attendanceList"
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
          prop="studentName"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="className"
          label="课程"
          width="200"
        />
        <el-table-column
          prop="runTime"
          label="缺勤时间"
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
        <el-form-item label="学生" label-width="120px">
          <el-select
            v-model="dialogForm.studentId"
            placeholder="请选择学生"
            filterable
            clearable
            @change="changeStudentName($event)"
          >
            <el-option v-for="item in studentList" :key="item.id" :label="item.name" :value="item.studentId" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程" label-width="120px">
          <el-input v-model="dialogForm.className" style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="缺勤时间时间" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="dialogForm.runTime"
              type="datetime"
              placeholder="选择日期"
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
import { deleteById, getAllAttendance, save } from '@/api/attendance'
import { getAll } from '@/api/student'

export default {
  data() {
    return {
      isAdmin: this.$store.state.user.role,
      hidePage: false,
      current: 1,
      limit: 10,
      total: 10,
      pages: 10,

      // dialog
      title: '修改考勤信息',
      dialogVisible: false,
      dialogForm: {},
      stuId: '',

      // 通用
      queryForm: {},
      attendanceList: [],
      studentList: []
    }
  },
  created() {
    this.getAll()
    this.getAllStudent()
  },
  methods: {
    changeStudentName(val) {
      this.dialogForm.studentName = this.studentList.find(item => item.studentId === val).name
    },
    async getAllStudent() {
      const res = await getAll()
      this.studentList = res.data
    },
    handleSizeChange(val) {
      this.limit = val
      this.getStudentList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getStudentList()
    },
    async getAll() {
      const res = await getAllAttendance(this.current, this.pages, this.queryForm)
      this.attendanceList = res.data.attendanceList
      this.total = res.data.total
      if (this.pages <= 1 && this.total <= 5) {
        this.hidePage = true
      }
    },
    search() {
      this.getAll()
    },
    handleClick(row) {
      this.getAllStudent()
      this.title = '修改考勤信息'
      this.dialogForm = { ...row }
      this.stuId = this.dialogForm.studentId
      this.dialogVisible = true
    },
    addBtn() {
      this.getAllStudent()
      this.title = '新增考勤信息'
      this.stuId = ''
      this.resetDialogForm()
      this.dialogVisible = true
    },
    async submit() {
      const res = await save(this.dialogForm)
      if (res.success) {
        await this.getAll()
        this.dialogVisible = false
        this.resetDialogForm()
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }
    },
    deleteItem(row) {
      this.$confirm('此操作将永久删除【' + row.studentName + '】的考勤信息吗, 是否继续?', '提示', {
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
            that.getAll()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    resetDialogForm() {
      this.dialogForm = {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getAll()
    }
  }
}
</script>

<style scoped>

</style>
