import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify();
const PORT = 8080;

fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../frontend'),
});

fastify.get('/api/plays', async (request, reply) => {
    const plays = await prisma.play.findMany();
    return plays;
});

fastify.get('/api/play/:id', async (request, reply) => {
    const play = await prisma.play.findUnique({
        where: { id: Number(request.params.id) },
        include: { comments: true }
    });
    if (!play) return reply.code(404).send({ error: 'Play not found' });
    return play;
});

fastify.post('/api/play/:id/comment', async (request, reply) => {
    const playId = Number(request.params.id);
    const { content } = request.body;
    if (!content || !playId) {
        return reply.code(400).send({ error: 'Content and playId are required' });
    }
    const comment = await prisma.comment.create({
        data: {
            content,
            playId
        }
    });
    return comment;
});

fastify.setNotFoundHandler(async (request, reply) => {
    const url = request.raw.url;

    if (!url.startsWith('/api/') && !url.includes('.')) {
        console.log(`[NotFoundHandler] SPA route detected (${url}). Serving index.html.`);
        try {
            return reply.sendFile('index.html');
        } catch (err) {
            console.error(`[NotFoundHandler] Error sending index.html for ${url}:`, err);
            return reply.code(500).send({ error: 'Failed to serve application.' });
        }
    }

    console.log(`[NotFoundHandler] Resource not found or API path. Returning 404 for: ${url}`);
    reply.code(404).send({ error: 'Resource not found' });
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