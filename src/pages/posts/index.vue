<template>
    <div>
        <div v-for="post in posts" :key="post.id" class="mb-4 pb-4 border-b border-gray-200">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'index',

    data() {
        return {
            posts: [],
        };
    },

    mounted: function() {
        this.getPosts();
    },

    methods: {
        getPosts() {
            axios.get('http://localhost:3000/posts')
                .then(response => {
                    this.posts = response.data;
                    console.log('Posts fetched:', this.posts);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        },
    },
}

</script>

<style scoped>
    
</style>