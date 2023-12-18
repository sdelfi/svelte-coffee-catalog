<script>
  import { notifications } from "@/stores/notifications";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
</script>

<div class="notifications">
  {#each $notifications as { type, id, message } (id)}
    <div animate:flip class="notifications__toast notifications__toast--type-{type}" transition:fly={{ y: 30 }}>
      <div class="notifications__content">{message}</div>
    </div>
  {/each}
</div>

<style lang="less">
  .notifications {
    position: fixed;
    top: 10px;
    left: auto;
    right: 10px;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;

    &__toast {
      flex: 0 0 auto;
      margin-bottom: 10px;

      &--type- {
        &danger {
          background: var(--notification-color-danger);
        }

        &success {
          background: var(--notification-color-success);
        }

        &warning {
          background: var(--notification-color-warning);
        }

        &info {
          background: var(--notification-color-info);
        }

        &default {
          background: var(--notification-color-default);
        }
      }
    }

    &__content {
      padding: 10px;
      display: block;
      color: var(--color-light);
      font-weight: 500;
    }
  }
</style>
