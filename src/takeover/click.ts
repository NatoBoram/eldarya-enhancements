export async function click<T extends HTMLElement>(
  selector: string
): Promise<T> {
  return new Promise<T>((resolve) => {
    const interval = setInterval(() => {
      const element = document.querySelector<T>(selector);
      if (!element) return;
      clearInterval(interval);

      // Some elements don't have their click handlers ready until they're
      // hovered.
      const mouseEvent = document.createEvent("MouseEvent");
      mouseEvent.initEvent("mouseover");
      element.dispatchEvent(mouseEvent);

      setTimeout(() => {
        element.click();
        resolve(element);
      }, 800);
    }, 800);
  });
}
