<script lang="ts">
  import "../app.postcss";
  import {
    AppShell,
    AppBar,
    initializeStores,
    Modal,
  } from "@skeletonlabs/skeleton";

  // Floating UI for Popups
  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow,
  } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  import PageHeader from "$lib/PageHeader.svelte";
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores();
</script>

<!-- App Shell -->
<Modal />
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <div></div>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a
          class="btn btn-sm variant-ghost-surface"
          href="https://aravix.dev/"
          target="_blank"
          rel="noreferrer"
        >
          aravixdev
        </a>
        <a
          class="btn btn-sm variant-ghost-surface"
          href="https://github.com/aravikusu"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <svelte:fragment slot="pageHeader">
    <PageHeader />
    <hr />
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
