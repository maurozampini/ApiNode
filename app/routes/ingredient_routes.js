var ObjectID = require('mongodb').ObjectID;
const ingredients = 'ingredients';

module.exports = function (app, db) {
  app.get('/ingredients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection(ingredients).findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'Ocurrió un error' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/ingredients', (req, res) => {
    const ingredient = { name: req.body.name, description: req.body.description };
    db.collection(ingredients).insertOne(ingredient, (err, result) => {
      if (err) {
        res.send({ 'error': 'Ocurrió un error' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/ingredients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const ingredient = { name: req.body.name, description: req.body.description };
    db.collection(ingredients).updateOne({ details }, { $set: ingredient }, (err, result) => {
      if (err) {
        res.send({ 'error': 'Ocurrió un error' });
      } else {
        res.send(ingredient);
      }
    });
  });

  app.delete('/ingredients/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection(ingredients).deleteOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'Ocurrió un error' });
      } else {
        res.send('Ingrediente ' + id + ' eliminado.');
      }
    });
  });
};
