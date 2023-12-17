export const scrollToBottom = async (node: HTMLElement) => {
  window.scroll({ top: node.scrollHeight, behavior: "smooth" });
};
