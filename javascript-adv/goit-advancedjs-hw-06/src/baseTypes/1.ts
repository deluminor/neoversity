let age: number = 50;
let name: string = "Max";
let toggle: boolean = true;
let empty: null = null;
let notInitialize: undefined;
let callback: (a: number) => number = (a) => {
  return 100 + a;
};

export { age, callback, empty, name, notInitialize, toggle };
