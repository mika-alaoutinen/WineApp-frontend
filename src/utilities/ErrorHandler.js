/**
 * Handler for errors returned from the backend via axios calls.
 * For now, just log the error message.
 * @param {Object} http error returned by axios
 */
export function handleError({ data, ...error }) {
  const message = errorMessage(data.path, data.status)
  console.log(message)
  return message
}

function errorMessage(path, status) {
  switch (status) {
    case 400:
      return `Pyyntöä resurssiin ${path} ei pystytty käsittelemään.`
    case 401:
      return `Pääsy estetty resurssiin ${path}. Oletko kirjautunut sisään?`
    case 403:
      return `Pääsy estetty resurssiin ${path}. Oletko resurssin omistaja?`
    case 404:
      return `Resurssia ${path} ei löytynyt.`
    case 500:
      return `Palvelinvirhe resurssissa ${path}.`
    default:
      return `Tunnistamaton virhe ${status} resurssissa ${path}.`
  }
}