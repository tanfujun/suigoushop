<template>
  <div >
    <el-form :inline="true" :model="categoryForm" class="demo-form-inline">
  <el-form-item label="一级联动" >
    <el-select v-model="categoryForm.category1Id" placeholder="请选择" style="margin-right:20px" @change="handle1" :disabled="isDisabled">
      <el-option :label="item.name" :value="item.id" v-for="item in list1" :key="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级联动" class="select">
    <el-select v-model="categoryForm.category2Id" placeholder="请选择" style="margin-right:20px" @change="handle2" :disabled="isDisabled">
      <el-option :label="item.name" :value="item.id" v-for="item in list2" :key="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="三级联动" class="select">
    <el-select v-model="categoryForm.category3Id" placeholder="请选择" style="margin-right:20px" @change="handle3" :disabled="isDisabled">
      <el-option :label="item.name" :value="item.id" v-for="item in list3" :key="item.id"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
    name:'CategorySelect',
    data() {
        return {
            list1:[],
            list2:[],
            list3:[],
            categoryForm: {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            
        },
        isDisabled:false
      }
    },
    mounted(){
        this.getCategoryList()
        this.$bus.$on('selectDisabled',this.setDisabled)
    },
    methods:{ 
        async getCategoryList(){
           let result = await this.$API.attr.reqCategory1List()
           console.log(result);
                    if(result.code === 200){
                            this.list1 = result.data
                    }
        },
        async handle1(){
              this.list2 = []
              this.list3 = []
              this.categoryForm.category2Id=''
              this.categoryForm.category3Id=''
              let result = await this.$API.attr.reqCategory2List(this.categoryForm.category1Id)
              this.list2 = result.data
        },
        async handle2(){
              this.list3 = []
              this.categoryForm.category3Id=''
              let result = await this.$API.attr.reqCategory3List(this.categoryForm.category2Id)
              this.list3 = result.data
        },
        async handle3(){
              this.$bus.$emit('categoryform',this.categoryForm)
              // console.log(123);
        },
        setDisabled(boolean){
          this.isDisabled = boolean;
        }
    },
    beforeDestroy(){
      this.$bus.$off('selectDisabled')
    }
}
</script>

<style lang="scss" scoped>

</style>