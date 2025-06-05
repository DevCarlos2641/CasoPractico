function parseRequest(data) {
  const [header, ...rest] = data.split('\r\n\r\n');
  const lines = header.split('\r\n');
  const [method, path] = lines[0].split(' ');
  let body = {};

  if (rest.length && rest[0]) {
    try {
      body = JSON.parse(rest.join('\r\n\r\n'));
    } catch (err) {
      body = {};
    }
  }

  return { method, path, body };
}

module.exports = { parseRequest };
