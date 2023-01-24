export const addMap = (uuid, mapName, creator, imageLink) => {
  const queryString = `INSERT INTO maps (uuid, map_name, creator, image_link) VALUES ("${uuid}", "${mapName}", "${creator}", "${imageLink}");`;

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
};

// might have to reconsider whether users can upload screenshots to pins
export const addPin = (xcoordinate, ycoordinate, colour, timestamp, title, note, screenshot) => {
  const queryString = `INSERT INTO pins (xcoordinate, ycoordinate, colour,  timestamp, title, note, screenshot) VALUES ("${xcoordinate}", "${ycoordinate}", ${colour}", "${title}", "${note}", "${timestamp}", "${screenshot}")`

  return db.query(queryString)
    .catch((error) => {
      console.log(error);
    });
}

export const getMap = (uuid) => {
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