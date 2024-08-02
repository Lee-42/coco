/**
 * find ancestor by class name
 * @param element
 * @param className
 * @returns
 */
export const findAncestorByClass = (
  element: HTMLElement | null,
  className: string
): HTMLElement | null => {
  let currentElement = element
  while (currentElement) {
    if (currentElement.classList.contains(className)) {
      return currentElement
    }
    currentElement = currentElement.parentElement
  }
  return null
}
