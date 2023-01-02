const express = require('express')
const app = express()
const port = 3003
const bodyParser = require('body-parser').json()
const { v4: uuidv4 } = require('uuid');
const db = require('./services/db');
var cors = require('cors')

app.use(cors())
// install nodemon

var corsOptions = {
  // origin: 'http://10.0.0.116:3000',
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const addMap = (uuid, mapName, creator, imageLink) => {
  const queryString = `INSERT INTO maps (id, map_name, creator, image_link) VALUES ("${uuid}", "${mapName}", "${creator}", "${imageLink}");`;

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
};

const getMap = (uuid) => {
  const queryString = `SELECT * FROM maps WHERE id = ${uuid}`

  db.query(queryString)
    .then((res) => {
      console.log(res)

      //if successful return this obj {
//   mapName: 'asdofijdsoifjsd',
//   creator: 'aseosfijdsaoifj',
//   imageLink: 'https://i.imgur.com/NDfh3mb.jpg'
// }
    })
    .catch((error) => {
      console.log(error)
    })
}

app.post('/save', [bodyParser, cors(corsOptions)], (req, res) => {
  console.log(req.body)
  const uuid = uuidv4();
  const mapName = req.body.mapName;
  const creator = req.body.creator;
  const imageLink = req.body.imageLink;

  addMap(uuid, mapName, creator, imageLink)
  //get mapname, creator, image link from req.body
  //generate guid
  //save to sql using guid as key
  res.send()
})

app.get("/getMapData", (req, res) => {
  const { mapName, creator, imageLink } = getMap(req.params.uuid)
  console.log(getMap(req.params.uuid))

  // fix route so i properly get the sql data for specific uuid

  // need to use res.send(body)  

}) //retrieve particular database entry by UUID

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})