import createServer from "../src/server/server"

const server = createServer()

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV

server.listen(PORT, () => {
  console.log(`Server is now running in ${ENV} mode at port ${PORT}`)
})



