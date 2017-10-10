const express = require('express');

const router = express.Router();
const passport = require('passport');

//Models
let models = require("./../db/models");


//Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});




//                          Admin Panel
/*_______________________________________________________________________*/


router.get('/admin', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    console.log('ADMIN');
    res.statusCode(200);
})

// Get settings data/
router.get('/settings', (req, res) => {
    models.information.findAll(
        {
            where: {
                [models.sequelize.Op.or]: [{ key: 'email' }, { key: 'phone' }, { key: 'resume' }],
            }
        }
    ).then(result => {
        let data = {};
        result.forEach(item => {
            data[item.dataValues.key] = item.dataValues.value;
        });
        
        res.json(data);
    }).catch(err => {
        console.error(err);
        res.json(501);
    })
});

router.get('/aboutadmin', (req, res) => {

    let data = {};
    models.information.findAll(
        {
            where: {
                [models.sequelize.Op.or]: [{ key: 'header' }, { key: 'description' }],
            }
        }
    ).then(result => {
        result.forEach(item => {
            data[item.dataValues.key] = item.dataValues.value;
        });

        models.skills.findAll(
            {
                where: {}
            }
        ).then(result => {
            data['skills'] = [];
            result.forEach(item => {
                data['skills'].push(item.dataValues.skill);
            });

            console.log(data);
            res.json(data);
        }).catch(err => {
            console.error(err);
            res.json(501);
        });

    }).catch(err => {
        console.error(err);
        res.json(501);
        });
});

// Update settings data
router.post('/settings', (req, res) => {
    console.log(req.body);

    for (let prop in req.body) {
        if (!req.body.hasOwnProperty(prop)) continue;

        console.log(prop + " = " + req.body[prop]);
        models.information.update(
            { value: req.body[prop] },
            { where: { key: prop } }
        ).then(result =>
           res.statusCode(200)
        ).catch(err =>
           res.json(501)
        )
    }
    

    /*
    models.information.create({
        'email': req.body.email,
        'phone': req.body.phone,
        'resume': req.body.resume
    }).then(function (contacts) {
        res.json({ 'one': 'true' });
    });*/
});

router.post('/aboutadmin', (req, res) => {
    console.log(req.body);

    for (let prop in req.body) {
        if (!req.body.hasOwnProperty(prop)) continue;

        console.log(prop + " = " + req.body[prop]);
        models.information.update(
            { value: req.body[prop] },
            { where: { key: prop } }
        ).then(result => {

            models.skills.destroy({
                where: {},
                truncate: true
            });

            req.body['skills'].forEach(skill => {
                models.skills.create(
                    { 'skill': skill }
                ).then(result => {
                    res.statusCode(200)
                }).catch(err =>
                    res.json(501)
                    )
            })
            
            res.statusCode(200)
        }).catch(err =>
                res.json(501)
        )
    }
});

//                          Public rotes
/*_______________________________________________________________________*/

// Root router
router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/not-found', (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
});

module.exports = router;