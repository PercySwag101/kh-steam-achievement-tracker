<script lang="ts">
  import type { FinalResult } from "$lib/misc";
  import { ProgressRadial, Tab, TabGroup } from "@skeletonlabs/skeleton";
  import { BiSolidSad } from "svelte-icons-pack/bi";
  import { Icon } from "svelte-icons-pack";
  import AchievementItem from "$lib/AchievementItem.svelte";
  import { onMount } from "svelte";
  import { fetchingSteamData, steamUserName } from "$lib/stores";

  export let data;
  export let form: FinalResult;

  let allEmpty: boolean = false;

  let tab: number = 0;

  $: activeAchievementList = achievementsByTab(tab);

  const achievementsByTab = (test: number) => {
    if (form) {
      switch (test) {
        case 0:
          return form.achievements.kh1;
        case 1:
          return form.achievements.reCoM;
        case 2:
          return form.achievements.kh2;
        case 3:
          return form.achievements.bbs;
        case 4:
          return form.achievements.fragment;
        case 5:
          return form.achievements.ddd;
        case 6:
          return form.achievements.kh3;
        case 7:
          return form.achievements.remind;
        default:
          return form.achievements.kh1;
      }
    } else {
      return [];
    }
  };

  onMount(() => {
    if (data.steamName) {
      steamUserName.set(data.steamName);
    }

    if (form) {
      // Just a quick check to see if the user even has any KH games.
      if (
        form.achievements.bbs.length === 0 &&
        form.achievements.ddd.length === 0 &&
        form.achievements.kh3.length === 0
      ) {
        allEmpty = true;
      }
    }
  });
</script>

<div class="p-2 flex justify-center scroll">
  {#if form}
    {#if form.success}
      <TabGroup regionList="w-screen justify-center">
        <Tab bind:group={tab} name="kh1fm" value={0}>
          <span>KH1FM</span>
        </Tab>
        <Tab bind:group={tab} name="recom" value={1}>
          <span>re:CoM</span>
        </Tab>
        <Tab bind:group={tab} name="kh2fm" value={2}>
          <span>KH2FM</span>
        </Tab>
        <Tab bind:group={tab} name="bbs" value={3}>
          <span>BbS</span>
        </Tab>
        <Tab bind:group={tab} name="fragment" value={4}>
          <span>0.2</span>
        </Tab>
        <Tab bind:group={tab} name="ddd" value={5}>
          <span>DDD</span>
        </Tab>
        <Tab bind:group={tab} name="kh3" value={6}>
          <span>KH3</span>
        </Tab>
        <Tab bind:group={tab} name="remind" value={7}>
          <span>ReMind</span>
        </Tab>
        <svelte:fragment slot="panel">
          <dl class="list-dl">
            {#each activeAchievementList as achievement}
              <AchievementItem {achievement} />
            {/each}
          </dl>
        </svelte:fragment>
      </TabGroup>
    {:else}
      <aside class="alert variant-ghost-error w-1/2">
        <!-- Icon -->
        <Icon size={52} src={BiSolidSad} />
        <!-- Message -->
        <div class="alert-message">
          <h3 class="h3">Uh oh...</h3>
          <p>
            Something seems to have gone wrong...<br /> Make sure you put in the
            correct Steam name (the one shown in the URL, not your display name),
            and that your profile is public. If both of these are correct, let Aravix
            know.
          </p>
        </div>
      </aside>
    {/if}
  {/if}
</div>

<div class="info-thing p-2 flex flex-col justify-center items-center text-center">
  {#if allEmpty}
    <p>
      We found a profile, but it doesn't seem to have any Kingdom Hearts games.
    </p>
  {/if}
  {#if $fetchingSteamData}
    <ProgressRadial
      meter="stroke-primary-500"
      track="stroke-primary-500/30"
      value={undefined}
    />
    <p class="m-2">Hang on...<br /> we're fetching your data.</p>
  {/if}
</div>
