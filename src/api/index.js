
import axios from "axios"

export const client = axios.create({
  timeout: 1000,
  baseURL: "https://www.balldontlie.io",
})



export const imageClient = axios.create({
  timeout: 3000, 
  baseURL: "https://nba-players.herokuapp.com"
})