const API_URL = "https://usw1-desired-penguin-33329.upstash.io";
const API_TOKEN =
  "AYIxACQgMzFjZTk0ZjgtZTBkMy00MmI2LTkyZjMtZDNkZGJjNzk1YmQ0ODNkZDFkM2U0NTMwNDBhMmIyODkyMzdkNTI1YWU2MjU=";

export async function getOne(key) {
  const all = await getDB("users");
  const user = all.filter((user) => user.username == key);
  return user;
}

export async function getDB(key) {
  let all = [];
  let elements = await fetch(`${API_URL}/get/${key}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  }).then((response) => response.json());

  if (elements.result) {
    all = JSON.parse(elements.result);
  }

  return all;
}

export async function pushDB(key, data) {
  let dataTosend;
  const users = await getDB(key);

  if (users != undefined) {
    dataTosend = [...users, data];
  } else {
    dataTosend = [data];
  }

  return await sendData(dataTosend);
}

async function sendData(dataTosend) {
  return await fetch(`${API_URL}/set/users`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(dataTosend),
    method: "POST",
  })
    .then((response) => response.json())
    .catch((err) => err);
}

export async function updateDB(key, data) {
  const users = await getDB("users");
  //SIEMPRE PASEMOS EL USUARIO DIRECTAMENTE EN DATA, YA SEA PARA
  //ACTUALIZAR FAVORITOS O EL USUARIO EN SI
  const usersToUpdated = users.map((user) => {
    if (user.username == data.username) {
      return data;
    } else {
      return user;
    }
  });

  return await sendData(usersToUpdated);
}
