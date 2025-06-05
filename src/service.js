let dataUser = [
  { id: 1, username: "carlos", email: "nose@gamil.com", status: "activo" },
  { id: 2, username: "us2", email: "us2@gamil.com", status: "pendiente" }
];

let contador = 3;

function getUser(id) {
  return dataUser.find(us => us.id == id);
}

function getUsers() {
  return dataUser;
}

function createUser(body) {
  const user = body;
  if (!user.username || !user.email || !user.status)
    return { code: 400, data: "Todos los campos son requeridos" };

  const idLast = contador++;
  user.id = idLast;
  dataUser.push(user);
  return { code: 201, data: user };
}

function updateUser(id, body) {
  const userNew = body;
  if (!userNew.username || !userNew.email || !userNew.status)
    return { code: 400, data: "Todos los campos son requeridos" };

  let user = dataUser.find(us => us.id == id);
  if (!user) return { code: 404, data: "Usuario no encontrado con id: " + id };

  user.username = userNew.username;
  user.email = userNew.email;
  user.status = userNew.status;

  dataUser = dataUser.map(us => (us.id == user.id ? user : us));
  return { code: 200, data: user };
}

function deleteUser(id) {
  const user = dataUser.find(us => us.id == id);
  if (!user) return { code: 404, data: "Usuario no encontrado con id: " + id };

  dataUser = dataUser.filter(us => us.id != id);
  return { code: 200, data: "Usuario eliminado" };
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
