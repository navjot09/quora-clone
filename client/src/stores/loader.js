import { defineStore } from "pinia"

export const useLoaderStore = defineStore({
    id : "loading",
    state : () => ({
        loading : false,
    })
})