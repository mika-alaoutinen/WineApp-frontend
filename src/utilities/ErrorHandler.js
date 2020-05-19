import { logout } from '@/services/AuthenticationService.js'

/**
 * Handler for errors returned from the backend via axios calls.
 * For now, just log the error message.
 * @param {Object} http error returned by axios
 */
export function handleError({ data, ...error }) {
  const { status, path } = data

  switch (status) {
    case 400:
      console.error(`Pyyntöä resurssiin ${path} ei pystytty käsittelemään.`)
      break
    case 401:
      logout() // purge expired JWT token from local storage
      console.error(`Pääsy estetty resurssiin ${path}. Oletko kirjautunut sisään?`)
      break
    case 403:
      console.error(`Pääsy estetty resurssiin ${path}. Oletko resurssin omistaja?`)
      break
    case 404:
      console.error(`Resurssia ${path} ei löytynyt.`)
      break
    case 500:
      console.error(`Palvelinvirhe resurssissa ${path}.`)
      break
    default:
      console.error(`Tunnistamaton virhe ${status} resurssissa ${path}.`)
      break
  }
}