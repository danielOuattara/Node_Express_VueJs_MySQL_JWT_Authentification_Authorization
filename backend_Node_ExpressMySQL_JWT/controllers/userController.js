
exports.allAccess = (req, res, next) => {
    res.status(200).send('Public Content');
};

exports.userBoard = (req, res, next) => {
    res.status(200).send('User Content');
}
exports.adminBoard = (req, res, next) => {
    res.status(200).send('Admin Content');
}
exports.moderatorBoard = (req, res, next) => {
    res.status(200).send('Moderator Content');
}