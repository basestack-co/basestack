export function groupArrayOfObjects(list: Array<any>, key: string) {
  return list.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

// @ts-ignore
export function groupBy(xs, f) {
  return xs.reduce(
    // @ts-ignore
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {},
  );
}
