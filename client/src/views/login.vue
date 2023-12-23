<script setup>
import Signup from '../components/signup.vue';
import router from '../router/index';
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '../stores/user.js';

const user = useUserStore();

const showError = ref(false);
const errorMessage = ref('');

const handeLogIn = async () => {
  const response = await axios.post(`${import.meta.env.VITE_API}/auth/login`, {
    email: user.email,
    password: user.password
  });
  if (response.status === 200) {
    let d = new Date();
    d.setTime(d.getTime() + 1 * 4 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = 'token=' + response.data.token + ';' + expires;
    router.push({ name: 'Home' });
  } else if (response.status === 202) {
    showError.value = true;
    errorMessage.value = response.data.error;
  }
};
</script>

<template>
  <div
    class="flex bg-[url('@/assets/login-background.png')] items-center top-0 h-screen"
  >
    <div class="rounded-md bg-white border mx-auto p-10 w-fit">
      <div class="text-center align-middle text-xl">
        <img class="mx-auto h-20" src="src/assets/QuoraLogo.png" alt="" />
        <p>A place to share knowlege and better understand the world</p>
      </div>
      <div class="pt-4 text-lg mx-5">
        <h1 class="text-xl my-2">Login</h1>
        <hr class="pb-2" />
        <h1 class="">Email</h1>
        <input
          class="mt-2 h-10 rounded-sm w-72 border border-slate-300 hover:border-blue-700"
          type="email"
          name="email"
          placeholder=" Your Email"
          v-model="user.email"
        />

        <h1 class="pt-4">Password</h1>
        <input
          class="mt-2 mb-6 h-10 rounded-sm w-72 border border-slate-300 hover:border-blue-700"
          type="password"
          name="password"
          placeholder=" Your Password"
          v-model="user.password"
        />
        <div class="flex justify-between">
          <div v-if="showError" class="space-x-2 flex text-red-700">
            <img
              class="w-6 h-6"
              src="https://cdn-icons-png.flaticon.com/512/179/179386.png"
              alt=""
            />
            <h1>{{ errorMessage }}</h1>
          </div>

          <button
            type="submit"
            @click="handeLogIn"
            class="text-white bg-blue-300 border px-4 py-2 hover:bg-blue-700 rounded-full"
          >
            Login
          </button>
        </div>
        <Signup />
      </div>
    </div>
  </div>
</template>

<style></style>
