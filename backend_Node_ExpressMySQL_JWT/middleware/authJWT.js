

const jwt = require('jsonwebtoken');
const config = require('./../config/authConfig.js');
const db = require('./../models');
const User = db.user;

verifyToken = (req, res, next) => {

    let token = req.headers['x-access-token'];

    if(!token) {
        return res.status(403).send({message: "No token !"});
    }

    jwt.verify (token, config.secret, (err, decoded)=> {
        if(err) {
            return res.status(401).send({ message: 'Access Denied !'});
        }
        req.userId = decoded.id;
        next();
    });
};


isAdmin = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i ++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            } 
            res.status(403).send({ message: "Require Admin Role!" });
        })
        // .catch(error => res.status(500).json( {error}))
    })
    .catch(error => res.status(500).json( {error}))
    // .catch()
};


isModerator = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {
        user.getRoles()
        .then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!"
      });
    });
  });
};


isModeratorOrAdmin = (req, res, next) => {

    User.findByPk(req.userId)
        .then(user => {
            user.getRoles()
            .then(roles => {
              for (let i = 0; i < roles.length; i++) {
                  if (roles[i].name === "moderator") {
                    next();
                    return;
                  }
        
                  if (roles[i].name === "admin") {
                    next();
                    return;
                  }
              }
              res.status(403).send({ message: "Require Moderator or Admin Role!" });
            })
            // .catch();
          })
        .catch(error => res.status(500).json( {error}))
};
  

  
  const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin,
  };
  module.exports = authJwt;