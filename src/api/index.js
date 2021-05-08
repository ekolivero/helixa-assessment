
import axios from "axios"

const client = axios.create({
  timeout: 1000,
  baseURL: "https://www.balldontlie.io",
})

export default client;