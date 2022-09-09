<template>
  <div class="app-container">
    <el-card class="box-card" style="margin: 20px 0"><CategorySelect></CategorySelect></el-card>
    <el-card class="box-card" style="margin: 20px 0">
    
    <!-- 三种状态转换，用三个div -->
    <div>
        <div v-show="scene == 0">
        <!-- 展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!categoryForm.category3Id"
          @click="addSpu"
          style="margin-bottom:20px"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里按钮将来用hintButton替换 -->
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="{text-align: center;margin-top: 20px;}"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->, sizes,total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          :total="total"
        >
        </el-pagination>
      </div>
         <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <!-- table展示sku列表-->
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column label="默认图片" width="width">
           <template slot-scope="{row,$index}">
               <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
           </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    </div>
        <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></SpuForm>
      <SkuForm
        v-show="scene == 2"
        ref="sku"
        @changeScenes="changeScenes"
      ></SkuForm>

    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm/index.vue";
import SpuForm from "./SpuForm/index.vue";
export default {
    mounted() {
        this.$bus.$on("categoryform", this.getCategoryForm);
    },
    name: "Spu",
    data() {
        return {
            categoryForm: {},
            //控制三级联动的可操作性
            page: 1,
            limit: 3,
            records: [],
            total: 0,
            scene: 0,
            //控制对话框的显示与隐藏
            dialogTableVisible: false,
            spu: {},
            skuList: [],
            loading: true
        };
    },
    watch:{
        scene(newVal){
            if(newVal != 0){
                this.$bus.$emit('selectDisabled',true)
            }else{
                this.$bus.$emit('selectDisabled',false)
                }
        }
    },
    methods: {
        //获取三级分类ID
        getCategoryForm(categoryForm) {
            this.categoryForm = { ...categoryForm };
            this.getSpuList();
        },
        //获取SPU列表数据的方法
        async getSpuList(pages = 1) {
            this.page = pages;
            const { category3Id } = this.categoryForm;
            const { page, limit } = this;
            //携带三个参数:page 第几页  limit 每一页需要展示多少条数据  三级分类id
            let result = await this.$API.spu.reqSpuList(page, limit, category3Id);
            if (result.code == 200) {
                this.total = result.data.total;
                this.records = result.data.records;
            }
        },
        //当分页器的某一个展示数据条数发生变化的回调
        handleSizeChange(limit) {
            //修改参数
            this.limit = limit;
            //再发请求
            this.getSpuList();
        },
        //添加SPU按钮的回调
        addSpu() {
            //切换为场景为1
            this.scene = 1;
            //通知子组件SpuForm发请求---两个
            this.$refs.spu.addSpuData(this.categoryForm.category3Id);
        },
        //修改某一个SPU
        updateSpu(row) {
            this.scene = 1;
            //获取子组件SpuForm子组件的
            //在父组件当中可以通过$ref获取子组件等等
            this.$refs.spu.initSpuData(row);
        },
        //自定义事件回调（SpuForm）
        changeScene({ scene, flag }) {
            //flag这个形参为了区分保存按钮是添加还是修改
            //切换结构（场景）
            this.scene = scene;
            //子组件通知父组件切换场景，需要再次获取SPU列表的数据进行展示
            if (flag == "修改") {
                this.getSpuList(this.page);
            }
            else {
                this.getSpuList();
            }
        },
        //删除SPU的回调
        async deleteSpu(row) {
            let result = await this.$API.spu.reqDeleteSpu(row.id);
            if (result.code == 200) {
                this.$message({ type: "success", message: "删除成功" });
                //代表SPU个数大于1删除的时候停留在当前页，如果SPU个数小于1 回到上一页
                this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
            }
        },
        //添加SKU按钮的回调
        addSku(row) {
            //切换场景为2
            this.scene = 2;
            //父组件调用子组件的方法，让子组件发请求------三个请求
            this.$refs.sku.getData(this.categoryForm.category1Id, this.categoryForm.category2Id, row);
        },
        //skuform通知父组件修改场景
        changeScenes(scene) {
            this.scene = scene;
        },
        //查看SKU的按钮的回调
        async handler(spu) {
            //点击这个按钮的时候，对话框可见的
            this.dialogTableVisible = true;
            //保存spu信息
            this.spu = spu;
            //获取sku列表的数据进行展示
            let result = await this.$API.spu.reqSkuList(spu.id);
            if (result.code == 200) {
                this.skuList = result.data;
                //loading隐藏
                this.loading = false;
            }
        },
        //关闭对话框的回调
        close(done) {
            //loading属性再次变为真
            this.loading = true;
            //清除sku列表的数据
            this.skuList = [];
            //管理对话框
            done();
        }
    },
    components: { SkuForm, SpuForm }
}
</script>
 
<style>

</style>