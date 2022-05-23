<template>
  <el-dialog title="修改密码" :visible.sync="dialog.show" width="600px" :close-on-click-modal="false" :before-close="close">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
      <el-form-item label="原密码" prop="old_password">
        <el-input v-model="formData.old_password" type="password" placeholder="请输入原密码" maxlength="150" />
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="formData.new_password" type="password" placeholder="密码由6-12位数字字母下划线组成" maxlength="12" />
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="formData.re_pwd" type="password" placeholder="请再次输入确认新密码" maxlength="12" />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="close">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit">
        保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { modifyPwd } from "@/utils/api";
export default {
  node_name: "groupForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        old_password: null, // 原密码
        new_password: null, // 新密码
        re_pwd: null, // 确认新密码
      },
      rules: {
        old_password: [
          { required: true, message: "请输入原密码", trigger: "blur" },
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: (rule, value, callback) => {
            if (!/^[A-Za-z0-9_]{6,12}$/.test(value)) {
              callback(new Error('密码格式有误'))
            } else if (this.formData.old_password === value) {
              callback(new Error('新密码不能和原密码相同'))
            } else {
              callback()
            }
          }, trigger: "blur" },
        ],
        re_pwd: [
          { required: true, message: "请再次输入以确认", trigger: "blur" },
          { validator: (rule, value, callback) => {
            if (this.formData.new_password !== value) {
              callback(new Error('两次密码输入不一致'))
            } else {
              callback()
            }
          }, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    open() {
      this.dialog.show = true;
      this.dialog.loading = false;
    },
    saveOrUpdate() {
      modifyPwd(this.formData).then((res) => {
        if (res.code != 1) {
          this.dialog.loading = false
          this.$message.error(res.msg);
          return
        }
        this.$message.success("修改密码成功");
        this.close();
      }).catch(() => {
        this.dialog.loading = false
      })
    },
  },
};
</script>

<style lang="scss">
</style>
