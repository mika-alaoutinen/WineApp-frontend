import axios from 'axios'
import UrlBuilder, { createHeaders } from '@/utilities/UrlBuilder.js'

export async function getUsername() {
  return axios
    .get(UrlBuilder.user.paths.username, createHeaders())
    .then(result => result.data)
    .catch(error => console.error(error))
}