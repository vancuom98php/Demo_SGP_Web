<template>
  <div class="home_page mt-5">
    <h2 class="title">Home Page</h2>
    <div class="row" v-for="(post) in posts" :key="post.id">
      <div class="col-4 mx-auto">
        <h2>Tieu de: {{ post.title }}</h2>
        <div>Noi dung: {{ post.content }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-4 mx-auto">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" v-if="currentPage > 1">
              <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
            </li>
            <li class="page-item" v-for="page in totalPage" :key="page" :class="{active: currentPage == page}">
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" v-if="currentPage < totalPage">
              <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "../core/BaseRequest";

export default {
  name: 'HomePage',
  data() {
    return {
      posts: [],
      loading: false,
      currentPage: 1,
      totalPage: 0
    }
  },
  mounted() {
    this.getPosts();
  },
  watch: {
    currentPage: function () {
      this.getPosts();
    }
  },
  methods: {
    getPosts: function () {
      BaseRequest.get('post?page=' + this.currentPage)
          .then(response => {
            this.posts = response.data.data;
            this.totalPage = response.data.last_page;
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  text-align: center;
}
</style>
