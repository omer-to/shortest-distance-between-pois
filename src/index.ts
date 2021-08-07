import http from 'http'

const port = 4000
http.get(`http://localhost:${port}`, res => {
      let pois = ''
      res.on('data', (chunk: Buffer) => {
            pois += chunk.toString()
      })
      res.on('end', () => {
            console.log(JSON.parse(pois))
      })
})