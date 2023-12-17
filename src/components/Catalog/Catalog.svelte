<script lang="ts">
  import { catalog } from "@/stores/catalog";
  import { onDestroy, onMount } from "svelte";
  import CardList from "@/components/CardList/CardList.svelte";
  import LoadButton from "@/components/LoadButton/LoadButton.svelte";

  const { fetchItem, reset, isLoading } = catalog;

  onMount(fetchItem);
  onDestroy(reset);

  // TODO: запускать только если пользователь ничего не делал в течение 30 секунд
  setInterval(() => {
    fetchItem();
  }, 30000);
</script>

<div class="catalog">
  <h1 class="catalog__title">Coffee Catalog</h1>
  <CardList />
  <LoadButton onClick={fetchItem} isLoading={$isLoading} />
</div>

<style lang="less">
  .catalog {
    padding: 20px 40px;

    &__title {
      margin: 0 0 20px;
      padding: 0;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
    }
  }
</style>
