<script setup>
import Navbar from '../components/navbar.vue';
import Post from '../components/post.vue';
import AddQuestion from '../components/AddQuestion.vue';

import axios from 'axios';
import { getCookies } from '../../utils/utilities';
import { onMounted, ref } from '@vue/runtime-core';
import Loading from '../components/loading.vue'
import { useLoaderStore } from '../stores/loader'

const loader = useLoaderStore()

const cookies = getCookies();
const posts = ref([]);


onMounted(async () => {
  loader.loading = true;

  const res = await axios.post(
    'http://localhost:5000/posts/getAllAnswers',
    {},
    {
      headers: {
        token: cookies.token
      }
    }
  );
  posts.value = res.data;
  loader.loading = false;
});
</script>

<template>
  <div class="">
    <Navbar />
    <div v-if="loader.loading">
      <Loading />
    </div>
    <div v-else>
      <div class="grid md:grid-cols-2 lg:grid-cols-4">
        <div></div>
        <div class="col-span-2 px-6">
          <div>
            <AddQuestion />
          </div>
          <div>
            <Post
              v-for="(post, index) in posts"
              :key="index"
              :Answer="post.text"
              :Question="post.question"
              :PostedBy="post.postedBy"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style>
html {
  background-color: #eeeeee;
}
</style>
