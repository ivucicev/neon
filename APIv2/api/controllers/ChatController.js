/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sendMessage: function(req, res) {
		if (req.isSocket && req.method === 'POST'){
			var data = req.params.all();
			if (!data.to || !data.from) return res.badRequest();
			var self = this;
			Conversation
				.findOne()
				.where({users: {contains: data.to}})
				.where({users: {contains: data.from}})
				.exec(function(err, conv) {
					if (err) return res.send(500, 'Error occured');
					if (conv) {
						//conversation already exists, create message
						self._createMessage(data.to, data.from, data.message, conv.id);
					} else {
						//conversation does not exist, create one
						Conversation.create({
							active: 1,
							users: [data.to, data.from],
							latestMessage: data.message,
							latestMessageFrom: data.from,
							isLatestMessageNew: 1
						}).exec(function(err, conv2) {
							if (err) res.send(500, 'Error occured');
							self._createMessage(data.to, data.from, data.message, conv2.id);
						});
					}
			});
		} return res.badRequest();
	},
	_createMessage: function(to, from, message, conversation) {
		Message.create({
			from: from,
			to: to,
			text: message,
			latestMessage: message,
			conversation: conversation
		}).exec(function(err, mess) {
			if (err) return res.send(500, 'Error occured');
			Conversation.update({id: conversation}, {latestMessage: message, latestMessageFrom: from, isLatestMessageNew: 1}).exec(function(err, updated) {});
			sails.sockets.broadcast(to, 'chat', {
				to: to,
				from: from,
				message: message,
				conversationId: conversation
			});
		});
	},
	subscribeForConversations: function(req, res) {
		if (req.isSocket) {
			sails.sockets.join(req, req.session.user.id, function(err) {
				if (err) return res.serverError(err);
				return res.json({
					message: 'Subscribed to '+req.session.user.id+'!'
				});
		    });
		} else {
			return res.badRequest();
		}
	},
	getConversationList: function(req, res) {
		Conversation.find()
		.where({users: {contains: req.session.user.id}})
		.exec(function(err, conv) {
			if (err) return res.send(500, 'Error occured');
			return res.json(200, conv);
		});
	},
	removeConversation: function(req, res) {
		var data = req.params.all();
		//delete all messages where from or to is me, dont actually delete them just set the flag...
		Message.update({conversation: data.id, from: req.session.user.id}, {fromDeleted: 1})
		.exec(function(err, deleted) {
			if (err) res.send(500, 'Error occured');
			Message.update({conversation: data.id, to: req.session.user.id}, {toDeleted: 1})
			.exec(function(err, deleted) {
				if (err) res.send(500, 'Error occured');
				Message.destroy({conversation: data.id, fromDeleted: "1", toDeleted: "1"})
				.exec(function(err) {
					if (err) res.send(500, 'Error occured');
					return res.json(200, {
						status: 1,
						deleted: 1
					});
				});
			});
		});
	},
	readMessages: function(req, res) {
		var data = req.params.all();
		Conversation.update({id: data.id}, {isLatestMessageNew: 0}).exec(function(err, upd) {});
		return res.send(200, "Messages Read");
	}
};

/**
 * user starts conversation with other users
 * conversation is not started until user sends message to other users
 * room name will be user1ID+user2ID
 * users subscribe to chat "chat"
 */
