<script lang="ts">
    import { getModalStore, type ModalSettings } from "@skeletonlabs/skeleton";
  
    const modalStore = getModalStore();
    const whatModal: ModalSettings = {
      type: "alert",
      title: "Instructions",
      body: `<p>You need to input your actual Steam ID or "custom URL". To find it you'll have to enter steam and click on your name in the top navigation to enter your profile.</p><br />
      <p>You'll then see the actual URL of your profile in the address bar. It should look either like "<b><i>steamcommunity.com/id/[id]</i></b>"" or "<b><i>steamcommunity.com/profiles/[id]</i></b>. Depends on if you have a custom URL set in your profile settings or not (I recommend doing this personally).</p>
      <p>You must also set your profile and game details to public in your profile settings.</p>
      <br />
      <p>I could most likely do a more proper integration, but I just used Steam's basic API for this quick thing.</p>
      <p>It's not the prettiest thing, but it gets the job done. If people actually use this I'll actually make it both look better and play more nicely.</p>`,
    };
  </script>
  
  <button
    on:click={() => {
      modalStore.trigger(whatModal);
    }}
    class="h5 italic underline">You can get more detailed instructions here.</button
  >
  
  <style>
    button {
      color: rgb(var(--color-primary-500));
    }
  </style>
  