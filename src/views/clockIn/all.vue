<template>
  <div class="app-container">
    <el-form ref="queryForm" :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="queryForm.studentId" placeholder="请输入学号" clearable />
      </el-form-item>
      <el-form-item label="日期" prop="gmtCreate">
        <el-date-picker
          v-model="queryForm.gmtCreate"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="resetForm('queryForm')">重置</el-button>
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
          prop="studentName"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="grade"
          label="年级"
          width="120"
        />
        <el-table-column
          prop="morning"
          label="早上体温"
          width="120"
        />
        <el-table-column
          prop="moon"
          label="中午体温"
          width="120"
        />
        <el-table-column
          prop="night"
          label="晚上体温"
          width="120"
        />
        <el-table-column
          prop="gmtCreate"
          label="打卡时间"
          width="200"
        />
      </el-table>
    </div>

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
import { getList } from '@/api/clockIn'

export default {
  data() {
    return {
      tableData: [],
      hidePage: false,
      current: 1,
      limit: 10,
      total: 10,
      pages: 10,
      queryForm: {
        studentId: ''
      }
    }
  },
  created() {
    this.getAllCampus()
  },
  methods: {
    async getAllCampus() {
      console.log(this.queryForm)
      const response = await getList(this.current, this.limit, this.queryForm)
      this.tableData = response.data.dailyClockIns
      this.total = Number(response.data.total)
      if (this.pages <= 1 && this.total <= 5) {
        this.hidePage = true
      }
    },
    handleSizeChange(val) {
      this.limit = val
      this.getAllCampus()
    },
    handleCurrentChange(val) {
      this.current = val
      this.getAllCampus()
    },
    search() {
      this.getAllCampus()
    },
    resetForm() {
      this.$refs['queryForm'].resetFields()
      this.getAllCampus()
    }
  }
}
</script>

<style scoped>

</style>
