<script lang="ts">
  import Spinner from "@/components/Spinner/Spinner.svelte";

  export let isLoading: boolean = false;
  export let onClick: () => void = () => {};
</script>

<button class="load-button" class:load-button--disabled={isLoading} on:click={onClick} disabled={isLoading}>
  {#if isLoading}
    <Spinner />
  {:else}
    +
  {/if}
</button>

<style lang="less">
  .load-button {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background-color: var(--background-color-lighter);
    color: var(--color-light);
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;

    &--disabled {
      opacity: 0.5;
      padding: 10px;
    }
  }
</style>
