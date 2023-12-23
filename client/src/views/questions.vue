<script setup>
import { onMounted, onUpdated, ref } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Navbar from '../components/navbar.vue';
import { getCookies } from '../../utils/utilities';
import Post from '../components/post.vue';
import Questions from '../components/questions.vue';
import Loading from '../components/loading.vue';
import { useLoaderStore } from '../stores/loader';
import { usePostStore } from '../stores/posts';

const loader = useLoaderStore();
const posts = usePostStore();

const route = useRoute();
const cookies = getCookies();

const getAnswers = async () => {
  loader.loading = true;
  const res = await axios.post(
    `${import.meta.env.VITE_API}/posts/getAnswers`,
    {
      questionId: route.params.id
    },
    {
      headers: {
        'Content-Type': 'application/json',
        token: cookies.token
      }
    }
  );

  if (res.status === 200) {
    posts.list = res.data;
  }
  loader.loading = false;
};

onMounted(getAnswers());
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
            <div class="space-y-2">
              <Questions
                :question="route.params.text"
                :id="route.params.id"
                @submitAnswer="getAnswers()"
              />
            </div>
            <Post
              v-for="(post, index) in posts.list"
              :key="index"
              :answer="post"
              :question="post.question"
              :posted-by="post.postedBy"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
