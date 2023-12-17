<script lang="ts">
  import { onMount } from "svelte";
  import Spinner from "@/components/Spinner/Spinner.svelte";
  import { fade } from "svelte/transition";

  export let src: string;
  export let alt: string = "";
  export let caption: string = "";

  let loaded = false;
  let failed = false;
  let isLoading: boolean = false;

  onMount(() => {
    const img = new Image();
    img.src = src;
    isLoading = true;

    img.onload = () => {
      isLoading = false;
      loaded = true;
    };

    img.onerror = () => {
      isLoading = false;
      failed = true;
    };
  });
</script>

<figure class="image">
  {#if isLoading}
    <div class="image__spinner">
      <Spinner />
    </div>
  {:else}
    <img {src} {alt} class="image__img" in:fade={{ duration: 500 }} />
    {#if caption}
      <figcaption class="image__caption">{caption}</figcaption>
    {/if}
  {/if}
</figure>

<style lang="less">
  .image {
    --spinner-color: var(--color-primary);

    height: 0;
    padding-bottom: 100%;
    position: relative;

    &__spinner {
      position: absolute;
      top: calc(50% - 25px);
      left: calc(50% - 25px);
      width: 50px;
      height: 50px;
    }

    &__img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &__caption {
      position: absolute;
      right: 0;
      top: 0;
      color: var(--color-light);
      background: var(--background-color);
      padding: 5px 10px;
    }
  }
</style>
