import express from 'express';
import { deleteAllUser, deleteManagment, getManagment, login, protect, register } from '../controllers/menagmentController.js';
import verifyToken from '../middleware/verifyToken.js';



const menagmentRoutes = express.Router();




menagmentRoutes.post('/register', register)
menagmentRoutes.post('/login', login)
menagmentRoutes.get('/get-all-managment', getManagment)
menagmentRoutes.get('/protect', verifyToken , protect)
menagmentRoutes.delete('/delete-all-managment', deleteAllUser)
menagmentRoutes.delete('/delete-managment/:id', deleteManagment)



export default menagmentRoutes;