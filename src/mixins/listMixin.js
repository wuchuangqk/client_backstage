import _ from 'lodash'

const list = {
  data() {
    return {
      tableData: [], // 表格数据
      total: 0, // 总条数
      delLoading: false, // 删除按钮加载中动画
      tableLoading: false, // 控制表格加载中动画显隐
      inputTimer: null, // 输入框查询防抖计时器
      loadingTimer: null, // 表格加载中动画计时器
      pageSizes: [10, 20, 50, 100],
      searchParams: {
        page: 1,
        num: 10,
      },
      // 搜索防抖，用户停止输入300毫秒后发起查询请求
      debounceInput: _.debounce(() => {
        this.search()
      }, 300),
    }
  },
  /**
   * 只有组件的name包含在keep-alive的includes数组里，组件才会有activated生命周期
   * 同时在路由切换时组件的created生命周期只会触发一次，且destroyed生命周期永远不会触发
   */
  activated() {
  },
  methods: {
    /**
     * 切换每页显示的个数
     * @param val
     */
    handleSizeChange(val) {
      this.searchParams.num = val
      this.fetchData()
    },
    /**
     * 翻页
     * @param val
     */
    handleCurrentChange(val) {
      this.searchParams.page = val
      this.fetchData()
    },
    // 页数回到第一页
    search() {
      this.searchParams.page = 1
      this.fetchData()
    },
    /**
     * 在执行查询后，如果50毫秒内没有返回数据，则显示加载中动画
     */
    showLoading() {
      clearTimeout(this.loadingTimer)
      this.loadingTimer = setTimeout(() => {
        this.tableLoading = true
      }, 50)
    },
    // 关闭加载中动画
    hideLoading() {
      clearTimeout(this.loadingTimer)
      this.tableLoading = false
    },
    /**
     * 点击列表操作列删除按钮
     * @param id 删除的主键id
     * @param isBatchDelete 是否批量删除，如果是则参数用数组
     */
    del(param) {
      let delConfirmText = '确定删除吗' // 删除提示文字
      let delSuccessText = '删除成功' // 删除成功文字
      if (this.mixinParams) {
        delConfirmText = this.mixinParams.delConfirmText || delConfirmText
        delSuccessText = this.mixinParams.delSuccessText || delSuccessText
      }
      this.$confirm(delConfirmText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.mixinParams.del(param).then(() => {
          this.$message.success(delSuccessText || '删除成功')
          this.fetchData()
          // 如果需要在删除后进行某些处理操作，可以在Methods里定义delCallback方法
          this.delCallback && this.delCallback(true, res)
        }).catch(err => {
          this.delCallback && this.delCallback(false, err)
        })
      }).catch(() => {
        // 取消删除
        this.cancelCallback && this.cancelCallback()
      })
    },
  }
}

export default list
