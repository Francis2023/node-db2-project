const express = require('express');
const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
       filename: './data/car-dealer.db3'
    },
  // useNullAsDefault = true
});

const router = express.Router();

router.get('/', (req,res) => {
    db('cars')
    .then(cars => {
       res.json(cars)
    })
    .catch(error => {
       res.status(500).json({message: 'Error retrieving the cars'})
    });
});

router.get('/:id', (req,res) => {

    const {id} = req.params;

    db('cars').where({id}).first()
    .then(car => {
       res.json(car)
    })
    .catch(error => {
       res.status(500).json({message: 'Error retrieving the specified car'});
    });
});

router.post('/', (req,res) => {

    const carData = req.body;
    
    db('cars').insert(carData)
    .then(ids => {
       db('cars').where({ id: ids[0] })
       .then(newEntry => {
           res.status(201).json(newEntry);
       })
    })
    .catch(error => {
       res.status(500).json({message: 'Error storing data'});
    })
})


module.exports = router;