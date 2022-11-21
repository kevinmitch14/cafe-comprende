export {};

declare global {
  interface Window {
    initService: () => void;
  }
}
