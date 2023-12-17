<script lang="ts">
  import { onMount } from "svelte";
  import Spinner from "@/components/Spinner/Spinner.svelte";

  export let src: string;
  export let alt: string = "";
  export let caption: string = "";

  let isLoading: boolean = true;

  onMount(() => {
    const img = new Image();
    img.src = src;
    isLoading = true;

    img.onload = () => {
      isLoading = false;
    };

    img.onerror = () => {
      isLoading = false;
    };
  });
</script>

<figure class="image" class:image--loading={isLoading}>
  {#if isLoading}
    <div class="image__spinner">
      <Spinner />
    </div>
  {/if}
  <img {src} {alt} class="image__img" />
  {#if caption}
    <figcaption class="image__caption">{caption}</figcaption>
  {/if}
</figure>

<style lang="less">
  .image {
    --spinner-color: var(--color-primary);

    height: 0;
    padding-bottom: 100%;
    position: relative;

    &--loading {
      background: var(--color-light-gray);

      .image__img {
        opacity: 0;
      }
    }

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
      opacity: 1;
      transition: opacity 0.5s ease-in-out;
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
