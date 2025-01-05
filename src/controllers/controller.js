import axios from 'axios'; //para realizar solicitudes HTTP
import mongoose from 'mongoose';
import { Joke } from '../models/Joke.js'; //importa el modelo para interactuar con la BD

export const getJokeById = async (req, res) => {
    const { id } = req.params;

    // Validar si el ID está presente y no es una cadena vacía
    if (!id || id.trim() === '') {
        return res.status(400).json({ error: 'Id inexistente' });
    }

    try {
        // Se prueba encontrar el chiste por el ID proporcionado por el usuario
        const joke = await Joke.findById(id);

        if (!joke) {
            // Se envía un mensaje de error en caso de que no se consiga el chiste
            return res.status(404).json({ error: 'Chiste no encontrado' });
        }

        // Se muestra el chiste seleccionado por el ID proporcionado
        return res.status(200).json({ joke: joke.text });

    } catch (error) {
        // Manejo de errores inesperados
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el chiste' });
    }
};
