const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


router.post('/contactus', async (req, res) => {
    let success=false;
        try {
            const contact = new Contact({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                message: req.body.message,
                city: req.body.city,
                state: req.body.state
              
            })
            // res.json(saveContact)
            
            const saveContact = await contact.save()
            success=true;
            res.json({success})

        } catch (error) {
            success=false;
            console.error(error.message);
            res.status(500).send({success,error:"Internal server error"});
        }
    })



module.exports = router
