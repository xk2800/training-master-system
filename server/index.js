import fs from 'fs'
import cors from 'cors'
import express from 'express'
import body_parser from 'body-parser'
import { databaseConnectTest } from './db.js'
import { port } from './config.js'
import postDownload from './routes/get/post-download.js'

const server = express();

const targets = ['post', 'delete', 'get', 'put'];
server.targets = {};

/* Importing all API routes */
for (const target of targets) {
  fs
    .readdirSync(`./routes/${target}`)
    .filter(file => file.endsWith('.route.js'))
    .map(async file => {
      const { default: controller } = await import(`./routes/${target}/${file}`).catch(r => {
        console.log(`Error when importing route: ${target}/${file}`)
        console.log(`Reason: ${r}`)
      })
      const name = file.split('.')[0]
      if (!server.targets[target]) server.targets[target] = {}
      server.targets[target][name] = controller
      console.log(`Imported API: ${target}/${name}`)
    });
}

server.use(body_parser.json());
server.use(body_parser.urlencoded({ extended: true }));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

/* Handling incoming requests */
server.all('/:param', (req, res) => {
  const method = server.targets[req.method.toLowerCase()]
  if (method) {
    const controller = method[req.params.param]
    if (controller) {
      controller(req, res)
    } else {
      res.status(404).send('API not found')
    }
  } else {
    res.status(405).send('Unsupported method')
  }
});

server.get('/post/:id', postDownload);

/* Test database connectivity */
databaseConnectTest()
server.listen(port, () => {
  console.log(`API listening at port ${port}`)
})
