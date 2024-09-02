const express = require('express')
const router = express.Router()
const Alien = require('../models/model_052')


router.get('/', async(req,res) => 
{
    try
    {
           const aliens = await Alien.find()
           res.json(aliens)
    }
    catch(err)
    {
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => 
{
    try
    {
           const alien = await Alien.findById(req.params.id)
           res.json(alien)
    }

catch(err)
{
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => 
{
    const alien = new Alien
   ({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })

    try
   {
        const a1 =  await alien.save() 
        res.json(a1)
    }
catch(err)
   {
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> 
{
    try
   {
        const alien = await Alien.findById(req.params.id) 
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)   
    }
catch(err)
   {
        res.send('Error')
    }

})
// PUT update all fields of an alien by ID
router.put('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        if (!alien) {
            return res.status(404).send('Alien not found');
        }

        // Update all fields
        alien.name = req.body.name || alien.name;
        alien.tech = req.body.tech || alien.tech;
        alien.sub = req.body.sub || alien.sub;

        const a1 = await alien.save();
        res.json(a1);
    } catch (err) {
        res.send('Error: ' + err);
    }
})
// DELETE a specific alien by ID
router.delete('/:id', async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        const a1 = await alien.deleteOne();
        res.json({ message: 'Deleted successfully', alien: a1 });
    } catch (err) {
        res.send('Error'+err);
    }
});

module.exports = router
