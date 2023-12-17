<script lang="ts">
  import type { CatalogItem } from "@/types/catalog.types";
  import { getRandomFlatColor } from "@/utils/color";
  import Image from "../Image/Image.svelte";
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  export let item: CatalogItem;

  let element: HTMLDivElement;

  const onInAnimationEnd = () => {
    element?.scrollIntoView({ behavior: "smooth" });
  };
</script>

<div class="card" bind:this={element} in:scale={{ easing: quintOut }} on:introend={onInAnimationEnd}>
  <p class="card__image">
    <Image src={item.image.src} alt={item.name} caption={item.image.caption} />
  </p>

  <p class="card__location">{item.location}</p>

  <p class="card__title">{item.name}</p>

  <p class="card__description">{item.description}</p>

  <div class="card__tag-list">
    {#each item.tags as tag}
      <span class="card__tag" style:background={getRandomFlatColor()}>{tag}</span>
    {/each}
  </div>
</div>

<style lang="less">
  .card {
    padding: 15px;
    overflow: hidden;
    background: var(--background-color-inverse);
    color: var(--text-color-inverse);
    height: 100%;

    &__image {
      margin-bottom: 10px;
    }

    &__location {
      font-size: 14px;
      font-weight: 700;
      color: var(--color-primary);
      font-style: italic;
    }

    &__title {
      margin-bottom: 5px;
      font-size: 24px;
      font-weight: 700;
    }

    &__description {
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1.5;
    }

    &__tag-list {
      overflow-x: auto;
      gap: 10px;
      display: flex;
      overscroll-behavior: contain;
    }

    &__tag {
      padding: 5px 10px;
      white-space: nowrap;
    }
  }
</style>
