const handleCompose = (req, res, db) => {
  const { from, to, filename } = req.body;
  db("documents")
    .insert({
      from_user: from,
      to_user: to,
      filename: filename,
      date_sent: new Date(),
      status: "PENDING",
      file_path: req.file.filename,
    })
    .returning("*")
    .then((document) => res.status(200).json(document))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleCompose,
};
