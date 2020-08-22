const fs = require("fs");
const handleOutgoing = (req, res, db) => {
  const { document_id, remarks, edited_by } = req.body;

  db("documents")
    .where({ id: document_id })
    .select("id", "file_path")
    .then((data) => {
      fs.unlink("documents/" + data[0].file_path, (err) => {
        if (err) throw err;
        db("documents")
          .where({ id: document_id })
          .update({
            file_path: req.file.filename,
            remarks: remarks,
            edited_by: edited_by,
          })
          .catch((err) => res.status(400).json(err));
      });

      res.status(200).json("success");
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  handleOutgoing,
};
