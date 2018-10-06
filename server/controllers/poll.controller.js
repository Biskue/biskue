const axios = require('axios');

module.exports = {
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
		if(!req.query.term) {
			const { latitude, longitude, radius, categories, price, open_at } = req.query;
			axios.get(`${yelpBaseUrl}/search`, {
				headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}`},
				params: { latitude, longitude, radius, price, open_at, categories: 'restaurants,' + categories, limit: 50, sort_by: 'distance' }
			})
			.then(response => {
				res.status(200).send(response.data);
			})
			.catch(err => {
				console.error(err);
				res.status(500).send({ error: `Oopsies, you stepped in it, brother.`});
			});	
		} else {
			const { latitude, longitude, term } = req.query;
			axios.get(`${yelpBaseUrl}/search`, {
				headers: { Authorization: `Bearer ${process.env.YELP_API_KEY}`},
				params: { latitude, longitude, term, categories: 'restaurants', limit: 50, sort_by: 'distance' }
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
  
}
