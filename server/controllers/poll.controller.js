const axios = require('axios');

module.exports = {
<<<<<<< HEAD
	createPoll: (req, res) => {
		res.status(200).send('create poll route');
	},
	getPoll: (req, res) => {
		const { pollID } = req.params;
		res.status(200).send(`get poll route pollID: ${pollID}`);
	},
	editPoll: (req, res) => {
		const { pollID } = req.params;
		res.status(200).send(`edit poll route pollID: ${pollID}`);
	},
	search: (req, res) => {
		const yelpBaseUrl = `https://api.yelp.com/v3/businesses`;
		const { latitude, longitude, radius, categories, price, open_at } = req.query;
		console.log(req.query);
		axios
			.get(`${yelpBaseUrl}/search`, {
				headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}` },
				params: { latitude, longitude, radius, categories, price, open_at, limit: 50 }
			})
			.then((response) => {
				res.status(200).send(response.data);
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send({ error: `Oopsies, you stepped in it, brother.` });
			});
	}
};
=======
  createPoll: (req, res) => {
    res.status(200).send('create poll route')
  },
  getPoll: (req, res) => {
    const { pollID } = req.params;
    res.status(200).send(`get poll route pollID: ${pollID}`)
  },
  editPoll: (req, res) => {
    const { pollID } = req.params;
    res.status(200).send(`edit poll route pollID: ${pollID}`)
  },
  search: (req, res) => {
    const yelpBaseUrl = `https://api.yelp.com/v3/businesses`
    const { latitude, longitude, radius, categories, price, open_at } = req.query;
    console.log(req.query);
    axios.get(`${yelpBaseUrl}/search`, {
      headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}`},
      params: { latitude, longitude, radius, categories, price, open_at, limit: 50 }
    })
    .then(response => {
      res.status(200).send(response.data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: `Oopsies, you stepped in it, brother.`});
    });
  }
  
}
>>>>>>> master
