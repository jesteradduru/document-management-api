const handleProcessDocument = (req, res, db) => {
  const { document_id } = req.body;

  db("documents")
    .where({ id: document_id })
    .update({
      date_received: new Date(),
      status: "ONPROCESS",
    })
    .returning("*")
    .then((data) => res.status(200).json(data[0]))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleProcessDocument,
};
