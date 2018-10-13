const axios = require('axios');

module.exports = {
  createPoll: (req, res) => {
		const { pollCode, pollURL, votesPerUser, allowDownVotes, isActive, allowChat, pollOptions, tiebreaker } = req.body;
    const adminUserId = req.session.user.id;
    const adminUsername = req.session.user.username;
    const adminDecidesTie = tiebreaker;
		const poll = { pollCode, pollURL, votesPerUser, allowDownVotes, isActive, allowChat, adminUserId, adminDecidesTie };
		req.db.polls.insert(poll)
		.then(poll => {
      const pollId = poll.pollId;
      req.db.join_poll(pollId, adminUsername)
			pollOptions.map(o => {
				let newOption = {
					pollId,
					pollOption: o,
				}
				req.db.pollOptions.insert(newOption);
			})
			res.status(200).send(`Success! Here's your Poll URL: ${poll.pollURL}`)
		})
		.catch(err => {
			console.error(err);
      if (err.code == 23505){
        res.status(400).send({ error: `Poll Code: '${pollCode}' already exists. Please generate a new Poll Code`})
      } else {
			res.status(500).send({ error: `Oopsies, you stepped in it, brother.`});
      }
		});
	},
  getPoll: (req, res) => {
    const { pollID } = req.params;
		req.db.get_poll(pollID)
			.then(result => res.status(200).send(result))
			.catch(err => {
				console.error(err);
				res.status(500).send({ error: err.message });
			})
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
				params: { latitude, longitude, radius, price, open_at, categories, limit: 50, sort_by: 'distance' }
			})
			.then(response => {
				res.status(200).send(response.data);
			})
			.catch(err => {
				console.error(err);
				res.status(500).send({ error: err.message });
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
				res.status(500).send({ error: err.message });
			});
		}
	},
  joinPoll: (req, res) => {
    const { pollID } = req.params;
        const { username } = req.body;
        req.session.user = {user: username};
    req.db.join_poll(pollID, username)
      .then(pollUser => {
        res.status(200).send(pollUser)
      })
      .catch(err => {
                if (err.code === '23505') {
                    res.status(400).send({ error: `Error. A user with the name: '${username}' has already joined the poll. Please use another name.`})
                } else {
        console.log(err);
                res.status(500).send(err);
                }
      })
  },
  vote: (req, res) => {
    const { pollID } = req.params;
    const username = req.session.user.username;
    req.db.check_pollUser_votes(pollID, username)
      .then(async ([ vote ]) => {
        if (vote.votesUsed < vote.votesPerUser) {
            const [ updatedVote ] = await req.db.update_user_vote(pollID, username)
            return res.status(200).send(updatedVote);
        }
        res.status(500).send({message: `User: ${username} has exhausted vote allotment for this poll.`})
      })
      .catch(err => {
				console.error(err);
        res.status(500).send({error: err.message});
      })
  },
  retrieveWinners: (req, res) => {
    const { pollID } = req.params;
    req.db.retrieve_poll_winners(pollID)
      .then(winners => {
        res.status(200).send(winners);
      })
      .catch(err => {
				console.error(err);
        res.status(500).send({ error: err.message });
      })
	},
	setWinner: (req, res) => {
		const { pollID } = req.params;
		const { winner } = req.body;
		req.db.setWinner(pollID, winner)
			.then(result => res.status(200).send({message: `winner has been set for poll: ${pollID}`}))
			.catch(err => {
				console.error(err);
        res.status(500).send({ error: err.message });
      })
	}
	
}