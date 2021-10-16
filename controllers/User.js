const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        let username = req.body.username;
        let USERNAME = username.toUpperCase();
        const user = new User({
            username: USERNAME,
            password: hash,
            contact : req.body.contact,
            isAdmin : req.body.isAdmin,
            profile : req.body.profile,
            registration : req.body.registration,
            registrationType : req.body.registrationType,
            email : req.body.email,
            phone : req.body.phone,
            phonePoste : req.body.phonePoste,
            mobile : req.body.mobile,
            title : req.body.title,
            matricule : req.body.matricule,
            company : req.body.company,
            department : req.body.department,
            site : req.body.site,
            local : req.body.local,
            creationDate : req.body.creationDate,
            creationUser : req.body.creationUser,
            updateDate : req.body.updateDate,
            updateUser : req.body.updateUser,
            isActive : req.body.isActive
        })
        user.save()
        .then(()=> res.status(200).json({message: 'user created'}))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    let username = req.body.username;
    let USERNAME = username.toUpperCase();
    User.findOne({ username : USERNAME })
    .then(user => {
        if (!user){
            return res.status(401).json({error : 'user not found'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then( valid => {
            if (!valid){
                return res.status(401).json({error : 'password incorrect'})
            }
            res.status(200).json({
                userId: user._id,
                token : jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then((user) => { res.status(200).json(user) })
    .catch((error) => { res.status(404).json({ error }) })
}

exports.modifyUser = (req, res, next) => {
    let username = req.body.username;
    let USERNAME = username.toUpperCase();
    if(req.body.password===""){
        const user = new User({
            _id: req.params.id,
            username: USERNAME,
            contact : req.body.contact,
            isAdmin : req.body.isAdmin,
            profile : req.body.profile,
            registration : req.body.registration,
            registrationType : req.body.registrationType,
            email : req.body.email,
            phone : req.body.phone,
            phonePoste : req.body.phonePoste,
            mobile : req.body.mobile,
            title : req.body.title,
            matricule : req.body.matricule,
            company : req.body.company,
            department : req.body.department,
            site : req.body.site,
            local : req.body.local,
            creationDate : req.body.creationDate,
            creationUser : req.body.creationUser,
            updateDate : req.body.updateDate,
            updateUser : req.body.updateUser,
            isActive : req.body.isActive
        })
        User.updateOne({_id: req.params.id}, user)
        .then(() => { res.status(201).json({ message: 'User updated successfully!' }) })
        .catch((error) => { res.status(400).json({ error }) })
    }
    else {
    bcrypt.hash(req.body.password, 10)
    .then(hash => { 
        const user = new User({
            _id: req.params.id,
            username: USERNAME,
            password: hash,
            contact : req.body.contact,
            isAdmin : req.body.isAdmin,
            profile : req.body.profile,
            registration : req.body.registration,
            registrationType : req.body.registrationType,
            email : req.body.email,
            phone : req.body.phone,
            phonePoste : req.body.phonePoste,
            mobile : req.body.mobile,
            title : req.body.title,
            matricule : req.body.matricule,
            company : req.body.company,
            department : req.body.department,
            site : req.body.site,
            local : req.body.local,
            creationDate : req.body.creationDate,
            creationUser : req.body.creationUser,
            updateDate : req.body.updateDate,
            updateUser : req.body.updateUser,
            isActive : req.body.isActive
        }); 
        User.updateOne({_id: req.params.id}, user)
        .then(() => { res.status(201).json({ message: 'User updated successfully!' }) })
        .catch((error) => { res.status(400).json({ error }) })
    }).catch(error => res.status(500).json({ error }))
    }
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.id})
    .then(() => { res.status(200).json({ message: 'Deleted!' }) })
    .catch((error) => { res.status(400).json({ error }) })
}
  
exports.getAllUsers = (req, res, next) => {
    User.find().then((users) => { res.status(200).json({results : users}) })
    .catch((error) => { res.status(400).json({ error }) })
}
