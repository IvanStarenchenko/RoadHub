'use client'
import useRoadmapStore from '@/store/useRoadmapStore'
import { MediaType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Node } from 'reactflow'
import { useCanvasGeneration } from './useCanvasGeneration'
interface MediaNodeData {
	tmdbId?: string | number
	mediaType?: MediaType
	name?: string
	description?: string
	poster?: string
	isSpoiler?: boolean
	vpnRequired?: boolean
}
export function useGetDetails(
	type: MediaType,
	tmdbId: number,
	selectedMedia?: {
		id: number
		type: MediaType
	} | null,
	setSelectedMedia?: React.Dispatch<
		React.SetStateAction<{
			id: number
			type: MediaType
		} | null>
	>
) {
	const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN
	const activeType = selectedMedia?.type || type
	const activeTmdbId = selectedMedia?.id || tmdbId
	const nodes = useRoadmapStore(state => state.nodes)
	const edges = useRoadmapStore(state => state.edges)
	const cardDetails = useRoadmapStore(state => state.cardDetails)
	const setCardDetails = useRoadmapStore(state => state.setCardDetails)

	const { generateRoadmap, isLoading } = useCanvasGeneration()

	const onNodeClick = (event: React.MouseEvent, node: Node<MediaNodeData>) => {
		event.preventDefault()
		event.stopPropagation()

		const tmdbId = node.data?.tmdbId || node.id

		if (tmdbId && tmdbId !== '0' && setSelectedMedia) {
			setSelectedMedia({
				id: Number(tmdbId),
				type: (node.data?.mediaType as MediaType) || 'movie'
			})
		}
	}

	const detailsQuery = useQuery({
		queryKey: ['tmdbDetails', activeType, activeTmdbId],
		queryFn: async () => {
			console.log('Fetching details for', activeType, activeTmdbId)

			const response = await fetch(
				`https://api.themoviedb.org/3/${activeType}/${activeTmdbId}?language=ru-RU`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${TMDB_TOKEN}`
					}
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
		enabled: Boolean(activeTmdbId && activeTmdbId !== 0),
		retry: false
	})

	return {
		nodes,
		edges,
		cardDetails,
		generateRoadmap,
		isLoading,
		onNodeClick,
		detailsQuery
	}
}
