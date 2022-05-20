<template>
  <div class="app-page">
    <header class="header">基础信息</header>
    <section class="section">
      <el-form ref="form" :model="formData" :rules="rules" label-position="right" label-width="160px">
        <el-form-item label="用户头像：">
          <el-upload accept=".jpg,.png" :action="baseUrl" :show-file-list="false" :on-success="uploadSuccess"
            :before-upload="beforeUpload" :headers="headers">
            <div class="img-wrap">
              <img v-if="formData.head" :src="formData.head" class="img" />
              <el-button size="mini" type="primary" class="btn">上传新图</el-button>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="真实姓名：" prop="real_name">
          <el-input v-model="formData.real_name" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input v-model="formData.phone" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="微信号：">
          <el-input v-model="formData.wx" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="作业城市：" prop="city">
          <el-input v-model="formData.city" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="支付宝账号：" prop="pay_account">
          <el-input v-model="formData.pay_account" maxlength="150" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="">
          <div class="btn-wrap">
            <el-button type="primary" :loading="submitLoading" @click="submit">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { saveUserInfo } from "@/utils/api";
export default {
  data() {
    return {
      // 表单
      formData: {
        id: null,
        real_name: "", // 真实姓名
        phone: "", // 手机号
        wx: "", // 微信号
        city: "", // 作业城市
        pay_account: "", // 支付宝账号
        head: "", // 用户头像
        type: "set",
      },
      // 表单校验规则
      rules: {
        real_name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        phone: [
          { validator: (rule, value, callback) => {
            if (value && !/^1[0-9]{10}$/.test(value)) {
              callback(new Error('手机号格式有误'))
            } else {
              callback()
            }
          }, trigger: "blur" },
        ],
        city: [{ required: true, message: "请输入作业城市", trigger: "blur" }],
        pay_account: [
          { required: true, message: "请输入支付宝账号", trigger: "blur" },
        ],
      },
      // 上传文件地址
      baseUrl: "http://nad.bdhuoke.com/business_admin/Project/upload",
      submitLoading: false, // 保存按钮加载中
    };
  },
  computed: {
    // 设置头部参数
    headers() {
      return {
        token: localStorage.getItem("token"),
      };
    },
  },
  methods: {
    // 文件上传成功
    uploadSuccess(res) {
      this.formData.head = `http://nad.bdhuoke.com/${res.data}`;
    },
    // 限制文件类型
    beforeUpload(file) {
      const isJPGOrPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPGOrPNG) {
        this.$message.info("上传图片只能是 JPG 或 PNG 格式!");
      }
      return isJPGOrPNG;
    },
    // 获取用户信息
    fetchData() {
      saveUserInfo({ type: 'get' }).then((res) => {
        this.formData = res.data || this.formData;
        this.formData.type = 'set'
      });
    },
    // 提交表单
    submit() {
      this.submitLoading = true;
      // 触发自定义校验规则
      this.$refs["form"].validate((isPass) => {
        if (isPass) {
          this.saveOrUpdate();
        } else {
          this.submitLoading = false;
        }
      });
    },
    // 保存
    saveOrUpdate() {
      saveUserInfo(this.formData).then((res) => {
        this.submitLoading = false
        if (res.code != 1) return this.$message.error(res.msg);
        this.$message.success(res.msg);
        // 更新用户信息
        localStorage.setItem('user', JSON.stringify(this.formData))
        this.$store.dispatch('user/updateUserInfo', this.formData)
      });
    },
  },
  mounted() {
    // 获取用户信息
    this.fetchData();
  },
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
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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


