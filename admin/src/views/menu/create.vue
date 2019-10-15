<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="父级菜单" prop="name">
        <Select v-model="formValidate.parentId" style="width:200px">
          <Option v-for="item in parentMenuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="菜单名称" prop="name">
        <Input v-model="formValidate.name" placeholder="菜单名称"></Input>
      </FormItem>
      <FormItem label="菜单关键字" prop="key">
        <Input v-model="formValidate.key" placeholder="菜单关键字"></Input>
      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        detail: null,
        parentMenuList:[],
        formValidate: {
          name: '',
          key: '',
          parentId:""
        },
        ruleValidate: {
          name: [
            {required: true, message: '菜单名称不能为空', trigger: 'blur'}
          ],
          key: [
            {required: true, message: '菜单关键字不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getMenuList();
    },
    methods: {
      ...mapActions({
        getMenuList: 'menu/getMenuList',
        createMenu: 'menu/createMenu'
      }),
      // 获取菜单
      async _getMenuList() {
        const res = await this.getMenuList();
        debugger
        this.formValidate.parentId = "-1";
        this.parentMenuList = [
          {
            value:"-1",
            label:"无"
          }
        ]
        for(let item of res.data.data){
          this.parentMenuList.push({
            value:item.id,
            label: item.name
          })
        }
      },
      // 创建
      async _createMenu() {
        this.formValidate.id = this.id;

        try {
          await this.createMenu(this.formValidate);
          this.$Message.success('创建成功!');
          this.$router.push('/menu');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._createMenu();

          } else {
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
