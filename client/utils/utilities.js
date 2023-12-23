function validateEmail(email) {
  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return regex.test(email);
}

function getCookies() {
  const cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value)
      }),
      {}
    );
  return cookies;
}

export { getCookies, validateEmail };
