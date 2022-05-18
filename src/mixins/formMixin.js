const mixin = {
  data() {
    return {
      dialog: {
        show: false, // 弹窗打开/关闭
        loading: false, // 提交按钮加载动画
        title: '' // 对话框标题
      },
      formDataBak: null // 表单初始数据结构备份
    }
  },
  created() {
    if (this.formData !== undefined) {
      this.formDataBak = JSON.parse(JSON.stringify(this.formData))
    }
  },
  methods: {
    /**
     * 提交表单
     */
    submit() {
      this.dialog.loading = true
      if (!this.$refs.form) {
        this.dialog.loading = false
        throw new Error('el-form需要添加ref=form')
      }
      // 触发自定义校验规则
      this.$refs['form'].validate(isPass => {
        if (isPass) {
          // 检查是否定义了额外校验方法
          if (this.checkData) {
            if (this.checkData()) {
              this.saveOrUpdate()
            } else {
              this.dialog.loading = false
            }
          } else {
            this.saveOrUpdate()
          }
        } else {
          this.dialog.loading = false
        }
      })
    },
    /**
     * 关闭对话框并且重置表单数据
     * @param done
     */
    close(done) {
      this.$nextTick(() => {
        this.$refs['form'] && this.$refs['form'].resetFields()
        // 检查是否有自定义重置数据的方法
        this.resetData && this.resetData()
        this.formData = JSON.parse(JSON.stringify(this.formDataBak))
      })
      if (done && typeof done === 'function') {
        done(true)
      } else {
        this.dialog.show = false
      }
    }
  }
}

export default mixin
