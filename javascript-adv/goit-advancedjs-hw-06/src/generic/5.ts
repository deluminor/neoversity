interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = {
  key: "age",
  value: 21,
};

export { pair };
export type { KeyValuePair };
