const express = require('express')
const app = express()
const port = 3003
const bodyParser = require('body-parser').json()
const db = require('./services/db');
var cors = require('cors')
const {
  addMap,
  addCategory,
  addPin,
  getMap,
  getPinsWithMapID,
  getMapPinsCategories,
  deletePin,
  deleteCategory,
  editPin,
  movePin
} = require('./utils/game-map-helpers')
app.use(cors())

var whitelist = ['http://10.0.0.116:3000', 'http://localhost:3000', 'https://game-map-react.vercel.app/']

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 
}

app.post('/addMap', [bodyParser, cors(corsOptions)], async (req, res) => {
  // console.log(req.body)
  const id = req.body.id;
  const mapName = req.body.mapName;
  const creator = req.body.creator;
  const imageLink = req.body.imageLink;

  
  if (await addMap(id, mapName, creator, imageLink)) {
    res.redirect(`https://game-map-react.vercel.app/${id}`)
  }
  //get mapname, creator, image link from req.body
  //generate uuid
  //save to sql using guid as key
  // res.send(uuid)
  res.redirect(`https://game-map-react.vercel.app/${id}`)
})

app.post('/addCategory', [bodyParser, cors(corsOptions)], (req, res) => {
  const mapID = req.body.mapID
  const label = req.body.label
  const colour = req.body.colour

  addCategory(mapID, label, colour)
  res.send()
})

app.post('/addPin', [bodyParser, cors(corsOptions)], (req, res) => {
  // console.log(req.body)
  const id = req.body.id;
  const mapID = req.body.mapID;
  const xCoordinate = req.body.xCoordinate;
  const yCoordinate = req.body.yCoordinate;
  const category = req.body.category;
  const time = req.body.time;
  const title = req.body.title;
  const note = req.body.note;
  const screenshot = req.body.screenshot || null;

  addPin(id, mapID, xCoordinate, yCoordinate, category, time, title, note, screenshot)
  res.send()
})

app.get("/getMap", async (req, res) => {
  // const { mapName, creator, imageLink } = getMap(req.query.uuid)
  // console.log(req.query)
  // console.log(getMap(req.params.uuid))
  const map = await getMap(req.query.uuid)
  // console.log('map', map)
  res.send(map)
})

app.get("/getPin", async (req, res) => {
  // const { mapName, creator, imageLink } = getMap(req.query.uuid)
  // console.log(req.query)
  // console.log(getMap(req.params.uuid))
  const pins = await getPinsWithMapID(req.query.mapID)
  res.send(pins)
})

app.get("/getMapPinsCategories", async (req, res) => {
  // console.log('query', req.query.uuid)
  const mapPinsCategories = await getMapPinsCategories(req.query.uuid)
  res.send(mapPinsCategories)
})

app.delete('/deletePin',  (req, res) => {
  deletePin(req.query.id)
  res.send()
})

app.put('/editPin', [bodyParser, cors(corsOptions)], (req, res) => {
  const id = req.body.id;
  const category = req.body.category;
  const time = req.body.time;
  const title = req.body.title;
  const note = req.body.note;
  // const screenshot = req.body.screenshot;
  
  editPin(id, category, time, title, note)
  res.send()
})

app.delete('/deleteCategory', (req, res) => {
  deleteCategory(req.query.id)
  res.send()
})

app.put('/movePin', (req, res) => {
  const id = req.body.id
  const xCoordinate = req.body.xCoordinate
  const yCoordinate = req.body.yCoordinate
  
  movePin(id, xCoordinate, yCoordinate)
  res.send()
})

app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})