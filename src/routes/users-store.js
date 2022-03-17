import { writable } from 'svelte/store'

export const usersStore = writable([0, 1, 2])