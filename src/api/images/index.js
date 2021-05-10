import { imageClient } from "../index"

export const getPlayerImage = (lastName, firstName) => {
  return imageClient.get(`/players/${lastName}/${firstName}`, {
    headers: { 'Content-Type': 'application/image'},
    responseType: 'blob',
    validateStatus: false,
  })
}
