<script lang="ts">
  import Card from "@/components/Card/Card.svelte";
  import { catalog } from "@/stores/catalog";
  import { scrollToBottom } from "@/utils/scrollToBottom";
  import { afterUpdate } from "svelte";
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  let container: HTMLElement;

  afterUpdate(() => {
    if (catalog) scrollToBottom(container);
  });

  $: if (catalog && container) {
    scrollToBottom(container);
  }
</script>

<ul class="card-list" bind:this={container}>
  {#each $catalog as item (item.uid)}
    <li class="card-list__item" in:scale={{ easing: quintOut }}>
      <Card {item} />
    </li>
  {/each}
</ul>

<style lang="less">
  .card-list {
    overflow: auto;
    --column-width: 100%;

    @media (min-width: 768px) {
      --column-width: 50%;
    }

    @media (min-width: 992px) {
      --column-width: 33.333%;
    }

    @media (min-width: 1200px) {
      --column-width: 25%;
    }

    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    margin: 0 -15px;

    &__item {
      flex: 0 0 var(--column-width);
      width: var(--column-width);
      padding: 0 15px;
      margin-bottom: 30px;
    }
  }
</style>
