const handleApproval = (req, res, db) => {
  const { document_id, remarks, approval } = req.body;

  db("documents")
    .where({ id: document_id })
    .update({
      checked: approval,
      remarks: remarks,
    })
    .returning("*")
    .then((data) => res.status(200).json(data[0]))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleApproval,
};
