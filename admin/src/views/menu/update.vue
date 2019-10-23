<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
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
        formValidate: {
          name: '',
          key: ''
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
      this._getMenu()
    },
    methods: {
      ...mapActions({
        getMenu: 'menu/getMenu',
        updateMenu: 'menu/updateMenu'
      }),
      async _getMenu() {
        try {
          const res = await this.getMenu({
            id: this.id
          });
          const menu = res.data.data;
          this.formValidate.name = menu.name;
          this.formValidate.key = menu.key;

        } catch (e) {

        }
      },
      // 更新
      async _updateMenu() {
        this.formValidate.id = this.id;

        try {
          await this.updateMenu(this.formValidate);
          this.$Message.success('更新成功!');
          this.$router.push('/menu');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._updateMenu();

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
