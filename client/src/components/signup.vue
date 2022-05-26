<script setup>
import { useUserStore } from '../stores/user.js';
import router from '../router/index.js';
import { ref } from 'vue';
import axios from 'axios';
const user = useUserStore();

const showError = ref(false);
const errorMessage = ref('');

function toggle() {
  document.getElementById("toggleButton").click();
}

const handleSignUp = async (e) => {
  e.preventDefault();
  const response = await axios.post('http://localhost:5000/createUser', {
    email: user.email,
    password: user.password,
    name: user.name
  });
  if (response.status === 200) {
    showError.value = false
    let d = new Date();
    d.setTime(d.getTime() + 1 * 4 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = 'token=' + response.data.token + ';' + expires;
    toggle()
    router.push({ name: 'Home' });
  } else if (response.status === 202) {
    showError.value = true;
    errorMessage.value = response.data.error;
  }
};
</script>

<template>
  <div class="flex justify-center">
    <button
      id="toggleButton"
      class="rounded-full hover:bg-slate-300 text-slate-500 hover:underline px-20 hover:text-slate-700"
      data-modal-toggle="authentication-modal"
    >
      signup with email
    </button>
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div class="py-6 px-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-gray-900">Sign Up</h3>
            <form class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Your Name</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your Name"
                  required=""
                  v-model="user.name"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Your email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Your Email"
                  required=""
                  v-model="user.email"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Your password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required=""
                  v-model="user.password"
                />
              </div>
              <div v-if="showError" class="space-x-2 flex text-red-700">
                <img
                  class="w-6 h-6"
                  src="https://cdn-icons-png.flaticon.com/512/179/179386.png"
                  alt=""
                />
                <h1>{{ errorMessage }}</h1>
              </div>
              <div class="flex justify-between"></div>
              <button
                @click="handleSignUp"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
 