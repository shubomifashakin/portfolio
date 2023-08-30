export function timeOut() {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      return reject(new Error("Request Took too long"));
    }, 1000 * 12);
  });
}
