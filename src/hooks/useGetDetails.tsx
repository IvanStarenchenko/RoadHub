'use client'
import useRoadmapStore from '@/store/useRoadmapStore'
import { MediaType } from '@/types'
import { OpenLibraryBookDetails } from '@/types/book'
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
		id: number | string
		name?: string
		type: MediaType
	} | null>(null)

	const activeType = selectedMedia?.type
	const activeId = selectedMedia?.id
	const activeGameSlug = selectedMedia?.name

	const nodes = useRoadmapStore(state => state.nodes)
	const edges = useRoadmapStore(state => state.edges)

	const tmdbDetails = useRoadmapStore(state => state.tmdbDetails)
	const gameDetails = useRoadmapStore(state => state.gameDetails)
	const bookDetails = useRoadmapStore(state => state.bookDetails)

	const setTmdbDetails = useRoadmapStore(state => state.setTmdbDetails)
	const setGameDetails = useRoadmapStore(state => state.setGameDetails)
	const setBookDetails = useRoadmapStore(state => state.setBookDetails)

	const { generateRoadmap, isLoading } = useCanvasGeneration()

	const onNodeClick = (
		event: React.MouseEvent,
		node: Node<RoadmapData['nodes'][0]['data']>
	) => {
		event.preventDefault()
		event.stopPropagation()

		setTmdbDetails(null)
		if (typeof setGameDetails === 'function') {
			setGameDetails(null)
		}

		const apiId = node.data.tmdbId

		if (apiId && setSelectedMedia) {
			setSelectedMedia({
				id: isNaN(Number(apiId)) ? apiId : Number(apiId),
				name: node.data.contentSlug,
				type: node.data.mediaType,
			})
		}
	}

	const { isLoading: isTMDBLoading } = useQuery({
		queryKey: ['tmdbDetails', activeType, activeId],

		queryFn: async () => {
			const response = await fetch(
				`https://api.themoviedb.org/3/${activeType}/${activeId}?language=ru-RU`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
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
			setTmdbDetails(data)
			return data
		},
		enabled: Boolean(
			(activeType === 'movie' || activeType === 'tv') && activeId !== 0
		),
		retry: false,
	})
	const { isLoading: isGameLoading } = useQuery({
		queryKey: ['gameDetails', activeType, activeGameSlug],
		queryFn: async () => {
			const response = await fetch(
				`https://api.rawg.io/api/games/${activeGameSlug}?key=${RAWG_TOKEN}`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${RAWG_TOKEN}`,
					},
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
			activeType === 'game' && activeGameSlug && activeGameSlug.length > 0
		),
		retry: false,
	})

	const { isLoading: isBookLoading } = useQuery({
		queryKey: ['bookDetails', activeId],
		queryFn: async () => {
			const response = await fetch(
				`https://openlibrary.org/works/${activeId}.json`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
					},
				}
			)

			if (!response.ok) {
				const errorData = await response.json()
				console.error('OpenLibrary Error:', errorData)
				throw new Error('Ошибка получения данных от OpenLibrary')
			}

			const data: OpenLibraryBookDetails = await response.json()
			if (typeof setBookDetails === 'function') {
				setBookDetails(data)
			}

			return data
		},

		enabled: Boolean(activeType === 'book'),
		retry: false,
	})
	return {
		nodes,
		edges,
		tmdbDetails,
		isGameLoading,
		gameDetails,
		generateRoadmap,
		bookDetails,
		isBookLoading,
		isLoading,
		onNodeClick,
		selectedMedia,
		isTMDBLoading,
	}
}
