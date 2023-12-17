<svg class="spinner" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle class="spinner__circle" cx="8" cy="8" r="7" stroke-width="2" />
</svg>

<style lang="less">
  .spinner {
    color: var(--color, #fff);
    width: 100%;
    height: 100%;
    overflow: visible;
    animation: rotation 1455ms infinite linear;

    &__circle {
      stroke: currentColor;
      stroke-dasharray: 44px;
      stroke-dashoffset: 11px;
      transform-origin: center;
      transform: rotatey(180deg) rotate(90deg);
      animation: spinner 3850ms infinite ease;
    }
  }

  @keyframes spinner {
    0% {
      stroke-dashoffset: 33px;
      transform: rotatey(0deg) rotate(0deg);
    }
    24.9999% {
      stroke-dashoffset: 11px;
      transform: rotatey(0deg) rotate(0deg);
    }
    25% {
      stroke-dashoffset: 11px;
      transform: rotatey(180deg) rotate(270deg);
    }
    49.9999% {
      stroke-dashoffset: 33px;
      transform: rotatey(180deg) rotate(270deg);
    }
    50% {
      stroke-dashoffset: 33px;
      transform: rotatey(0deg) rotate(180deg);
    }
    74.9999% {
      stroke-dashoffset: 11px;
      transform: rotatey(0deg) rotate(180deg);
    }
    75% {
      stroke-dashoffset: 11px;
      transform: rotatey(180deg) rotate(90deg);
    }
    100% {
      stroke-dashoffset: 33px;
      transform: rotatey(180deg) rotate(90deg);
    }
  }

  @keyframes rotation {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
