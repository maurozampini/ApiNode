var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        const user = {
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          phone: item.phone,
          address: item.address,
          city: item.city,
          role: item.role,
          company: item.company,
          validated: item.validated
        };
        res.send(user);
      }
    });
  });

  app.post('/users', (req, res) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      role: req.body.role,
      company: req.body.company,
      validated: false, // si fue validado por correo electrónico o no
    };
    db.collection('users').insertOne(user, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      role: req.body.role,
      company: req.body.company
    };
    db.collection('users').updateOne({ details }, { $set: user }, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(user);
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').deleteOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('user ' + id + ' deleted!');
      }
    });
  });
};
