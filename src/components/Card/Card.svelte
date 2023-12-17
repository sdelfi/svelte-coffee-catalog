<script lang="ts">
  import type { CatalogItem } from "@/types/catalog.types";
  import { getRandomFlatColor } from "@/utils/color";

  export let item: CatalogItem;
</script>

<div class="card">
  <div class="card__image-container">
    <img src="https://loremflickr.com/500/500/coffee_bean" alt={item.name} class="card__image" />
  </div>

  <h1 class="card__title">{item.name}</h1>

  <div class="card__tags">
    <div class="card__tags-inner">
      {#each item.tags as tag}
        <span class="card__tag" style:background={getRandomFlatColor()}>{tag}</span>
      {/each}
    </div>
  </div>
</div>

<style lang="less">
  .card {
    padding: 30px;
    overflow: hidden;
    background: #fff;
    color: #000;
    height: 100%;

    &__image-container {
      height: 0;
      padding-bottom: 100%;
      margin-bottom: 20px;
      position: relative;
    }

    &__image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    &__title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 700;
    }

    &__tags {
      overflow-x: auto;
      margin-bottom: 20px;
    }

    &__tags-inner {
      gap: 10px;
      display: flex;
    }

    &__tag {
      padding: 5px 10px;
      white-space: nowrap;
    }
  }
</style>
