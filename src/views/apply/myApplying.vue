<template>
  <div class="app-container">
    <h3>请假申请列表</h3>
    <el-divider />
    <el-table
      :data="tableData"
      border
      stripe
    >
      <el-table-column
        type="index"
        prop="ID"
        label="序号"
        width="80"
      />
      <el-table-column
        prop="studentName"
        label="姓名"
        width="120"
      />
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
        prop="type"
        label="类型"
        width="120"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type === 'scholarship'">申请资助</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="申请时间"
        width="200"
      />
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">查看内容</el-button>
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
        <el-form-item v-if="dialogForm.pic" label="" label-width="120px">
          <el-image style="width: 400px;" :src="dialogForm.pic" />
        </el-form-item>
        <el-form-item label="" label-width="120px">
          {{ dialogForm.content }}
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getMyList } from '@/api/apply'

export default {
  data() {
    return {
      dialogVisible: false,
      id: this.$store.state.user.id,
      role: this.$store.state.user.role,
      tableData: [],
      dialogForm: {},
      type: 'scholarship'
    }
  },
  created() {
    if (this.role === 'STUDENT') {
      this.getList()
    }
  },
  methods: {
    handleClick(row) {
      this.dialogVisible = true
      this.dialogForm = row
    },
    async getList() {
      const response = await getMyList(this.id, this.type)
      if (response.data != null) {
        console.log(response.data)
        this.tableData = response.data
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 800px;
}
</style>
