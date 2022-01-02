<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="queryForm.studentId" placeholder="请输入学号" type="number" clearable/>
      </el-form-item>
      <el-form-item label="申请类型" prop="type">
        <el-select v-model="queryForm.type" placeholder="请选择类型" clearable>
          <el-option v-for="item in typeList" :key="item.desc" :label="item.name" :value="item.desc"/>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryForm.status" placeholder="请选择状态" clearable>
          <el-option v-for="i in statusList" :key="i.desc" :label="i.name" :value="i.desc"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="resetForm('queryForm')">重置</el-button>
      </el-form-item>
    </el-form>

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
        prop="studentName"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="type"
        label="类型"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'scholarship'">资助</span>
          <span v-else-if="scope.row.type === 'leave'" style="color: #d29103">请假</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'applying'" type="primary" size="mini" round>申请中</el-button>
          <el-button v-else-if="scope.row.status === 'pass'" type="success" size="mini" round>通过</el-button>
          <el-button v-else-if="scope.row.status === 'rejected'" type="danger" size="mini" round>拒绝</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="申请时间"
        width="180"
      />
      <el-table-column
        v-if="role === 'TEACHER'"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="showMore(scope.row)">查看更多</el-button>
          <el-button v-if="scope.row.status === 'applying'" type="text" size="small" @click="resolve(scope.row, 'pass')">通过</el-button>
          <el-button v-if="scope.row.status === 'applying'" type="text" size="mini" @click="resolve(scope.row, 'rejected')">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="查看申请内容"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-form :model="dialogForm">
        <el-form-item v-if="dialogForm.type === 'scholarship'" label="资料" label-width="120px">
          <el-image style="width: 400px;" :src="dialogForm.pic"/>
        </el-form-item>
        <el-form-item v-else-if="dialogForm.type === 'leave'" label="请假时间" label-width="120px">
          {{ dialogForm.startTime }} 至 {{ dialogForm.endTime }}
        </el-form-item>
        <el-form-item label="申请内容" label-width="120px">
          {{ dialogForm.content }}
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-pagination
      style="margin-top: 20px"
      :current-page.sync="current"
      :page-size="pages"
      :page-sizes="[5, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :hide-on-single-page="total <= 5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList, changeStatus } from '@/api/apply'

export default {
  data() {
    return {
      dialogVisible: false,
      dialogForm: {},
      current: 1,
      limit: 10,
      total: 10,
      pages: 10,
      role: this.$store.state.user.role,
      queryForm: {},
      tableData: [],
      typeList: [
        {
          name: '请假申请',
          desc: 'leave'
        },
        {
          name: '资助申请',
          desc: 'scholarship'
        }
      ],
      statusList: [
        {
          name: '申请中',
          desc: 'applying'
        },
        {
          name: '通过',
          desc: 'pass'
        },
        {
          name: '未通过',
          desc: 'rejected'
        }
      ]
    }
  },
  created() {
    this.getAllApplying()
  },
  methods: {
    async getAllApplying() {
      const response = await getList(this.current, this.limit, this.queryForm)
      console.log(response)
      this.tableData = response.data.applyList
      this.total = Number(response.data.total)
    },
    handleSizeChange(val) {
      this.limit = val
      this.getAllApplying()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getAllApplying()
    },
    search() {
      this.getAllApplying()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getAllApplying()
    },
    showMore(row) {
      this.dialogVisible = true
      this.dialogForm = row
    },
    async resolve(row, status) {
      console.log(row.id, status)
      const data = { ... row }
      data.status = status
      const res = await changeStatus(data)
      if (res.success) {
        this.$message({
          type: 'success',
          message: res.message
        })
      }
      await this.getAllApplying()
    }
  }
}
</script>

<style scoped>

</style>
