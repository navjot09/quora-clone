<script setup>
import { getCurrentScope, onMounted, ref } from '@vue/runtime-core';
import axios from 'axios';
import Navbar from '../components/navbar.vue';
import Questions from '../components/questions.vue';
import { getCookies } from '../../utils/utilities';
import Loading from '../components/loading.vue';
import { useLoaderStore } from '../stores/loader';

const loader = useLoaderStore();

const questions = ref([]);

const cookies = getCookies();

onMounted(async () => {
  loader.loading = true;
  const res = await axios.post(
    'http://localhost:5000/posts/getAllQuestions',
    {},
    {
      headers: {
        token: cookies.token
      }
    }
  );
  questions.value = res.data;
  loader.loading = false;
});
</script>

<template>
  <div>
    <Navbar />
    <div v-if="loader.loading">
      <Loading />
    </div>
    <div v-else>
      <div class="grid md:grid-cols-2 lg:grid-cols-4">
        <div></div>
        <div class="col-span-2 px-6">
          <div class="space-y-2">
            <Questions
              v-for="(question, index) in questions"
              :key="index"
              :question="question.text"
              :id="question._id"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style></style>
