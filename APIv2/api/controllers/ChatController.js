/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	newConversation: function(req, res) {
		var data = req.params.all();
		if(req.isSocket && req.method === 'POST'){
			// This is the message from connected client
			// So add new conversation
			Chat.create(data)
				.exec(function(error, data){
					console.log(data);
					Chat.publishCreate({id: data.id, message : data.message , user:data.user});
				});
		} else if(req.isSocket) {
			// subscribe client to model changes
			Chat.watch(req.socket);
			console.log( 'User subscribed to ' + req.socket.id );
		}
	}
};
