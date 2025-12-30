<template>
  <div @click="editedPost = {}" v-if="Object.keys(editedPost).length > 0" class="modal-shadow">
    <div @click.stop class="modal">
      <div class="modal-header mb-4">
        <div>
          <h3>Edit post title</h3>
        </div>
      </div>
      <div class="modal-body">
        <div class="mb-4">
          <input v-model.trim="editedPost.title" type="text" placeholder="title" class="border border-gray-200 p-4 w-full">
        </div>
        <div class="mb-4">
          <textarea v-model.trim="editedPost.content" placeholder="content" class="border border-gray-200 p-4 w-full"></textarea>
        </div>
        <div class="mb-4">
          <a href="#" @click.prevent="updatePost" class="inline-block px-3 py-2 bg-sky-600 border border-sky-700 text-white">Save Post</a>
        </div>
      </div>
      <div class="modal-footer"></div>
    </div>
  </div>

  <div class="w-1/2 mx-auto p-4">
    <div class="p-4 mb-4 bg-white border border-gray-200">
      <div class="mb-4">
        <input type="text" v-model.trim="post.title" placeholder="title" class="border border-gray-200 p-4 w-full">
      </div>
      <div class="mb-4">
        <textarea @keyup.ctrl.enter="storePost" v-model.trim="post.content" placeholder="content" class="border border-gray-200 p-4 w-full"></textarea>
      </div>
      <div v-if="errors.length > 0" class="text-red-600 mb-2">
        <div v-for="error in errors">{{ error }}</div>
      </div>
      <div class="mb-4">
        <a href="#" @click.prevent="storePost" class="inline-block px-3 py-2 bg-sky-600 border border-sky-700 text-white">Add Post</a>
      </div>
    </div>
    <div class="flex justify-between">
      <div class="w-1/2 mr-1">
        <h3 class="mb-2">All</h3>
        <PostItem @postEdited="editPost" v-for="postItem in posts" :post="postItem"></PostItem>
      </div>
      <div class="w-1/2 ml-1">
        <h3 class="mb-2">Favorites</h3>
        <PostItem @postEdited="editPost" v-for="postItem in favoritedPosts" :post="postItem"></PostItem>
      </div>
    </div>
  </div>
</template>

<script>
import PostItem from './components/post/PostItem.vue';
export default {
  name: 'Our App',

  data() {
    return {
      post: {},
      posts: [],
      editedPost: {},
      errors: [],
      validatedFields: ['title', 'content'],
    }
  },

  provide() {
    return {
      posts: this.posts,
    }
  },

  components: {
    PostItem,
  },

  computed: {
    favoritedPosts() {
      return this.posts.filter(post => post.is_favorited === true);
    }
  },

  methods: {
    storePost() {
      if (!this.isValidated()) return;
      this.posts.unshift(this.post);
      this.post = {};
    },    
    updatePost() {
      const post = this.posts[this.editedPost.index];
      post.title = this.editedPost.title;
      post.content = this.editedPost.content;
      this.editedPost = {};
    },
    editPost(post) {
      this.editedPost.index = this.posts.indexOf(post);
      this.editedPost.title = post.title;
      this.editedPost.content = post.content;
    },
    isValidated() {
      this.errors = [];
      this.validatedFields.forEach(field => {
        if (!this.post[field]) {
          this.errors.push(`${field} field is required`);
        }
      });
      return this.errors.length < 1;
    }
  },

  watch: {
    post: {
      handler(newVal, oldVal) {
        this.errors = [];
      },
      deep: true,
    }
  }
}
</script>

<style>
  .modal-shadow {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, .8);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    width: 50%;
    background-color: #fff;
    padding: 20px;
  }
</style>
