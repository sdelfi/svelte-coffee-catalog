<script lang="ts">
  import { catalog } from "@/stores/catalog";
  import { onDestroy, onMount } from "svelte";
  import CardList from "@/components/CardList/CardList.svelte";
  import LoadButton from "@/components/LoadButton/LoadButton.svelte";
  import { useInactiveChecker } from "@/hooks/useInactiveChecker";
  import { USER_INACTIVITY_TIMEOUT_MS } from "@/constants";
  import { notifications } from "@/stores/notifications";

  const { fetchItem, reset, isLoading, error } = catalog;

  onMount(fetchItem);
  onDestroy(reset);

  useInactiveChecker(() => fetchItem(), USER_INACTIVITY_TIMEOUT_MS);

  $: $error && notifications.danger($error);
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
      margin-bottom: 20px;
      padding: 0;
      font-size: 24px;
      font-weight: 400;
      text-align: center;
    }
  }
</style>
