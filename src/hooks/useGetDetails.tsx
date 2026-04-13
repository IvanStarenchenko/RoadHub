// hooks/useGetDetails.ts
import useRoadmapStore from '@/store/useRoadmapStore'
import { useQuery } from '@tanstack/react-query'

export function useGetDetails(type: string, tmdbId: number) {
	const setCardDetails = useRoadmapStore(state => state.setCardDetails)

	// Достаем токен из переменных окружения
	const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

	return useQuery({
		queryKey: ['tmdbDetails', type, tmdbId],
		queryFn: async () => {
			console.log('Fetching details for', type, tmdbId)

			const response = await fetch(
				`https://api.themoviedb.org/3/${type}/${tmdbId}?language=ru-RU`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						// Прокидываем токен здесь
						Authorization: `Bearer ${TMDB_TOKEN}`,
					},
				}
			)

			if (!response.ok) {
				const errorData = await response.json()
				console.error('TMDB Error:', errorData)
				throw new Error('Ошибка получения данных от TMDB')
			}

			const data = await response.json()
			setCardDetails(data)
			return data
		},
		enabled: Boolean(tmdbId && tmdbId !== 0),
		retry: false,
	})
}
