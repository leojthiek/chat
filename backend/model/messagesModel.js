const mongoose = require("mongoose")

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    Timestamps: true,
  }
)

const messageModel = mongoose.model("Message", messageSchema)
module.exports = messageModel
