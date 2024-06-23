<script lang="ts">
  import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  import { fetchingSteamData, steamUserName } from "./stores";

  const modalStore = getModalStore();
  const whatModal: ModalSettings = {
    type: "alert",
    title: "So... why?",
    body: `<p>The achievement lists for the Kingdom Hearts games are a mess on Steam.</p><br />
    <p>Take KH1.5+2.5 as an example - this is a collection featuring 6 games, 4 of which have their own sets of achievements. But they're all in the same list of almost <i>400 achievements</i>. There are even multiple achievements with the same name making it even harder to decipher what achievement is for what game at a glance.</p>
    <br />
    <p>As someone who wants to get all the achievements and is far too lazy to manually keep track of it in a spreadsheet I made this tool which splits up the achievements by game and uses your Steam profile to list what you've unlocked.</p><br />
    <p>It's not the prettiest thing, but it gets the job done. If people actually use this I'll actually make it look better and probably add filters and what not.</p>`,
  };
</script>

<div class="container h-full mx-auto flex justify-center items-center pt-5">
  <div class="space-y-3 text-center flex flex-col items-center">
    <h2 class="h2">Kingdom Hearts Steam Achievement Tracker</h2>
    <button
      on:click={() => {
        modalStore.trigger(whatModal);
      }}
      class="h5 italic underline">what is this?</button
    >
    <!-- / -->
    <div class="flex justify-center space-x-1">
      <p>
        Put your Steam name in below, submit, and we'll list your deets all
        nice-like.<br />
        Not your Steam <i>display name</i>. It's the one shown in the URL when you visit your profile.<br /><br />
        Keep in mind that your profile has to be public for this to work.
      </p>
    </div>
    <form method="post" action="/">
      <input
        bind:value={$steamUserName}
        name="steamname"
        class="input"
        type="text"
        placeholder="Steam name"
      />
      <button on:click={() => {
        fetchingSteamData.set(true);
      }} type="submit" class="btn variant-filled-surface m-2">Submit</button>
    </form>
  </div>
</div>

<style>
  button {
    color: rgb(var(--color-primary-500));
  }
</style>