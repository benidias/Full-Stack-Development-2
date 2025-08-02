import { v4 as uuidv4 } from 'uuid';
import express from "express";
import { ObjectId } from "mongodb";
import Session from '../db/schemas/session.Schema.js';
import User from '../db/schemas/users.Schema.js';

const router = express.Router();

router.post("/:id", async (req, res) => {
    const userId = req.params

    const token = uuidv4();

    let newSession = new Session({
        session_token: token,
        user: userId.id,
    })

    
    await Session.insertOne(newSession)

    res.json({
        status:"ok", 
        data:{token: token}, 
        message:'session saved successfully'
    });
});

  router.get("/validate_token", async (req, res) => {
    const token = req.query.token;
  
    
    try {
    
    const session = await Session.findOne({session_token: token })
  
      if (session) {
        
        const user = await User.findOne({ _id: session.user })

        
        if (user) {
          const { username, _id } = user;
          res.json({
            status: "ok",
            data: {
              valid: true,
              user: {
                username,
                _id
              },
              message: null
            }
          });
        } else {
          
          res.json({
            status: "ok",
            data: {
              valid: false,
              user: null,
              message: null
            }
          });
        }
      } else {
        
        res.json({
          status: "ok",
          data: {
            valid: false,
            user: null,
            message: null
          }
        });
      }
    } catch (error) {
      
      res.json({
        status: "error",
        data: null,
        message: "Une erreur s'est produite lors de la validation du token."
      });
    }
  });
  
  
  
export default router;