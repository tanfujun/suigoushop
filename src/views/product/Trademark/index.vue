<template>
  <div class="app-container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="addDialog"
      >添加</el-button
    >
    <el-dialog :title="tmform.tmName?'修改品牌':'添加品牌'" :visible.sync="addDialogFormVisible">
      <el-form :model="tmform" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
          <el-input
            style="width: 200px"
            v-model="tmform.tmName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌图片" :label-width="formLabelWidth" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/product/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmform.logoUrl" :src="tmform.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon el-upload"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTrademark">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO">
        <template slot scope="{row}">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot scope="{row}">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updateTrademark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTrademark(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="3"
        layout="total,prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      currentPage: 1,
      limit: 3,
      tableData: [],
      total: 10,
      addDialogFormVisible: false,
      formLabelWidth: "100px",
      imageUrl: "",
      tmform: {
        tmName: "",
        logoUrl: "",
      },
      ruleForm:{
        tmName: "",
        logoUrl: "",
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请选择图片", trigger: "change" }],
      },
    };
  },
  mounted() {
    // console.log(this.$API);
    this.getMarkList();
  },
  watch: {
    currentPage(newVal, oldVal) {
      this.getMarkList();
    },
    addDialogFormVisible(newVal, oldVal) {
      if (newVal === false) {
        this.tmform.tmName = "";
        this.tmform.logoUrl = "";
        if (this.tmform.id) {
          this.tmform.id = undefined;
        }
      }
    },
  },
  methods: {
    async getMarkList() {
      const { currentPage, limit } = this;
      let result = await this.$API.trademark.reqGetTrademarkList(
        currentPage,
        limit
      );
      console.log(result);
      if (result.code === 200) {
        this.tableData = result.data.records;
        this.total = result.data.total;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    addDialog() {
      this.addDialogFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.tmform.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式或者png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    saveTrademark() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let result = await this.$API.trademark.reqAddTrademark(this.tmform);
          // console.log(result);
          if (result.code === 200) {
            this.$message({
              message: this.tmform.id ? "修改成功" : "添加成功",
              type: "success",
            });
            this.getMarkList();
            this.addDialogFormVisible = false;
          } else {
            this.$message({
              message: "添加失败",
              type: "error",
            });
            this.addDialogFormVisible = false;
          }
        }else{
            return 'false'
        }
      });
    },
    updateTrademark(row) {
      this.addDialogFormVisible = true;
      this.tmform = { ...row };
    },
    deleteTrademark(id) {
        this.$confirm('此操作将删除该品牌, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            let result = await this.$API.trademark.reqRemoveTrademark(id);
      if (result.code === 200) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        this.getMarkList();
      } else {
        this.$message({
          message: "删除失败",
          type: "error",
        });
      }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>