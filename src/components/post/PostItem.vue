<template>
    <div class="mb-4 bg-white border border-gray-200">
      <div class="flex justify-between items-end p-4"> 
        <div>          
          <h3 class="text-lg text-gray-800 mb-2 border-b border-gray-200">{{ post.title }}</h3>
          <p class="text-gray-600">{{ post.content }}</p>
        </div>
        <div class="flex item-center">
          <svg @click="editPost(post)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2 text-emerald-600 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          <DeletePost :post="post"><</DeletePost>
        </div>
      </div> 
      <div @click="post.is_favorited = !post.is_favorited" 
      :class="[favoritedClass, 'w-full p-4 text-white text-center cursor-pointer']"
      v-html="post.is_favorited ? 'Cancel favorited' : 'Make favorited'"
      ></div>
    </div>
</template>

<script>
import DeletePost from './DeletePost.vue';

export default {
    name: 'PostItem',

    updated() {
      
    },

    props: {
        post: {
            type: Object,
            required: true,
        },        
    },

    components: {
      DeletePost,
    },

    computed: {
      favoritedClass() {
        return this.post.is_favorited ? 'bg-emerald-600' : 'bg-sky-600';
      }
    },

    methods: {
        editPost(post) {
            this.$emit('postEdited', post);
        },
    }
}
</script>

<style scoped>

</style>