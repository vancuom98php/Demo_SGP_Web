<template>
  <div class="login align-middle">
    <div class="row">
      <form class="col-4 mx-auto bordered mt-5" @submit.prevent="login()">
        <h2 class="title">ĐĂNG NHẬP</h2>
        <div class="form-group">
          <label for="email">Email address</label>
          <input v-model="user.email" type="email" name="email" class="form-control"
                 :class="{'is-invalid': errors.email}" id="email"
                 aria-describedby="emailHelp">
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email[0] }}
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" type="password" name="password" class="form-control"
                 :class="{'is-invalid': errors.password}" id="password">
          <div v-if="errors.password" class="invalid-feedback">
            {{ errors.password[0] }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          <span class="spinner-border text-light" role="status" v-if="loading">
          </span>
          Đăng nhập
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import BaseRequest from "../core/BaseRequest";

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false
    }
  },
  methods: {
    login: function () {
      BaseRequest.post('login', this.user)
          .then(response => {
            this.loading = true;
            window.localStorage.setItem('token', response.data.token);
            this.$router.push({name: 'dashboard'});
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
