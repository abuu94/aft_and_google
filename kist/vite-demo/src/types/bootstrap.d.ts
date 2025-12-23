declare module "bootstrap" {
  export class Modal {
    constructor(element: Element, options?: any);
    static getOrCreateInstance(element: Element): Modal;
    show(): void;
    hide(): void;
    toggle(): void;
  }

  export class Tooltip {
    constructor(element: Element, options?: any);
    static getOrCreateInstance(element: Element): Tooltip;
    show(): void;
    hide(): void;
    dispose(): void;
  }

  // Add other Bootstrap components as needed (Dropdown, Collapse, etc.)
}
