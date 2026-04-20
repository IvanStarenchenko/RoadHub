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
		id: number | string
		name?: string
		type: MediaType
	} | null>(null)

	const activeType = selectedMedia?.type
	const activeId = selectedMedia?.id
	const activeSlug = selectedMedia?.name

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
		console.log(
			'Fetching details for:',
			activeSlug,
			'with token length:',
			process.env.NEXT_PUBLIC_TMDB_TOKEN?.length,
			process.env.NEXT_PUBLIC_RAW_API?.length
		)
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
			console.log(
				'Fetching details for:',
				activeSlug,
				'with token length:',
				process.env.NEXT_PUBLIC_TMDB_TOKEN?.length
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
		queryKey: ['gameDetails', activeType, activeSlug],
		queryFn: async () => {
			const response = await fetch(
				`https://api.rawg.io/api/games/${activeSlug}?key=${RAWG_TOKEN}`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${RAWG_TOKEN}`,
					},
				}
			)
			console.log(
				'Fetching details for:',
				activeSlug,
				'with token length:',
				process.env.NEXT_PUBLIC_RAW_API?.length
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
			activeType === 'game' && activeSlug && activeSlug.length > 0
		),
		retry: false,
	})

	const { isLoading: isBookLoading } = useQuery({
		queryKey: ['bookDetails', activeSlug],
		queryFn: async () => {
			// 1. Простейшая проверка: если слага нет, возвращаем null (не undefined!)
			if (!activeSlug) return null

			const isIsbn = /^\d{10,13}$/.test(activeSlug)

			try {
				if (isIsbn) {
					const response = await fetch(
						`https://openlibrary.org/api/books?bibkeys=ISBN:${activeSlug}&format=json&jscmd=data`
					)
					const data = await response.json()
					const bookData = data[`ISBN:${activeSlug}`] || null

					if (bookData && typeof setBookDetails === 'function') {
						setBookDetails(bookData)
					}
					return bookData
				} else {
					// Поиск по текстовому слагу (напр. "warcraft-beyond-the-dark-portal-2008")
					const query = activeSlug.replace(/-/g, ' ')
					const searchResponse = await fetch(
						`https://openlibrary.org/search.json?q=${encodeURIComponent(
							query
						)}&limit=1`
					)
					const searchData = await searchResponse.json()

					if (!searchData.docs?.length) return null

					const bookKey =
						searchData.docs[0].seed?.[0]?.replace('/books/', '') ||
						searchData.docs[0].key.replace('/works/', '')

					const detailsResponse = await fetch(
						`https://openlibrary.org/api/books?bibkeys=OLID:${bookKey}&format=json&jscmd=data`
					)
					const detailsData = await detailsResponse.json()
					const bookData = detailsData[`OLID:${bookKey}`] || null

					if (bookData && typeof setBookDetails === 'function') {
						setBookDetails(bookData)
					}
					return bookData
				}
			} catch (error) {
				console.error('Error fetching book:', error)
				return null
			}
		},
		enabled: Boolean(activeType === 'book' && activeSlug),
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
