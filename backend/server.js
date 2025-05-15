const Fastify = require('fastify');
const cors = require('@fastify/cors');
const path = require('path');
const fastifyStatic = require('@fastify/static');

// const { request } = require('http');

const fastify = Fastify();
const PORT = 8080;

fastify.register(cors, {
    origin: '*'
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend'),
});

fastify.get('/', async (request, reply) => {
    return reply.sendFile('index.html');
});

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();