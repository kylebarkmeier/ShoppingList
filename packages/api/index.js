const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ListItem } = require('../storage');

const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app
  .route('/items')
  .get((req, res) => {
    ListItem.find({ deleted: false })
      .sort({ created: 'asc' })
      .sort({ purchased: 'asc' })
      .exec(function (error, list) {
        if (error) {
          return res.status(500).send({ data: error });
        }
        res.send({ data: list });
      });
  })
  .post((req, res) => {
    ListItem.create({ created: Date.now(), ...req.body }, (error, newItem) => {
      if (error) {
        return res.status(500).send({ data: error });
      }
      res.send({ data: newItem });
    });
  });

app
  .route('/items/:id')
  .get((req, res) => {
    ListItem.find({ _id: req.params.id })
      .sort({ created: 'asc' })
      .sort({ purchased: 'asc' })
      .exec(function (error, list) {
        if (error) {
          return res.status(500).send({ data: error });
        }
        res.send({ data: list });
      });
  })
  .patch((req, res) => {
    ListItem.updateOne(
      { _id: req.params.id },
      { lastModified: Date.now(), ...req.body },
      (error, result) => {
        if (error) {
          return res.status(500).send({ data: error });
        }
        res.send({ data: result });
      }
    );
  })
  .delete((req, res) => {
    ListItem.updateOne(
      { _id: req.params.id },
      { lastModified: Date.now(), deleted: true },
      req.body,
      (error) => {
        if (error) {
          return res.status(500).send({ data: error });
        }
        res.send({ data: { success: true } });
      }
    );
  });

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
