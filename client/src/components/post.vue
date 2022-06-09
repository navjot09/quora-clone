<script setup>
import { ref } from '@vue/reactivity';
import { onMounted, useAttrs } from '@vue/runtime-core';
import axios from 'axios';
import { getCookies } from '../../utils/utilities';

const cookies = getCookies();
const props = defineProps({
  question: Object,
  answer: Object,
  postedBy: Object
});

const isUpvote = ref(false);
const isDownvote = ref(false);
const showModal = ref(false);
const upvoteCount = ref(props.answer.upvotes);
const upvotesList = ref([]);

onMounted(() => {
  isUpvoted()
  isDownvoted()
});

const isUpvoted = async () => {
  const res = await axios.post(
    'http://localhost:5000/votes/isUpvoted',
    {
      answerId: props.answer._id
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );
  if(res.status === 200){
    isUpvote.value = res.data.isUpvoted;
  }
};

const isDownvoted = async () => {
  const res = await axios.post(
    'http://localhost:5000/votes/isDownvoted',
    {
      answerId: props.answer._id
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );
  if(res.status === 200){
    isDownvote.value = res.data.isDownvoted;
  }
};

const openModal = () => {
  showModal.value = true;
  getAllUpvotes();
};

const closeModal = () => {
  showModal.value = false;
};

const getAllUpvotes = async () => {
  const res = await axios.post(
    'http://localhost:5000/votes/allUpvotes',
    {
      answerId: props.answer._id
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );

  if(res.status === 200){
    upvotesList.value = res.data;
  }
};

const upvote = async () => {
  removeDownvote()
  isUpvote.value = true;
  upvoteCount.value += 1;
  const res = await axios.post(
    'http://localhost:5000/votes/upvote',
    {
      answerId: props.answer._id,
      upvotes: upvoteCount.value
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );
};

const downvote = async () => {
  removeUpvote()
  isDownvote.value = true;
  const res = await axios.post(
    'http://localhost:5000/votes/downvote',
    {
      answerId: props.answer._id,
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );
};

const removeDownvote = async () => {
  isDownvote.value = false;
  const res = await axios.post(
    'http://localhost:5000/votes/removeDownvote',
    {
      answerId: props.answer._id,
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );
};

const removeUpvote = async () => {
  if(isUpvote.value){
    upvoteCount.value -= 1;
  }
  isUpvote.value = false;
  const res = await axios.post(
    'http://localhost:5000/votes/removeUpvote',
    {
      answerId: props.answer._id,
      upvotes: upvoteCount.value
    },
    {
      headers: {
        token: cookies.token
      }
    }
  );
};
</script>
<template>
  <div class="my-2 px-4 py-2 bg-white">
    <div class="flex">
      <div class="">
        <img class="h-12" src="@/assets/user-icon.png" alt="" />
      </div>
      <div class="mx-2 font-semibold items-center flex">
        <h1>{{ postedBy.name }}</h1>
      </div>
    </div>
    <div class="py-2 font-bold text-lg px-2">
      <router-link
        class="hover:underline"
        :to="{
          name: 'Questions',
          params: { text: question.text, id: question.id }
        }"
      >
        {{ question.text }}
      </router-link>
    </div>
    <div>
      <p class="p-2">
        {{ answer.text }}
      </p>
    </div>
    <div class="my-2 flex">
      <div class="border py-1 pr-2 pl-1 w-fit rounded-full">
        <button v-if="!isUpvote" @click="upvote" class="inline">
          <fa class="fa-xl px-2 text-slate-400" style="" icon="arrow-up" />
          <p class="inline">{{ upvoteCount }}</p>
        </button>
        <button v-else @click="removeUpvote" class="inline">
          <fa class="fa-xl px-2 text-red-600" style="" icon="arrow-up" />
          <p class="inline">{{ upvoteCount }}</p>
        </button>

        <div class="inline mx-2 w-2 border"></div>
        <button v-if="!isDownvote" @click="downvote">
          <fa class="fa-xl px-2 text-slate-400" style="" icon="arrow-down" />
        </button>
        <button v-else @click="removeDownvote">
          <fa class="fa-xl px-2 text-black" style="" icon="arrow-down" />
        </button>
      </div>
      <button
        class="px-2 text-sm text-slate-500 hover:text-black hover:underline"
        @click="openModal"
      >
        View {{ upvoteCount }} upvotes
      </button>
      <div
        class="bg-slate-500 bg-opacity-60 inset-0 fixed w-full h-screen flex items-center justify-center"
        @click="closeModal"
        v-show="showModal"
      >
        <div @click.stop class="overflow-x-auto w-1/3 h-1/2 bg-white">
          <div class="py-2 px-2 flex justify-between w-full border-b-2">
            <h1 class="text-2xl">Upvotes</h1>
            <button
              @click="closeModal"
              class="rounded-full flex items-center hover:bg-slate-200"
            >
              <fa class="mx-6" icon="xmark" />
            </button>
          </div>
          <div class="p-2 text-lg">
            <ul
              class="my-2"
              v-for="(upvote, index) in upvotesList"
              :key="index"
            >
              <li class="flex">
                <img class="h-8" src="@/assets/user-icon.png" alt="" />
                <h1>
                  {{ upvote.upvoteBy.name }}
                </h1>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="mx-4 flex items-center">
        <fa class="fa-xl px-2" :icon="['far', 'comment']" />
      </button>
    </div>
  </div>
</template>

<style></style>
