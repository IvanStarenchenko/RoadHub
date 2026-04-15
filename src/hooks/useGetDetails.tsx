'use client'
import useRoadmapStore from '@/store/useRoadmapStore'
import { MediaType } from '@/types'
import { IGameDetails } from '@/types/game'
import { RoadmapData } from '@/types/index'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Node } from 'reactflow'
import { useCanvasGeneration } from './useCanvasGeneration'

export function useGetDetails() {
	const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN
	const RAWG_TOKEN = process.env.NEXT_PUBLIC_RAWG_API
	const [selectedMedia, setSelectedMedia] = useState<{
		id: number
		type: MediaType
	} | null>(null)
	const activeType = selectedMedia?.type
	const activeTmdbId = selectedMedia?.id
	const activeGameId = selectedMedia?.id
	const nodes = useRoadmapStore(state => state.nodes)
	const edges = useRoadmapStore(state => state.edges)
	const tmdbDetails = useRoadmapStore(state => state.tmdbDetails)
	const gameDetails = useRoadmapStore(state => state.gameDetails)

	const setTmdbDetails = useRoadmapStore(state => state.setTmdbDetails)
	const setGameDetails = useRoadmapStore(state => state.setGameDetails)

	const { generateRoadmap, isLoading } = useCanvasGeneration()

	const onNodeClick = (
		event: React.MouseEvent,
		node: Node<RoadmapData['nodes'][0]['data']>
	) => {
		//setTmdbDetails(null)
		event.preventDefault()
		event.stopPropagation()

		const tmdbId = node.id

		if (tmdbId && tmdbId !== '0' && setSelectedMedia) {
			setSelectedMedia({
				id: Number(tmdbId),
				type: (node.data.mediaType as MediaType) || 'movie'
			})
		}
	}

	const { isLoading: isTMDBLoading } = useQuery({
		queryKey: ['tmdbDetails', activeType, activeTmdbId],

		queryFn: async () => {
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
			setTmdbDetails(data)
			return data
		},
		enabled: Boolean(
			(activeType === 'movie' || activeType === 'tv') && activeTmdbId !== 0
		),
		retry: false
	})
	const { isLoading: isGameLoading } = useQuery({
		queryKey: ['gameDetails', activeType, activeGameId],
		queryFn: async () => {
			const response = await fetch(
				`https://api.rawg.io/api/games/${activeGameId}?key=${RAWG_TOKEN}`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${RAWG_TOKEN}`
					}
				}
			)

			if (!response.ok) {
				const errorData = await response.json()
				console.error('RAWG Error:', errorData)
				throw new Error('Ошибка получения данных от RAWG')
			}

			const data: IGameDetails = await response.json()
			if (typeof setGameDetails === 'function') {
				setGameDetails(data)
			}
			return data
		},

		enabled: Boolean(
			activeType === 'game' && activeGameId && activeGameId !== 0
		),
		retry: false
	})
	return {
		nodes,
		edges,
		tmdbDetails,
		isGameLoading,
		gameDetails,
		generateRoadmap,
		isLoading,
		onNodeClick,
		selectedMedia,
		isTMDBLoading
	}
}
