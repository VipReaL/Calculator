const config = {
  baseUrl: 'http://api.mathjs.org/v4/?expr=',
  headers: {
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 

function getCalculer(params) {
  return fetch(`${config.baseUrl}${params}`).then(res => getResponseData(res))
}

export { getCalculer };