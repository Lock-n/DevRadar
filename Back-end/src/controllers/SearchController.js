const { Dev } = require('../models');
const { parseStringAsArray } = require('../utils');

module.exports = {
  async index(request, response) {
    const { lat, lon, techs } = request.query;
    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lat, lon],
          },
          $maxDistance: 10000,
        },
      },
    });
    return response.json({ devs });
  },
};
