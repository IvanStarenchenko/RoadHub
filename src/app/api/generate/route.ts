import { ROADMAP_SYSTEM_PROMPT } from '@/lib/ai-prompt'
import { generateObject } from 'ai'

import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { roadmapSchema } from './schema'
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
			schema: roadmapSchema,
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
