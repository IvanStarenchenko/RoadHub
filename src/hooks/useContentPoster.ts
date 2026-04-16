'use client'
import { MediaType } from '@/types'
import { useQuery } from '@tanstack/react-query'

const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN
const RAWG_TOKEN = process.env.NEXT_PUBLIC_RAWG_API

export function useContentPoster(apiId?: string | number, type?: MediaType) {
	const { data: posterPath, isLoading } = useQuery({
		queryKey: ['contentPoster', type, apiId],
		queryFn: async () => {
			if (!apiId || !type) return null

			if (type === 'movie' || type === 'tv') {
				const response = await fetch(
					`https://api.themoviedb.org/3/${type}/${apiId}?language=en-US`,
					{
						headers: {
							accept: 'application/json',
							Authorization: `Bearer ${TMDB_TOKEN}`,
						},
					}
				)
				const data = await response.json()
				if (data.poster_path) {
					return `https://image.tmdb.org/t/p/w342${data.poster_path}`
				}
			}

			if (type === 'game') {
				const response = await fetch(
					`https://api.rawg.io/api/games/${apiId}?key=${RAWG_TOKEN}`
				)
				const data = await response.json()
				return data.background_image || null
			}

			return null
		},
		enabled: !!apiId && !!type,
		staleTime: Infinity,
		retry: 1,
	})
	return {
		posterPath,
		isLoading,
	}
}
