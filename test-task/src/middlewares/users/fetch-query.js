const fetchQuery = () => {
  const promise = new Promise((resolve) => {
    resolve();
  });

  return (() =>
    promise
      .then(() => {

      })
  )()
}

export default fetchQuery;
