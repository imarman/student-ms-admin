<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rule" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="form.sttudentId" disabled />
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade" disabled />
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="form.tel" type="number" />
      </el-form-item>
      <el-form-item label="早上体温" prop="morning">
        <el-input v-model="form.morning" />
      </el-form-item>
      <el-form-item label="中午体温">
        <el-input v-model="form.moon" />
      </el-form-item>
      <el-form-item label="晚上体温">
        <el-input v-model="form.night" />
      </el-form-item>
      <el-form-item label="身体其他不适">
        <el-input v-model="form.other" />
      </el-form-item>
      <el-form-item label="当前所在位置">
        <el-select v-model="form.region" placeholder="请选择当前所在位置">
          <el-option label="校外" value="校外" />
          <el-option label="校内" value="校内" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      rule: {
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        morning: [
          { required: true, message: '请输入早上体温', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 500px;
}
</style>
