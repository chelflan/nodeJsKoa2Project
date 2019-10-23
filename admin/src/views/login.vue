<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon size="18" type="md-paper-plane" color="#f00"/>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="email">
              <i-input v-model.trim="form.email" placeholder="请输入邮箱" clearable>
                            <span slot="prepend">
                                    <Icon :size="16" type="md-person"></Icon>
                                </span>
              </i-input>
            </FormItem>
            <FormItem prop="password">
              <i-input type="password" v-model.trim="form.password" placeholder="请输入密码" clearable>
                            <span slot="prepend">
                                  <Icon :size="16" type="md-lock"></Icon>
                                </span>
              </i-input>
            </FormItem>
            <FormItem>
              <Button :loading="buttonLoading" @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>

    <div class="register-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon size="18" type="md-paper-plane" color="#00f"/>
          欢迎注册
        </p>
        <div class="form-con">
          <Form ref="registerForm" :model="registerForm" :rules="rules">

            <FormItem prop="nickname">
              <i-input v-model.trim="registerForm.nickname" placeholder="请输入用户名" clearable>
                            <span slot="prepend">
                                    <Icon :size="16" type="md-person"></Icon>
                                </span>
              </i-input>
            </FormItem>


            <FormItem prop="email">
              <i-input v-model.trim="registerForm.email" placeholder="请输入邮件地址" clearable>
                            <span slot="prepend">
                                    <Icon :size="16" type="md-mail"></Icon>
                                </span>
              </i-input>
            </FormItem>

            <!--控制输入框的自动填充-->
            <FormItem prop="email" style="position: fixed;left: -10000px;">
              <i-input  placeholder="请输入邮件地址" clearable>
                            <span slot="prepend">
                                    <Icon :size="16" type="md-mail"></Icon>
                                </span>
              </i-input>
            </FormItem>

            <!--控制密码的自动填充-->
            <FormItem prop="passwordback" style="position: fixed;left: -10000px;">
              <i-input type="password">
                            <span slot="prepend">
                                  <Icon :size="16" type="md-lock"></Icon>
                                </span>
              </i-input>
            </FormItem>


            <FormItem prop="password1">

              <i-input type="password" v-model.trim="registerForm.password1" placeholder="请输入密码" clearable>
                            <span slot="prepend">
                                  <Icon :size="16" type="md-lock"></Icon>
                                </span>
              </i-input>

            </FormItem>


            <FormItem prop="password2">
              <i-input type="password" v-model.trim="registerForm.password2" placeholder="请再次输入密码" clearable>
                            <span slot="prepend">
                                  <Icon :size="16" type="md-lock"></Icon>
                                </span>
              </i-input>
            </FormItem>

            <FormItem>
              <Button @click="registerUser" type="primary" long>注册</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>

  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    data() {

      const validatePass = (rule, value, callback) => {

          if (!!!value) {
            callback(new Error('请输入密码'));
          } else {
            if (!!!this.registerForm.password2) {
              // 调用第二个的验证
              this.$refs.registerForm.validateField('password2');
            }
            callback();
          }
          debugger
          callback();

      };

      const validatePassCheck = (rule, value, callback) => {

          if (!!!value) {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.registerForm.password1) {
            callback(new Error('两次密码不一致'));
          } else {
            callback();
          }

      };


      return {
        buttonLoading: false,
        // 表单内容，email && 密码
        form: {
          email: '',
          password: '',
        },
        registerForm: {
          passwordback:"",
          nickName:"",
          email: '',
          password: '',
          password1: '',
          password2: ''
        },

        // 表单验证，email && 密码
        rules: {
          nickname: [{
            required: true,
            message: '不能为空',
            trigger: 'blur,change'
          }],
          email: [{
            required: true,
            message: '不能为空',
            trigger: 'blur,change'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur,change'
          }],
          password1: [{ validator: validatePass, trigger: 'blur,change' }],
          password2: [{ validator: validatePassCheck, trigger: 'blur,change' }],
        }
      };
    },
    created() {
      this.$Loading.finish();
    },
    methods: {
      ...mapActions({
        login: 'admin/login',
        register: 'admin/register'

      }),

      // 提交登录
      handleSubmit() {

        this.buttonLoading = true;
        // 表单验证
        let formLabel = this.$refs.loginForm;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }

          this.login(this.form).then(ret => {
            console.log('done')
            this.$ls.set('token', ret.data.token);
            // 跳转
            this.$Message.success("登录成功！");
            window.location.href = '/'

          },err=>{
            console.error(err,"err")
          }).catch(err => {

            this.buttonLoading = false

          })
        })
      },
      registerUser() {
        this.buttonLoading = true;
        // 表单验证
        let formLabel = this.$refs.registerForm;
        formLabel.validate((valid) => {
          if (!valid) {
            this.$Message.error('表单验证失败!');
            this.buttonLoading = false;
            return false
          }


          this.register(this.registerForm).then(ret => {


            this.$Message.success("注册成功！");
            window.location.href = '/'

          }).catch(err => {
            this.buttonLoading = false

          })
        })
      }
    }
  };
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }

  .login {
    width: 100%;
    height: 100%;
    background-image: url('../assets/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;

  }

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .register-con {
    position: absolute;
    left: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .login-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }

  .form-con {
    padding: 10px 0 0;
  }

  .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
</style>

