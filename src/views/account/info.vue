<template>
  <div class="app-page">
    <header class="header">基础信息</header>
    <section class="section">
      <el-form :model="formData" :rules="rules" label-position="right" label-width="160px">
        <el-form-item label="用户头像：">
          <el-upload :action="baseUrl" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload"
            :headers="headers">
            <div class="img-wrap">
              <img v-if="formData.photo" :src="formData.photo" class="img" />
              <el-button size="mini" type="primary" class="btn">上传新图</el-button>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input v-model="formData.username" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="name">
          <el-input v-model="formData.username" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="formData.username" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="微信号：">
          <el-input v-model="formData.username" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="作业城市：" prop="city">
          <el-input v-model="formData.username" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号：" prop="aliPay">
          <el-input v-model="formData.username" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="">
          <div class="btn-wrap">
            <el-button type="primary">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单
      formData: {
        username: "", // 用户名
        name: "", // 真实姓名
        mobile: "", // 手机号
        weiChat: "", // 微信号
        city: "", // 作业城市
        aliPay: "", // 支付宝账号
        photo: "", // 用户头像
      },
      // 表单校验规则
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        city: [{ required: true, message: "请输入作业城市", trigger: "blur" }],
        aliPay: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" },
        ],
      },
      // 设置头部参数
      headers: {},
      // 上传文件地址
      baseUrl: "",
    };
  },
  methods: {
    // 文件上传成功
    uploadSuccess() {},
    // 限制文件类型
    beforeUpload() {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.header {
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #505050;
  position: relative;
  padding-left: 8px;
  margin-bottom: 20px;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background: #367afd;
    left: 0;
  }
}
.el-input {
  width: 550px;
}
.img-wrap {
  width: 121px;
  height: 121px;
  border: 1px dashed #d9d9d9;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  .btn {
    display: none;
    position: absolute;
    top: 45px;
    left: 18px;
  }
  &:hover {
    border-color: #409eff;
    .btn {
      display: block;
    }
  }
}
.btn-wrap {
  width: 550px;
  text-align: center;
  margin-top: 53px;
  .el-button {
    width: 350px;
    height: 50px;
    background: #367afd;
  }
}
</style>


