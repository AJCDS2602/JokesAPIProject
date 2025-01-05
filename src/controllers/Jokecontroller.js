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

export const deleteJokeById = async (req, res) => {
    const { id } = req.params;

    // Se verifica si el ID correspondiente es válido
    if (!id ) {
        return res.status(400).json({ error: 'Id no Válido' });
    }

    try {
        // Se intenta eliminar el chiste por el ID proporcionado por el usuario
        const deletedJoke = await Joke.findByIdAndDelete(id);

        if (!deletedJoke) {
            // Se envía el mensaje en caso de que el chiste no haya sido encontrado para ser eliminado
            return res.status(404).json({ error: 'Chiste no encontrado' });
        }

        // Se muestra el mensaje en caso de que se haya podido eliminar el chiste
        return res.status(200).json({ message: 'Chiste eliminado con éxito' });

    } catch (error) {
        // Fallo inesperado al no poder eliminar el chiste
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el chiste' });
    }
};

//Funcion Para obtener la cantidad de chistes que hay en la base de datos por su categoría
export const getJokesByCategory = async (req, res) => {
    const { category } = req.params; //Extrae la categoría desde los parámetros de la URL

    try {
        //Valida que la categoria sea una de las permitidas
        const validCategories = ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso o Malo.' });
        }

        //agarra todos los chistes de la categoría especificada
        const jokes = await Joke.find({ category });

        //muestra la cantidad de chistes encontrados
        return res.status(200).json({ message: 'Cantidad de chistes encontrados', count: jokes.length });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener la cantidad de chistes por categoría' });
    }
};  