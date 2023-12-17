<script lang="ts">
  import Card from "@/components/Card/Card.svelte";
  import { catalog } from "@/stores/catalog";
  import { quintOut } from "svelte/easing";
  import { crossfade } from "svelte/transition";

  const [, receive] = crossfade({
    fallback(node) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
				`,
      };
    },
  });
</script>

<ul class="card-list">
  {#each $catalog as item (item.uid)}
    <li class="card-list__item" in:receive={{ key: item.uid }}>
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
