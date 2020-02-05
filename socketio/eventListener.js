const Message = require('../models/Message')
const User = require('../models/User')

module.exports = function(io) {
  io.sockets.on('connection', function(socket) {
    // console.log('connected')

    socket.on('disconnect', function() {
      // console.log('disconnected')
    })

    socket.on('startTypingMessage', function(data) {
      io.emit('startTypingMessage', data)
    })

    socket.on('stopTypingMessage', function(data) {
      io.emit('stopTypingMessage', data)
    })

    socket.on('sendMessage', function(data) {
      io.emit('receiveMessage', data)
    })

    socket.on('readMessage', async function(data) {
      const messages = []
      await asyncForEach(data.messageNotRead, async (message, i) => {
        messages[i] = await Message.query()
                        .patchAndFetchById(message.id, { 
                          read_at: new Date 
                        })
      }) 

      io.emit('markAsReadMessage', messages)
    })

    socket.on('countUnreadMessage', async function(data) {
        const messages = await Message.query()
          .where({ 
            sender_id: data.sender.user.id,
            receiver_id: data.receiver.id,
            read_at: null
          })

      io.emit('showUnreadMessage', { receiver: data.receiver, sender: data.sender, messages })
    })

    socket.on('setUserOnline', function(data) {
    })

  })
}

async function asyncForEach(array, callback) {
  for(let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}