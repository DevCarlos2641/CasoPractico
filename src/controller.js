const { getUser, getUsers, createUser, updateUser, deleteUser } = require('./service');

function handleRequest(method, path, body) {
  if(!path.includes('/api/user'))
    return buildResponse(405, { message: 'Method Not Allowed' });

  const parts = path.split('/')
  const id = parts[3];
  switch (method) {
    case 'GET':
      if (id) {
        const user = getUser(id);
        return user ? buildResponse(200, user) : buildResponse(404, { message: 'User not found' });
      } else {
        const users = getUsers();
        return buildResponse(200, users);
      }
    case 'POST':
      const response = createUser(body);
      return buildResponse(response.code, response.data);
    case 'PUT':
      if(!id) buildResponse(405, { message: 'Method Not Allowed' });
      const responseUpdate = updateUser(id, body);
      return buildResponse(responseUpdate.code, responseUpdate.data);
    case 'DELETE':
      if(!id) buildResponse(405, { message: 'Method Not Allowed' });
      const responseDelete = deleteUser(id);
      return buildResponse(responseDelete.code, responseDelete.data);
    default:
      return buildResponse(405, { message: 'Method Not Allowed' });
  }
}

function buildResponse(statusCode, body = null) {
  const statusText = {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    404: 'Not Found',
    405: 'Method Not Allowed',
  }[statusCode] || 'OK';

  const bodyStr = body ? JSON.stringify(body) : '';
  const headers = [
    `HTTP/1.1 ${statusCode} ${statusText}`,
    'Content-Type: application/json',
    `Content-Length: ${Buffer.byteLength(bodyStr)}`,
    '',
    bodyStr,
  ];

  return headers.join('\r\n');
}

module.exports = { handleRequest };
