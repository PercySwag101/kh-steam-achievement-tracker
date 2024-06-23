<script lang="ts">
  import type { AssembledAchievement } from "./server/misc";

  export let achievement: AssembledAchievement;
</script>

<div class={`item ${achievement.unlocked ? "unlocked" : "locked"}`}>
  <img
    width="52"
    src={achievement.unlocked ? achievement.icon : achievement.lockedIcon}
    alt="Achievement icon"
  />
  <span class="flex-auto">
    <dt>{achievement.name}</dt>
    <dt>{achievement.description ? achievement.description : ""}</dt>
  </span>
</div>

<style>
  .item {
    border-radius: 0;
    border-style:groove;
    border-width: 0.2em;
    border-color: rgb(var(--color-surface-500));
  }

  .unlocked {
    background-color: rgba(71, 125, 59, 0.5);
  }

  .locked {
    background-color: rgba(48, 48, 48, 0.5);
  }
</style>
