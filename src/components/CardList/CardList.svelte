<script lang="ts">
  import Card from "@/components/Card/Card.svelte";
  import { catalog } from "@/stores/catalog";
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";
</script>

<ul class="card-list">
  {#each $catalog as item (item.uid)}
    <li class="card-list__item">
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
