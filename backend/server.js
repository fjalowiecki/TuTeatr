import Fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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


fastify.get('/plays', async (request, reply) => {
    const plays = await prisma.play.findMany();
    return plays;
});

fastify.get('/play/:id', async (request, reply) => {
    const play = await prisma.play.findUnique({
        where: {id: Number(request.params.id)},
    });
    if (!play) return reply.code(404).send({ error: 'Play not found' });
    return play;
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