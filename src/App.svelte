<script lang="ts">
  import "./global.less";

  type AppProps = {
    textColor: string;
    text: string;
  };

  const appProps: AppProps = {
    textColor: "white",
    text: "Index page",
  };
</script>

<main style:color={appProps.textColor}>
  <div class="inner">{appProps.text}</div>
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
