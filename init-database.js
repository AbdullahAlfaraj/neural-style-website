var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');


var connection = mongoose.createConnection("mongodb://localhost/myDatabase");


autoIncrement.initialize(connection);


var submitSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	outputName: String,
		// genre: String,
		publishDate: Date
	});

submitSchema.plugin(autoIncrement.plugin, 'Submit');
var Submit = connection.model('Submit', submitSchema);

function getNextCount(callback) {


	Submit.nextCount(function(err, count) {

			// count === 0 -> true 
			console.log("counter: ", count);
			var submit = new Submit();
			submit.save(function(err) {

				// submit._id === 0 -> true 
				
				if(err)
				{
					console.log(`error: updating the autoIncrement value of the submit collection =>\n count = ${count}`);
				}
				else{

					console.log("counter: ", count);


					callback(count);	
					//return count;
				}
				// submit.nextCount(function(err, count) {

					// count === 1 -> true 
					// console.log("counter: ", count);

				// });
			});
		});

}


// getNextCount();
module.exports = {


	


	 getNextCounter: getNextCount
	

}