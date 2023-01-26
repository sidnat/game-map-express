const db = require('./services/db');

const addMap = (uuid, mapName, creator, imageLink) => {
  const queryString = `INSERT INTO maps (id, map_name, creator, image_link) VALUES ("${uuid}", "${mapName}", "${creator}", "${imageLink}");`;

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
};

// might have to reconsider whether users can upload screenshots to pins
const addPin = (uuid, mapID, xCoordinate, yCoordinate, colour, timestamp, title, note, screenshot) => {
  const queryString = `INSERT INTO pins (id, map_id, x_coordinate, y_coordinate, colour,  timestamp, title, note, screenshot) VALUES ("${uuid}", "${mapID}", "${xCoordinate}", "${yCoordinate}", "${colour}", "${title}", "${note}", "${timestamp}", "${screenshot}")`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

const getMap = async (uuid) => {
  const queryString = `SELECT * FROM maps WHERE id = "${uuid}"`

  return await db.query(queryString)
    .then((res) => {
      // console.log('res', res[0])
      if (res[0]) {
        return res[0]
      }

      return null
    })
    .catch((error) => {
      console.log(error)
    })
}

const getPinsWithMapID = async (mapID) => {
  const queryString = `SELECT * FROM pins where map_id = "${mapID}"`

  return await db.query(queryString)
    .then((res) => {
      // console.log(res)
      if (res[0]) {
        return res
      }

      return null
    })
    .catch((error) => {
      console.log(error)
    })
}

module.exports = {
  addMap,
  getMap,
  addPin,
  getPinsWithMapID
}