const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mongoDB = 'mongodb://mongodb:27017/shoppingList';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const ListItemSchema = new Schema({
  created: { type: Date, required: true },
  lastModified: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, maxLength: 100 },
  quantity: Number,
  purchased: { type: Boolean, default: false },
});

const ListItem = mongoose.model('SomeModel', ListItemSchema);

module.exports = { ListItem };
