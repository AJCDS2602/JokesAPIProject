import request from 'supertest';
import { app } from '../src//index.js'; 
import { Joke } from '../src/models/Joke.js';

//Prueba Unitaria de obtener un chiste por el Id
describe('GET /getJokeById/:id', () => {
    let jokeId;

    beforeEach(async () => {
        // Crear un chiste para las pruebas
        const joke = await Joke.create({
            text: '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
            author: 'Autor',
            rating: 7,
            category: 'Chistoso'
        });

        const savedJoke = await joke.save();
        jokeId = savedJoke.id; 
    });

    it('debería devolver un chiste existente por ID', async () => {
        const respuesta = await request(app).get(`/api/getJokeById/${jokeId}`);
        expect(respuesta.status).toBe(200);
        expect(respuesta.body.joke).toBe('¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.');
    });

    it('debería devolver un error 400 si el ID no es válido', async () => {
        const respuesta = await request(app).get('/api/getJokeById/invalidId');
        
        expect(respuesta.status).toBe(500);
        expect(respuesta.body.error).toBe('Error al obtener el chiste');
    });

    it('debería devolver un error 400 si no se proporciona ID', async () => {
        const respuesta = await request(app).get('/api/getJokeById');
        expect(respuesta.status).toBe(400);
        expect(respuesta.body.error).toBe('Id inexistente');
    });
});

describe('DELETE /api/deleteJoke/:id', () => {
    let jokeId;

    beforeEach(async () => {
        // Crear un chiste para las pruebas
        const joke = new Joke({
            text: '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
            author: 'Autor',
            rating: 7,
            category: 'Chistoso'
        });

        const savedJoke = await joke.save();
        jokeId = savedJoke.id;
    });

    afterEach(async () => {
        // Limpiar la colección después de cada prueba
        await Joke.deleteMany({});
    });

    it('debería retornar 400 si no se proporciona un id', async () => {
        const respuesta = await request(app).delete('/api/deleteJoke/');
        expect(respuesta.status).toBe(400);
        expect(respuesta.body).toEqual({error: 'Id no Válido'});
    });

    it('debería retornar 404 si no se encuentra el chiste', async () => {
         // Reemplaza con un ID que no exista
        const idInexistente = '507f1f77bcf86cd799439011';
        const respuesta = await request(app).delete(`/api/deleteJoke/${idInexistente}`);
        
        expect(respuesta.status).toBe(404); // Cambiar a 404
        expect(respuesta.body).toEqual({ error: 'Chiste no encontrado' });
    });


    it('debería retornar 200 y eliminar el chiste', async () => {
        const respuesta = await request(app).delete(`/api/deleteJoke/${jokeId}`);
        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toEqual({ message: 'Chiste eliminado con éxito' });
        
    });


    it('debería retornar 500 en caso de error inesperado', async () => {
        // Forzar un error inesperado al eliminar
        jest.spyOn(Joke, 'findByIdAndDelete').mockImplementationOnce(() => {
            throw new Error('Error inesperado');
        }); 

        const respuesta = await request(app).delete(`/api/deleteJoke/${jokeId}`);
        expect(respuesta.status).toBe(500);
        expect(respuesta.body).toEqual({ error: 'Error al eliminar el chiste' });
    }); 
});

//Prueba Unitaria de obtener la cantidad de chistes que hay en la base de datos por su categoría
describe('GET /api/getJokesByCategory/:category', () => {
    beforeEach(async () => {
        // Crear chistes para las pruebas
        const jokes = [];
        for (let i = 0; i < 5; i++) {
            const joke = new Joke({
                text: `Texto del chiste ${i}`,
                author: 'Autor',
                rating: i,
                category: 'Chistoso'
            });
            jokes.push(joke);
        }
        await jokes.forEach(async (joke) => await joke.save());
    });

    afterEach(async () => {
        // Limpiar la colección después de cada prueba
        await Joke.deleteMany({});
    });

    it('debería devolver un mensaje de error 400 si la categoría no es válida', async () => {
        const response = await request(app)
            .get('/getJokesByCategory/invalidCategory')
            .expect(400);

        expect(response.body.error).toBe('Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso o Malo.');
    });     

    it('debería devolver un mensaje de error 400 si no se proporciona la categoría', async () => {
        const response = await request(app)
            .get('/getJokesByCategory')
            .expect(400);

        expect(response.body.error).toBe('Categoría no válida. Las categorías permitidas son: Dad joke, Humor Negro, Chistoso o Malo.');
    });

    it('debería devolver un mensaje de error 500 si hay un error inesperado', async () => {
        // Forzar un error inesperado al obtener los chistes
        jest.spyOn(Joke, 'find').mockImplementationOnce(() => {
            throw new Error('Error inesperado');
        });

        const response = await request(app)
            .get('/getJokesByCategory/Chistoso')
            .expect(500);

        expect(response.body.error).toBe('Error al obtener la cantidad de chistes por categoría');
    });

    it('debería devolver el número de chistes encontrados', async () => {
        const response = await request(app)
            .get('/getJokesByCategory/Chistoso')
            .expect(200);

        expect(response.body.message).toBe('Cantidad de chistes encontrados');
        expect(response.body.count).toBe(5);
    });
}); 

//Prueba Unitaria de obtener todos los chistes que hay en la base de datos por puntaje de que tan bueno es, se tiene que pasar parámetro por URL.
describe('GET /api/getJokesByRating/:rating', () => {
    beforeEach(async () => {
        // Crear chistes para las pruebas
        const jokes = [];
        for (let i = 0; i < 5; i++) {
            const joke = new Joke({
                text: `Texto del chiste ${i}`,
                author: 'Autor',
                rating: i,
                category: 'Chistoso'
            });
            jokes.push(joke);
        }
        await jokes.forEach(async (joke) => await joke.save());
    });

    afterEach(async () => {
        // Limpiar la colección después de cada prueba
        await Joke.deleteMany({});
    });

    it('debería devolver un mensaje de error 400 si el parámetro "rating" no es un número entre 1 y 10', async () => {
        const response = await request(app)
            .get('/getJokesByRating/invalidRating')
            .expect(400);

        expect(response.body.error).toBe('El parámetro "rating" debe estar entre 1 y 10.');
    });

    it('debería devolver un mensaje de error 400 si no se proporciona el parámetro "rating"', async () => {
        const response = await request(app)
            .get('/getJokesByRating')
            .expect(400);

        expect(response.body.error).toBe('El parámetro "rating" debe estar entre 1 y 10.');
    });

    it('debería devolver un mensaje de error 500 si hay un error inesperado', async () => {
        // Forzar un error inesperado al obtener los chistes
        jest.spyOn(Joke, 'find').mockImplementationOnce(() => {
            throw new Error('Error inesperado');
        });

        const response = await request(app)
            .get('/getJokesByRating/7')
            .expect(500);

        expect(response.body.error).toBe('Error al obtener la cantidad de chistes por categoría');
    });

    it('debería devolver el número de chistes encontrados', async () => {
        const response = await request(app)
            .get('/getJokesByRating/7')
            .expect(200);

        expect(response.body.message).toBe('Cantidad de chistes encontrados');
        expect(response.body.count).toBe(5);
    });
});