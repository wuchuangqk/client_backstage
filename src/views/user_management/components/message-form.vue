<template>
  <el-dialog title="发布消息" :visible.sync="dialog.show" width="600px" :close-on-click-modal="false" :before-close="close">
    <el-form ref="form" :model="formData" label-position="left" label-width="100px">
      <el-form-item label="标题">
        <el-input v-model="formData.title" placeholder="请输入标题" maxlength="150" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formData.info" placeholder="请输入内容" maxlength="150" />
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button type="default" @click="close">取消</el-button>
      <el-button type="primary" :loading="dialog.loading" @click="submit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import { saveMessage } from "@/utils/api";
export default {
  role_name: "RemarkForm",
  mixins: [formMixin],
  data() {
    return {
      formData: {
        title: "", // 标题
        info: "", // 内容
      },
    };
  },
  methods: {
    open(row) {
      this.dialog.show = true;
      this.dialog.loading = false;
    },
    saveOrUpdate() {
      saveMessage(this.formData).then(() => {
        this.$message.success("操作成功");
        this.$emit("update-data");
        this.close();
      });
    },
  },
};
</script>

<style lang="scss" scope>
</style>
