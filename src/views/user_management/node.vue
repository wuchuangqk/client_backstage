<template>
  <div class="app-page">
    <div>
      <el-button type="primary" :loading="saveLoading" @click="submit">保存</el-button>
      <el-button type="default" @click="$router.back()">返回</el-button>
    </div>
    <section v-loading="loading" element-loading-text="加载中，请稍候……">
      <div class="tree-list">
        <div v-for="(item, index) in menuData" :key="index" class="tree-item">
          <el-tree :ref="`tree-${index}`" v-model="checkData" :props="props" :data="[item]" node-key="id"
            default-expand-all show-checkbox @check-change="(v1, v2, v3) => checkChange(v1, v2, v3, item)">
            <span slot-scope="{ node, data }" class="custom-tree-node" style="font-size: 14px">
              <!-- <span v-if="data.type === 3" style="color: red">
                {{ data.name }}
              </span> -->
              <span>{{ data.node_name }}</span>
            </span>
          </el-tree>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { saveAccess } from "../../utils/api";
export default {
  name: "PermissionPlatform",
  data() {
    return {
      menuData: [], // 所有菜单和权限
      checkData: [], // 选择的菜单和权限
      loading: true,
      saveLoading: false,
      props: {
        label: "node_name",
        children: "son",
      },
      roleData: {},
      saveData: {
        isAllAuth: null,
        menuIds: [],
        platformCode: null,
        roleId: null,
      },
      formData: {
        id: "",
        type: "set",
        rule: [],
      },
    };
  },
  methods: {
    // 获取角色下绑定的菜单
    fetchData() {
      this.loading = true;
      saveAccess({
        type: "get",
      }).then((res) => {
        this.menuData = res.data;
        const checkKeys = [];
        this.filterParentId(this.menuData, this.formData.rule, checkKeys);
        this.$nextTick(() => {
          this.menuData.forEach((val, index) => {
            this.$refs["tree-" + index][0].setCheckedKeys(checkKeys);
          });
          this.loading = false;
        });
      });
    },
    // 将父级id过滤掉，否则回显时，即使只选择了一个子级，也会勾选所有的子级
    filterParentId(menuData, target, result) {
      menuData.forEach((val) => {
        // 如果这个菜单是勾选的且没有子级
        if (target.includes(val.id) && (!val.son || !val.son.length)) {
          result.push(val.id);
        }
        if (val.son) {
          this.filterParentId(val.son, target, result);
        }
      });
    },
    checkChange(v1, v2, v3, item) {
      if (!v2) {
        item.checkAll = false;
      }
    },
    submit() {
      if (this.saveLoading) {
        return;
      }
      this.saveLoading = true;
      this.formData.rule.length = 0;
      this.menuData.forEach((val, index) => {
        const node = this.$refs["tree-" + index][0];
        const check = node.getHalfCheckedKeys().concat(node.getCheckedKeys());
        this.formData.rule = this.formData.rule.concat(check);
      });
      this.formData.rule = this.formData.rule.join(",");
      saveAccess(this.formData).then(() => {
        this.saveLoading = false;
        this.$message.success("操作成功");
        this.$router.back();
      });
    },
  },
  mounted() {
    this.formData.id = this.$route.query.id;
    let rule = this.$route.query.rule;
    if (!rule || rule === "*") {
      rule = "";
    }
    this.formData.rule = rule.split(",").map((v) => +v);
    // 获取角色下的权限
    this.fetchData();
  },
};
</script>

<style scoped lang="scss">
.tree-list {
  display: flex;
  flex-wrap: wrap;

  .tree-item {
    padding: 15px 0 15px 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin: 15px;
  }
}

.divider {
  height: 1px;
  background-color: #dcdfe6;
  margin: 10px 0;
}

.el-tree {
  padding-right: 24px;
}

.tip-content {
  margin: 20px 0;
  width: 100%;
  border-radius: 6px;
  background-color: #fdf6ec;
  color: #e6a23c;
  font-size: 14px;
  border-left: 5px solid #e6a23c;
  padding: 20px 10px;
  line-height: 20px;
}
</style>
