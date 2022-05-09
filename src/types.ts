export {};

declare global {
  namespace Types {
    interface State {
      form: Record<"value", string>;
    }
  }
}
