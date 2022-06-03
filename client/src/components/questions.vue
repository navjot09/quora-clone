<script setup>
import {ref} from "vue"
import { getCookies } from '../../utils/utilities';
import axios from 'axios'
import { usePostStore } from '../stores/posts'

const posts = usePostStore()

const props = defineProps({ question: String, id: String});

const showAnswer = ref(false)
const answer = ref('')

const cookies = getCookies();

const handleSubmitAnswer = async() => {
    const res = await axios.post(
    'http://localhost:5000/posts/addAnswer',
    {
      text : answer.value,
      question : {
        text : props.question ,
        id : props.id
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'token': cookies.token
      }
    }
  );

  showAnswer.value = false
  answer.value = ''
  posts.list = [res.data, ...posts.list]
}

</script>
<template>
  <div
    class="border border-slate-200 shadow-sm bg-white mx-auto w-full items-center px-2 py-2"
  >
    <div class="py-2 font-bold text-lg">
      <router-link class=" hover:underline" :to="{name : 'Questions', params : { text: question, id : id}}"> {{ question}} </router-link>
    </div>
    <div class="grid">
      <h1
      v-if="!showAnswer" 
        @click="() => {showAnswer = true}"
        class="cursor-pointer rounded-full bg-slate-50 hover:bg-slate-200 w-auto text-center"
      >
        Answer
      </h1>
      <div class="" v-if="showAnswer">
        <textarea class=" w-full" v-model="answer"></textarea>
        <p>{{answer}}</p>
        <button class="border-black border rounded-lg p-1 mx-2 bg-green-300 hover:bg-green-400" @click="handleSubmitAnswer()">Submit Answer</button>
        <button class="border-black border rounded-lg p-1 mx-2 bg-red-300 hover:bg-red-400" @click="() => {showAnswer = false}">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style></style>
