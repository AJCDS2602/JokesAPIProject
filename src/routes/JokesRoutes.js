import express from 'express';
import { getJoke, createJoke, updateJoke, deleteJokeById, getJokeById} from '../controllers/JokeController.js';
 
// Crea un enrutador de Express
const router = express.Router();

// Define la ruta para obtener un chiste
router.get('/getJoke', getJoke);

// Define la ruta para crear un nuevo chiste
router.post('/createJoke', createJoke);

// Define la ruta para actualizar un chiste existente
router.put('/updateJoke/:id', updateJoke);

// Define la ruta para eliminar un chiste existente por id
router.delete('/deleteJoke/:id?', deleteJokeById);


router.get('/getJokeById/:id?', getJokeById);

export default router;