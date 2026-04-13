import { ROADMAP_SYSTEM_PROMPT } from '@/lib/ai-prompt'
import { generateObject } from 'ai'
import { z } from 'zod'

import { createGoogleGenerativeAI } from '@ai-sdk/google'
const google = createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export async function POST(req: Request) {
	try {
		const { prompt } = await req.json()

		if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
			return new Response(JSON.stringify({ error: 'API Key missing' }), {
				status: 500,
			})
		}
		const result = await generateObject({
			model: google('gemini-flash-latest'),
			system: ROADMAP_SYSTEM_PROMPT,
			schema: z.object({
				title: z.string(),
				nodes: z.array(
					z.object({
						id: z.string(),
						type: z.literal('mediaNode'),
						data: z.object({
							name: z.string(),
							description: z.string(),
							mediaType: z.enum(['movie', 'series', 'game', 'book']),
							poster: z.string().url(),
							isSpoiler: z.boolean(),
							vpnRequired: z.boolean(),
							releaseYear: z.number(),
						}),
					})
				),
				edges: z.array(
					z.object({
						id: z.string(),
						source: z.string(),
						target: z.string(),
						label: z.string().optional(),
					})
				),
			}),
			prompt: `Объект исследования: "${prompt}". Выполни глубокий анализ и построй граф согласно системным правилам.`,
		})

		return Response.json(result.object)
	} catch (error) {
		console.error('API ROUTE ERROR:', error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
			status: 500,
		})
	}
}
