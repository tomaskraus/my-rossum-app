/**
 * main module 
 */


const http = require('http')
const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

try {
    const credentialsManager = require("./src/middlewares/rossum-credentials-manager").create(logger);
    credentialsManager.getCredentials();


    const port = process.env.PORT || 3000

    const server = http.createServer((req, res) => {
        res.statusCode = 200
        logger.debug("hit")
        res.setHeader('Content-Type', 'text/html')

        res.end('<h1>Hello, World!</h1>')

    })

    server.listen(port, () => {
        logger.info(`Server running at port ${port}`)
    })

} catch (err) {
    logger.error(err.message)
}
