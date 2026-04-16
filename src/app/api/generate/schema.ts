import { z } from 'zod'

export const roadmapSchema = z.object({
	title: z.string(),
	nodes: z.array(
		z.object({
			id: z.string().describe("Уникальный ID для ReactFlow (напр. 'node-1')"),
			// Выносим tmdbId в корень, как в твоем интерфейсе

			type: z.literal('mediaNode'),
			position: z.object({
				x: z.number(),
				y: z.number(),
			}),
			data: z.object({
				contentSlug: z.string().describe('Дубликат ID/Sluga для контекста'),
				tmdbId: z
					.string()
					.describe(
						"API ID: цифры для TMDB, slug для RAWG (напр. '671' или 'the-witcher-3')"
					),
				name: z.string(),
				description: z.string(),
				mediaType: z.enum(['movie', 'tv', 'game', 'book']),
				poster: z
					.string()
					.optional()
					.describe(
						'Если точно знаешь poster_path TMDB, укажи. Если нет - оставь пустым.'
					),
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
})
