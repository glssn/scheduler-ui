import { writable } from "svelte/store";

export const events = writable([])

export const dateRangeStore = writable([])

export const dateClickedStore = writable([])

export const datePickerRange = writable(false)