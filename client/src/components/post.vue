<script setup>


const props = defineProps({
  Question: Object,
  Answer: String,
  PostedBy : Object
});
</script>
<template>
  <div class="my-2 px-4 py-2 bg-white">
    <div class="flex">
      <div class="">
        <img class="h-12" src="@/assets/user-icon.png" alt="" />
      </div>
      <div class=" mx-2 font-semibold items-center flex">
        <h1>{{PostedBy.name }}</h1>
      </div>
    </div>
    <div class="py-2 font-bold text-lg">
      <router-link class=" hover:underline" :to="{name : 'Questions', params : {text : Question.text, id : Question.id}}"> {{ Question.text }} </router-link>
    </div>
    <div>
      <p>
        {{ Answer }}
      </p>
    </div>
    <div class=" my-2 flex">
      <div class="border py-1 pr-2 pl-1 w-fit rounded-full">
        <div class="inline">
            <fa class=" fa-xl px-2" style=""  icon="arrow-up" />
          <p class="inline">5</p>
        </div>

        <div class="inline mx-2 w-2 border"></div>
        <button>
            <fa class=" fa-xl px-2" style=""  icon="arrow-down" />
        </button>
      </div>
      <div class="mx-4 flex items-center">
        <fa class="fa-xl px-2" icon="comment" />
      </div>
    </div>
  </div>
</template>

<style></style>
