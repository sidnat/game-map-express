const express = require('express')
const app = express()
const port = 3003
const bodyParser = require('body-parser').json()
const { v4: uuidv4 } = require('uuid');
const db = require('./services/db');
var cors = require('cors')
const { 
  addMap,
  getMap,
  addPin,
  getPinsWithMapID,
  getMapAndPins
} = require('./game-map-helpers')
app.use(cors())

var corsOptions = {
  // origin: 'http://10.0.0.116:3000',
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.post('/addMap', [bodyParser, cors(corsOptions)], (req, res) => {
  console.log(req.body)
  const uuid = uuidv4();
  const mapName = req.body.mapName;
  const creator = req.body.creator;
  const imageLink = req.body.imageLink;

  addMap(uuid, mapName, creator, imageLink)
  //get mapname, creator, image link from req.body
  //generate uuid
  //save to sql using guid as key
  res.send()
})

app.post('/addPin', [bodyParser, cors(corsOptions)], (req, res) => {
  console.log(req.body)
  const uuid = uuidv4();
  const mapID = req.body.mapID;
  const xCoordinate = req.body.xCoordinate;
  const yCoordinate = req.body.yCoordinate;
  const colour = req.body.colour;
  const timestamp = req.body.timestamp; //YYYY-MM-DD HH:MI:SS
  const title = req.body.title;
  const note = req.body.note;
  const screenshot = req.body.screenshot;

  addPin(uuid, mapID, xCoordinate, yCoordinate, colour, timestamp, title, note, screenshot)
  res.send()
})

app.get("/getMap", async (req, res) => {
  // const { mapName, creator, imageLink } = getMap(req.query.uuid)
  // console.log(req.query)
  // console.log(getMap(req.params.uuid))
  const map = await getMap(req.query.uuid)
  console.log('map', map)
  res.send(map)

  // {
  //   id: '184b9f7a-91c2-48ab-953c-b0e3182f7280',
  //   map_name: 'rdr2',
  //   creator: 'dindang',
  //   image_link: 'www.google.com'
  // }
})

app.get("/getPin", async (req, res) => {
  // const { mapName, creator, imageLink } = getMap(req.query.uuid)
  // console.log(req.query)
  // console.log(getMap(req.params.uuid))
  const pins = await getPinsWithMapID(req.query.mapID)
  res.send(pins)

  // [
  //   {
  //     id: 0,
  //     map_id: 184,
  //     x_coordinate: 10,
  //     y_coordinate: 10,
  //     colour: '29f0ad',
  //     title: 'come back for treasure',
  //     note: '2023-01-24 16:42:32',
  //     timestamp: Invalid Date,
  //     screenshot: 'https://static01.nyt.com/images/2018/11/25/opinion/25SUDERMAN/25SUDERMAN-superJumbo.jpg?quality=75&auto=webp'
  //   }
  // ]
})

app.get("/getMapAndPins", async (req, res) => {
  console.log('query', req.query.uuid)
  const mapAndPins = await getMapAndPins(req.query.uuid)
  res.send(mapAndPins)

  // {
  //   map: {
  //     id: '184b9f7a-91c2-48ab-953c-b0e3182f7280',
  //     map_name: 'rdr2',
  //     creator: 'dindang',
  //     image_link: 'www.google.com'
  //   },
  //   pins: [
  //     {
  //       id: 0,
  //       map_id: 184,
  //       x_coordinate: 10,
  //       y_coordinate: 10,
  //       colour: '29f0ad',
  //       title: 'come back for treasure',
  //       note: '2023-01-24 16:42:32',
  //       timestamp: Invalid Date,
  //       screenshot: 'https://static01.nyt.com/images/2018/11/25/opinion/25SUDERMAN/25SUDERMAN-superJumbo.jpg?quality=75&auto=webp'
  //     }
  //   ]
  // }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})