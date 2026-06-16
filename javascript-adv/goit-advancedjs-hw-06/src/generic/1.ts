function getPromise(): Promise<Array<string | number>> {
  return new Promise<Array<string | number>>((resolve) => {
    resolve(["Text", 50]);
  });
}

getPromise().then((data) => {
  console.log(data);
});

export { getPromise };
