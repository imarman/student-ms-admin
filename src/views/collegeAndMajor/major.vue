<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="专业名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入名称" clearable />
      </el-form-item>
      <el-form-item label="所属学院" prop="collegeId">
        <el-select v-model="queryForm.collegeId" placeholder="请选择学院" clearable>
          <el-option v-for="college in collegeList" :key="college.id" :label="college.name" :value="college.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="resetForm('queryForm')">重置</el-button>
      </el-form-item>
      <el-form-item v-if="role === 'ADMIN'">
        <el-button type="success" style="margin-left: 100px" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="majorList"
        border
        stripe
        width="100%"
      >
        <el-table-column
          type="index"
          prop="ID"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="name"
          label="专业名称"
          width="200"
        />
        <el-table-column
          prop="name"
          label="所属学院"
          width="200"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.collegeName" size="mini" type="default" round>{{
              scope.row.collegeName
            }}
            </el-button>
            <el-button v-if="!scope.row.collegeName" size="mini" type="danger" round>暂未所属学院</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="buildTime"
          label="成立时间"
          width="200"
        />
        <el-table-column
          prop="gmtModify"
          label="更新时间"
          width="200"
        />
        <el-table-column
          prop="gmtCreate"
          label="创建时间"
          width="200"
        />
        <el-table-column
          label="操作"
          width="140"
        >
          <template v-if="role === 'ADMIN'" slot-scope="scope">
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
        <el-form-item label="专业名称" label-width="120px">
          <el-input v-model="dialogForm.name" style="width: 300px" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所属学院" label-width="120px">
          <el-select v-model="dialogForm.collegeId" placeholder="请选择所属学院" clearable>
            <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="成立时间" label-width="120px">
          <div class="block">
            <el-date-picker
              v-model="dialogForm.buildTime"
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

import { getAll } from '@/api/college'
import { getAllMajor, deleteById, save } from '@/api/major'

export default {
  data() {
    return {
      role: this.$store.state.user.role,
      title: '修改专业信息',
      dialogVisible: false,
      queryForm: {
        name: '',
        collegeId: ''
      },
      dialogForm: {},
      collegeList: [],
      majorList: [],
      hidePage: false,
      current: 1,
      limit: 10,
      total: 10,
      pages: 10
    }
  },
  created() {
    this.getMajorList()
    this.getAllCollege()
  },
  methods: {
    async getAllCollege() {
      const resp = await getAll()
      this.collegeList = resp.data
    },
    async getMajorList() {
      const resp = await getAllMajor(this.current, this.limit, this.queryForm)
      this.majorList = resp.data.majorList
      this.total = Number(resp.data.total)
      if (this.pages <= 1 && this.total <= 5) {
        this.hidePage = true
      }
    },
    handleSizeChange(val) {
      this.limit = val
      this.getMajorList()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getMajorList()
    },
    search() {
      this.queryForm.current = this.current
      this.queryForm.limit = this.limit
      this.getMajorList()
    },
    handleClick(row) {
      this.title = '修改专业信息'
      this.dialogForm = { ...row }
      this.dialogVisible = true
      console.log(this.dialogForm)
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
            that.getMajorList()
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
        await this.getMajorList()
        this.dialogVisible = false
        this.resetDialogForm()
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }
    },
    addBtn() {
      this.title = '新增学院'
      this.resetDialogForm()
      this.dialogVisible = true
    },
    resetDialogForm() {
      this.dialogForm = {}
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getMajorList()
    }
  }
}
</script>

<style scoped>
el-form-item {
  margin-right: 20px;
}
</style>
