<script setup>
import { ref } from '@vue/reactivity';
import axios from 'axios'
import {getCookies} from '../../utils/utilities'

const cookies = getCookies()
const questionText = ref('');
const tag = ref('')

const addQuestion = async () => {
    const res = await axios.post(
    'http://localhost:5000/posts/addQuestion',
    {
      text : questionText.value,
      tag : tag.value === '' ? "General" : tag.value
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'token': cookies.token
      }
    }
  );
  questionText.value = ''
  tag.value = ''
};
</script>

<template>
  <div
    class="border border-slate-200 bg-white mx-auto w-full items-center px-2 py-2"
  >
    <div class="flex w-full">
      <img class="h-10" src="src/assets/user-icon.png" alt="" />
      <input
        v-model="questionText"
        class="h-10 w-full m-2 rounded-full"
        placeholder="What do you want to ask or share?"
        type="text"
      />
    </div>
    <div class="flex">
      <div class="items-center w-full flex">
        <h1 class="">Add a tag : </h1>
        <input class="h-8 m-2 rounded" placeholder="default : General" v-model="tag" type="text" />
      </div>
      <div @click="addQuestion" class=" border-green-200 border flex cursor-pointer w-full justify-center items-center text-lg rounded-full hover:bg-slate-200 text-center">
      <h1>
        Post Question
      </h1>

      </div>
    </div>
  </div>
</template>

<style></style>
