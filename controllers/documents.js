const handleGetDocuments = (req, res, db) => {
  const { document_id } = req.body;

  db("documents")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleGetDocuments,
};
