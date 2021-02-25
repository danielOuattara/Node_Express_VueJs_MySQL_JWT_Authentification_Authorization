
const  db    = require ('../models');
const config = require('../config/authConfig.js');
const User   = db.user;
const Role   = db.role;
const Op     = db.Sequelize.Op;
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// ------------------------------------------------------------------------------------

exports.signup = (req, res, next) => {

    User.create ( {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then( user => {
        if (req.body.roles) {
            Role.findAll( {
                where: { 
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            })
            .then( roles => {
                user.setRoles(roles)
                .then(() => res.send( { message: 'User was registered successfully'}))
                .catch()

            })
            .catch()
        } else {
            // user role = 1
             user.setRoles([1])
             .then( () => res.send({message: 'User was registered succesfully'})  )
             .catch()
        }
    })
    .catch(error => res.status(500).json( {error}));
}

//---------------------------------------------------------------------------------------------------

exports.signin =(req, res, next) => {

    User.findOne( {
        where: {
            username: req.body.username
        }
    })
    .then( user => {
        if(!user) {
            return res.status(401).json( {error: " Email or Password unknown !" } )
        }

        const passwordIsValid = bcrypt.compareSync ( req.body.password, user.password);
        
        if(!passwordIsValid) {
            return  res.status(401).send({ accessToken: null, message: "Invalide Password !"}) 
        }

        const token = jwt.sign( {id: user.id}, config.secret, {expiresIn: 3600});

        const authorities = [];
        user.getRoles()
        .then( roles =>  {
            for (let i = 0; i < roles.legnth; i ++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send( {
                id: user.id,
                username: user.username,
                email: user.email,
                rolse: authorities,
                accessToken: token
            });
        })
        .catch(err => res.status(500).json( {err}));
    })
    .catch(err => res.status(500).json( {err}));
}