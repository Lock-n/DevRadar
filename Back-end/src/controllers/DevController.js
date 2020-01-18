const axios = require('axios');
const { Dev } = require('../models');
const { parseStringAsArray } = require('../utils');

module.exports = {
  async store(request, response) {
    const { github_username, techs, location } = request.body;
    const techsArray = parseStringAsArray(techs);

    try {
      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const userData = (await axios.get(`https://api.github.com/users/${github_username}`)).data;

        // eslint-disable-next-line no-undef
        const { name = login, bio, avatar_url } = userData;

        const parsedLocation = {
          type: 'Point',
          coordinates: [location.lat, location.lon],
        };

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location: parsedLocation,
        });
      }

      return response.json(dev);
    } catch (e) {
      console.error(e);

      return response.json(e);
    }
  },
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
};
