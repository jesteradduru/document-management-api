const handleRegister = (req, res, bcrypt, db) => {
  const { username, password, type } = req.body;
  if (!username || !password) {
    return res.status(400).json("incorrect form submission");
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, (err, hash) => {
      db.transaction((trx) => {
        trx
          .insert({ hash: hash, username: username })
          .into("login")
          .returning("username")
          .then((username) => {
            return db("users")
              .returning("*")
              .insert({ username: username[0], type: type })
              .then((user) => res.json(user[0]))
              .catch((err) => res.status(400).json(err));
          })
          .then(trx.commit)
          .catch(trx.rollback);
      }).catch((err) => res.status(400).json(err));
    });
  });
};

module.exports = {
  handleRegister,
};
