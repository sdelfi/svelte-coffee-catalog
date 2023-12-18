<script lang="ts">
  import type { CatalogItem } from "@/types/catalog.types";
  import { randomFlatColor } from "@/utils/randomFlatColor";
  import Image from "@/components/Image/Image.svelte";
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
      <span class="card__tag" style:background={randomFlatColor()}>{tag}</span>
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

    display: flex;
    flex-direction: column;

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
      margin-bottom: 6px;
      font-size: 24px;
      font-weight: 700;
    }

    &__description {
      margin-bottom: 16px;
      font-size: 16px;
      line-height: 1.5;
    }

    &__tag-list {
      margin-top: auto;
      overflow-x: scroll;
      gap: 10px;
      display: flex;
      overscroll-behavior: contain;
      padding-bottom: 2px;

      scrollbar-width: 2px;
      scrollbar-color: var(--scrollbar-color) var(--scrollbar-color);

      &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
      }

      &::-webkit-scrollbar-track {
        background-color: var(--scrollbar-color);
      }

      &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
    }

    &__tag {
      padding: 5px 10px;
      white-space: nowrap;
      color: var(--text-color-inverse);
    }
  }
</style>
