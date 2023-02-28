const db = require('../services/db');

const addMap = (uuid, mapName, creator, imageLink) => {
  const queryString = `INSERT INTO maps (id, map_name, creator, image_link) VALUES ("${uuid}", "${mapName}", "${creator}", "${imageLink}");`;

  return db.query(queryString)
    .then((res) => {
      return true
    })
    .catch((error) => {
      console.log(error);
    });
};

const addCategory = (mapID, label, colour) => {
  const queryString = `INSERT INTO categories (map_id, label, colour) VALUES ("${mapID}", "${label}", "${colour}")`

  return db.query(queryString)
    .catch((error) => {
      console.log(error)
    })
}

// might have to reconsider whether users can upload screenshots to pins
const addPin = (id, mapID, xCoordinate, yCoordinate, category, time, title, note, screenshot) => {
  const queryString = `INSERT INTO pins (id, map_id, x_coordinate, y_coordinate, category, time, title, note, screenshot) VALUES ("${id}", "${mapID}", "${xCoordinate}", "${yCoordinate}", "${category}", "${time}", "${title}", "${note}", "${screenshot}")`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

const getMap = async (uuid) => {
  const queryString = `SELECT * FROM maps WHERE id = "${uuid}"`

  return await db.query(queryString)
    .then((res) => {
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
  const queryString = `SELECT * FROM pins WHERE map_id = "${mapID}"`

  return await db.query(queryString)
    .then((res) => {
      if (res[0]) {
        return res && res.map((pin) => {
          const newPin = {
            ...pin,
            xCoordinate: pin.x_coordinate,
            yCoordinate: pin.y_coordinate,
            mapID: pin.map_id
          }
          delete newPin.x_coordinate
          delete newPin.y_coordinate
          delete newPin.map_id

          return newPin
        })
      }

      return null
    })
    .catch((error) => {
      console.log(error)
    })
}

const getCategoriesWithMapID = async (mapID) => {
  const queryString = `SELECT * FROM categories WHERE map_id = "${mapID}"`

  return await db.query(queryString)
    .then((res) => {
      if (res[0]) {
        return res
      }
      return null
    })
    .catch((error) => {
      console.log(error)
    })
}

const getMapPinsCategories = async (uuid) => {
  const map = await getMap(uuid)
  const pins = await getPinsWithMapID(uuid)
  const categories = await getCategoriesWithMapID(uuid)

  // console.log('map', map)
  // console.log('pins', pins)
  // console.log('category', categories)

  if (map) {
    return { map, pins, categories }
  }
}

const deletePin = (uuid) => {
  const queryString = `DELETE FROM pins WHERE id = "${uuid}"`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

const deleteCategory = (id) => {
  const queryString = `DELETE FROM categories WHERE id = "${id}"`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

const editPin = (id, category, time, title, note, screenshot) => {
  const queryString = `UPDATE pins SET category = "${category}", title = "${title}", note = "${note}", screenshot = "${screenshot}", time = "${time}" WHERE id = "${id}"`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

const movePin = (id, xCoordinate, yCoordinate,) => {
  const queryString = `UPDATE pins SET x_coordinate = "${xCoordinate}", y_coordinate = "${yCoordinate}" WHERE id = "${id}"`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
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
}