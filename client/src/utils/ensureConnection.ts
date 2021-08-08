import net from 'net'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

let retryIntervalMS = 5000,
      maxRetry = 3;


export function ensureConnection(main: () => void) {
      maxRetry -= 1

      const socket = net.createConnection(4000, 'backend')

      socket.on('close', async (hadError) => {

            if (hadError) {
                  if (!maxRetry) {
                        console.log('Maximum reconnection tries have been exceeded.')
                        process.exit(1)
                  }
                  await sleep(retryIntervalMS)
                  console.log('Retrying connection.')
                  ensureConnection(main)
            } else {
                  console.log('The connection is destroyed.')
                  main()
            }
      })

      socket.on('connect', () => {
            console.log('PORT 4000 is accepting connections.')
            console.log('Destroying the connection.')
            socket.destroy()
      })

      // Attach an error handler to prevent node processing to exit.
      socket.on('error', () => { })
}