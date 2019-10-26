<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="50">
      <Row>
        <Col :span="4">
          <FormItem label="文章标题" prop="title">
            <Input  v-model="formValidate.title" placeholder="文章标题" />
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="文章作者" prop="author">
            <Input  v-model="formValidate.author" placeholder="文章作者" />
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="*所属菜单" prop="menu" v-if="menuList.length > 0">
            <Select v-model="formValidate.menu_id">
              <Option v-for="(item, index) in menuList" :value="item.id" :key="index">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="*文章分类" prop="cate" v-if="categoryList.length > 0">
            <Select v-model="formValidate.category_id">
              <Option
                v-for="(item, index) in categoryList"
                :value="item.id"
                :key="index"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem label="*文章封面" prop="cover">
            <div class="cover">
              <div class="upload">
                <Upload
                  action="http://up-z2.qiniu.com"
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :data="{token}"
                >
                  <Button icon="ios-cloud-upload-outline">上传封面</Button>
                </Upload>
              </div>
              <div class="article-cover" v-if="formValidate.cover">
                <img :src="formValidate.cover" alt="cover" />
              </div>
            </div>
          </FormItem>
        </Col>
        <Col :span="4">
          <FormItem>
            <Button @click="handleReset('formValidate')">重置</Button>
            <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
          </FormItem>
        </Col>
      </Row>

      <FormItem label prop="content" :label-width="0">
        <mavon-editor
          style="min-height: 500px;width: 100%"
          :toolbars="toolbars"
          v-model="editContent"
          :ishljs="true"
          ref="md"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
        ></mavon-editor>
      </FormItem>
    </Form>
  </section>
</template>
<script>
import { mapActions } from "vuex";
import getUploadToken from "../../libs/upload-token";

export default {
  data() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      img_file: {},
      token: "",
      id: this.$route.params.id,
      detail: null,
      menuList: [],
      categoryList: [],
      editContent:"",
      formValidate: {
        title: "",
        author: "",
        category_id: "",
        menu_id: "",
        cover: "",
        content: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "文章标题不能为空",
            trigger: "blur,change"
          }
        ],
        author: [
          {
            required: true,
            message: "文章作者不能为空",
            trigger: "blur,change"
          }
        ],
        menu: [
          {
            required: false,
            type: "string",
            message: "文章所属菜单不能为空",
            trigger: "blur,change"
          }
        ],
        cate: [
          {
            required: false,
            type: "number",
            message: "文章分类不能为空",
            trigger: "blur,change"
          }
        ],
        cover: [
          {
            required: false,
            message: "文章封面不能为空",
            trigger: "blur,change"
          }
        ],
        content: [
          {
            required: true,
            message: "文章内容不能为空",
            trigger: "blur,change"
          }
        ]
      }
    };
  },
  created() {
    this._getCategoryList();
    this._getMenuList();
    this._getUploadToken();
  },
  watch: {
    editContent: {
      handler(newVal, oldVal) {
        this.formValidate.content = newVal;
        this.autoSave(true);
      },
  // 代表在wacth里声明了editContent这个属性之后立即先去执行handler方法
      immediate: false
    }
  },
  methods: {
    ...mapActions({
      createArticle: "article/createArticle",
      getCategoryList: "category/getCategoryList",
      getMenuList: "menu/getMenuList",
      uploadImg: "upload/uploadImg"
    }),
    autoSave(val){
      this._createArticle(val);
    },
    uploadLoadStart(text = "....努力上传中....耐心等候.....") {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 30
              }
            }),
            h("div", text)
          ]);
        }
      });
    },
    uploadLoadEnd() {
      this.$Spin.hide();
    },
    async $imgAdd(pos, $file) {
      this.uploadLoadStart();
      // 第一步.将图片上传到服务器.
      let formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("token", this.token);
      this.img_file[pos] = $file;

      const res = await this.uploadImg(formdata);
      this.$refs.md.$img2Url(pos, `http://upload.chelflan.cn/${res.data.key}`);
      this.uploadLoadEnd();
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    // 上传图片成前动画
    beforeUpload(response) {
      this.uploadLoadStart();
    },
    uploadSuccess(response) {
      const url = `http://upload.chelflan.cn/${response.key}`;
      this.formValidate.cover = url;
      this.$Message.success("上传成功!");
      this.uploadLoadEnd();
    },
    // 上传图片失败
    uploadError(response) {
      this.$Message.error("上传失败!");
      console.log(response);
    },
    // 获取上传token
    async _getUploadToken() {
      try {
        const res = await getUploadToken();
        this.token = res.token;
      } catch (e) {
        console.log(e);
      }
    },
    // 获取分类列表
    async _getCategoryList() {
      const res = await this.getCategoryList();
      this.categoryList = res.data.data;
    },
    // 获取菜单列表
    async _getMenuList() {
      const res = await this.getMenuList();
      this.menuList = res.data.data;
    },
    // 更新
    async _createArticle(val) {
      this.formValidate.id = this.id;

      try {
        await this.createArticle(this.formValidate);
        if(!!!val){
          this.$Message.success("新增成功!");
          this.$router.push("/article");
        }
      } catch (e) {}
    },
    // 提交
    handleSubmit(name) {
      if(!!!this.formValidate.cover){
        this.formValidate.cover = "http://upload.chelflan.cn/Fgq0YNapGYOXRcXq59i6HH4W37Sn";
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          this._createArticle();
        } else {
          this.$Message.error("请完成表单!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  beforeDestroy(){
    //销毁钱自动保存
    // if(!!!this.formValidate.content){
    //   this.autoSave(true);
    // }
  }
};
</script>
<style scoped>
.ivu-form-inline .ivu-form-item {
  margin-right: 1px;
}

.input-scope {
  width: 70px;
}

.article-cover {
  width: 60px;
}

.article-cover img {
  width: 60px;
}

.cover {
  display: flex;
}

.cover .upload {
  width: 80px;
  margin-right: 32px;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

</style>
