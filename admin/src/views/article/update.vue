<template>
  <section>
    <!-- <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="文章标题" prop="title">
        <Input v-model="formValidate.title" placeholder="文章标题"></Input>
      </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formValidate.author" placeholder="文章作者"></Input>
      </FormItem>
      <FormItem label="所属菜单" prop="menu" v-if="menuList.length > 0">
        <Select v-model="formValidate.menu_id">
          <Option v-for="(item, index) in menuList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="文章分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.category_id">
          <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="文章封面" prop="cover">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://up-z2.qiniu.com"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :data="{token}">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover">
            <img :src="formValidate.cover" alt="cover">
          </div>
        </div>
      </FormItem>

      <FormItem label="文章内容" prop="content">
        <mavon-editor
          v-model="formValidate.content"
          :ishljs="true"
          ref=md>
        </mavon-editor>

      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>-->
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
          <FormItem label="文章封面" prop="cover">
            <div class="cover">
              <div class="upload">
                <Upload
                  action="http://up-z2.qiniu.com"
                  :show-upload-list="false"
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
          v-model="formValidate.content"
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
      img_file: {},
      token: "",
      id: this.$route.params.id,
      detail: null,
      menuList: [],
      categoryList: [],
      formValidate: {
        title: "",
        author: "",
        menu_id: "",
        category_id: "",
        cover: "",
        content: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        author: [
          { required: true, message: "文章作者不能为空", trigger: "blur" }
        ],
        cover: [
          { required: true, message: "文章封面不能为空", trigger: "blur" }
        ],
        content: [
          { required: true, message: "文章内容不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this._getArticle();
    this._getCategoryList();
    this._getUploadToken();
    this._getMenuList();
  },
  methods: {
    ...mapActions({
      getArticle: "article/getArticle",
      updateArticle: "article/updateArticle",
      getMenuList: "menu/getMenuList",
      getCategoryList: "category/getCategoryList",
      uploadImg: "upload/uploadImg"
    }),
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
    // 上传图片成功
    uploadSuccess(response) {
      const url = `http://upload.chelflan.cn/${response.key}`;
      this.formValidate.cover = url;
      this.$Message.success("上传成功!");
    },
    // 上传图片失败
    uploadError(response) {
      this.$Message.success("上传失败!");
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
    // 获取菜单列表
    async _getMenuList() {
      const res = await this.getMenuList();
      this.menuList = res.data.data;
    },
    // 获取文章列表
    async _getArticle() {
      try {
        const res = await this.getArticle({
          id: this.id
        });
        const article = res.data.data;

        this.formValidate.title = article.title;
        this.formValidate.author = article.author;
        this.formValidate.category_id = parseInt(article.category_id);
        this.formValidate.menu_id = parseInt(article.menu_id);
        this.formValidate.cover = article.cover;
        this.formValidate.content = article.content;
      } catch (e) {}
    },
    // 获取分类列表
    async _getCategoryList() {
      const res = await this.getCategoryList();
      this.categoryList = res.data.data;
    },
    // 更新
    async _updateArticle() {
      this.formValidate.id = this.id;

      try {
        await this.updateArticle(this.formValidate);
        this.$Message.success("更新成功!");
        this.$router.push("/article");
      } catch (e) {}
    },
    // 提交
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this._updateArticle();
        } else {
          this.$Message.error("请完成表单!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
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
</style>
