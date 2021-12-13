<template>
  <div class="dashboard mt-5">
    <div class="row">
      <h2 class="title">TRANG CHỦ</h2>
      <form class="col-4 mx-auto bordered mt-5" @submit.prevent="createPost()">
        <h2 class="title">THÊM BÀI VIẾT</h2>
        <div class="form-group">
          <label for="title">Title</label>
          <input v-model="post.title" type="text" name="title" class="form-control"
                 :class="{'is-invalid': errors.title}" id="title"
                 aria-describedby="emailHelp">
          <div v-if="errors.title" class="invalid-feedback">
            {{ errors.title[0] }}
          </div>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea v-model="post.content" type="text" name="content" class="form-control"
                    :class="{'is-invalid': errors.content}" id="content"></textarea>
          <div v-if="errors.content" class="invalid-feedback">
            {{ errors.content[0] }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          <span class="spinner-border text-light" role="status" v-if="loading">
          </span>
          Thêm bài viết
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import BaseRequest from "../core/BaseRequest";

export default {
  name: 'Dashboard',
  data() {
    return {
      post: {
        title: '',
        content: ''
      },
      errors: {},
      loading: false
    }
  },
  mounted() {
    this.checkLoggedIn();
  },
  methods: {
    checkLoggedIn: function () {
      BaseRequest.get('user')
          .then(function (response) {
            console.log(response);
          })
          .catch(() => {
            this.$router.push({name: 'login'});
          })
    },
    createPost: function () {
      BaseRequest.post('post', this.post)
          .then(() => {
            alert("Đăng bài thành công");
            this.post = {title: '', content: ''}
          })
          .catch(error => {
            this.loading = false;
            this.errors = error.response.data.errors;
          });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}
</style>
