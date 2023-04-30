import { writable } from 'svelte/store';

// from https://www.youtube.com/watch?v=eDx9igpmRqM


export const authenticated = writable(false);
export const userData = writable({});
export const authLoadingStore = writable(false);