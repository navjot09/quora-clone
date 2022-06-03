<script setup></script>

<template>
  <div class="sticky top-0 w-full bg-white mb-6">
    <nav
      class="items-center flex-wrap justify-center space-x-4 flex border-b-2 shadow-sm"
    >
      <img class="h-12 cursor-pointer" src="@/assets/QuoraLogo.png" alt="" />
      <div
        class="hidden justify-between items-center w-full md:flex md:w-auto"
        id="mobile-menu-4"
      >
        <ul class="flex flex-col md:flex-row">
          <li class="mx-auto">
            <router-link class="text-3xl" active-class="text-red-600 border-b-2 border-red-600" to="/home">
              <fa class="mx-6" icon="house" />
            </router-link>
          </li>
          <li class="mx-auto">
            <router-link active-class="text-red-600 border-b-2 border-red-600" class=" text-3xl" to="/answer">
              <fa class=" mx-6" icon="pen-to-square" />
            </router-link>
          </li>
          <li class="mx-auto">
            <router-link class=" text-3xl" to="">
              <fa
                class="mx-6"
                :icon="['far', 'bell']"
              />
            </router-link>
          </li>
        </ul>
      </div>
      <input
        class="h-8 w-64 border-slate-300 hover:border-blue-600"
        type="text"
        placeholder="Search Quora"
      />
        <img class="h-8" src="@/assets/user-icon.png" alt="" />
      <button
        data-collapse-toggle="mobile-menu-4"
        type="button"
        class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="mobile-menu-4"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <svg
          class="hidden w-6 h-6"
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
    </nav>
  </div>
</template>

<style scoped>
</style>
