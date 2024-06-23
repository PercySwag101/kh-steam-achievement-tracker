import { writable } from "svelte/store";

export const steamUserName = writable("");
export const fetchingSteamData = writable(false);