const express = require('express')
const app = express()


//middlewares
app.use(express.static('public'))


//Listen on port 3000
server = app.listen(3000);


const Sentiment = require('sentiment');
const sentiment = new Sentiment();


const io = require("socket.io")(server)


io.on('connection', function (socket) {
	  socket.on('chat message', function(msg){

		const result = sentiment.analyze(msg);
		const comparative = result.comparative;
		const tone =
		    comparative >= 0 ? (comparative >= 1 ? 'positive' : 'neutral') : 'negative';
	    const data = {
		    msg,
		    sentiment: {
		      tone,
		      score: result.score,
		    },
		  };
        io.emit('chat message', data);
      });
});



