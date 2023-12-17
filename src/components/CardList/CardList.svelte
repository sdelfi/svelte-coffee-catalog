<script lang="ts">
  import Card from "@/components/Card/Card.svelte";
  import { catalog } from "@/stores/catalog";
</script>

<ul class="card-list">
  {#each $catalog as item}
    <li class="card-list__item">
      <Card {item} />
    </li>
  {/each}
</ul>

<style lang="less">
  .card-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;

    margin: 0 -15px;

    &__item {
      flex: 0 0 25%;
      width: 25%;
      padding: 0 15px;
      margin-bottom: 30px;
    }
  }
</style>
