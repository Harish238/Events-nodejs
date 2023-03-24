const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Event = require('./modules/eventSchema');
require('dotenv').config();
const db = process.env.Mongo_Url;
const port = process.env.PORT;
mongoose.connect(db).then(()=>{
    console.log("Connected to mongodb.....");
}).catch(()=>{console.log("Not connected")})

const app = express();
app.use(bodyParser.json());

app.post('/v1/events', async(req,res)=>{
    try{
       const{title,description,location,starttime,endtime}=req.body;
       const event = new Event({
        title,
        description,
        location,
        starttime,
        endtime
       });
       await event.save();
       res.status(201).json(event);
    }catch(error){
        console.log("error");
        res.status(500).json({error:error.message});
    }
});

// List all events
app.get('/v1/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a specific event
  app.get('/v1/events/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        res.status(404).json({ error: 'There is no event with that id.' });
      } else {
        res.status(200).json(event);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete a specific event
  app.delete('/v1/events/:id', async (req, res) => {
    try {
      const result = await Event.deleteOne({ _id: req.params.id });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'There is no event with that id.' });
      } else {
        res.sendStatus(204);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Update a specific event
app.put('/v1/events/:id', async (req, res) => {
    try {
      const result = await Event.updateOne({ _id: req.params.id }, req.body);
      if (result.nModified === 0) {
        res.status(404).json({ error: 'There is no contact with that id' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a specific Event with partial data
  app.patch('/v1/events/:id', async (req, res) => {
    try {
      const result = await Event.updateOne({ _id: req.params.id }, req.body);
      if (result.nModified === 0) {
        res.status(404).json({ error: 'There is no contact with that id' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.listen(port,()=>console.log("server is running..."));