const notFound = (req, res) => res.status(404).send("Not found! Wrong Path");

module.exports = notFound;
