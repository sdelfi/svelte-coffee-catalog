<script lang="ts">
  import './global.less';

  console.log('Index page');

  type Test = {
    color: string;
  };

  const test: Test = {
    color: 'white',
  };
</script>

<main style:color={test.color}>
  <div class="inner">Index page</div>
</main>

<style lang="less">
  main {
    background: blue;
    padding: 10px;

    .inner {
      text-align: center;
      background: cadetblue;
    }
  }
</style>
