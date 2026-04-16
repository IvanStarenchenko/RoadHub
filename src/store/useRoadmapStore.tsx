import { RoadmapData } from '@/types'
import { OpenLibraryBookDetails } from '@/types/book'
import { IGameDetails } from '@/types/game'
import { TMDBMediaItem } from '@/types/tmdb'

import { create } from 'zustand'
interface RoadmapState {
	nodes: RoadmapData['nodes']
	edges: RoadmapData['edges']

	tmdbDetails: TMDBMediaItem | null
	gameDetails?: IGameDetails | null
	bookDetails?: OpenLibraryBookDetails | null

	setTmdbDetails: (data: TMDBMediaItem | null) => void
	setGameDetails?: (data: IGameDetails | null) => void
	setBookDetails?: (data: OpenLibraryBookDetails | null) => void

	title: string
	setRoadmap: (data: RoadmapData) => void
}
const useRoadmapStore = create<RoadmapState>(set => ({
	nodes: [],
	edges: [],
	title: '',

	tmdbDetails: null,
	gameDetails: null,
	bookDetails: null,

	setGameDetails: data => set({ gameDetails: data }),
	setTmdbDetails: data => set({ tmdbDetails: data }),
	setBookDetails: data => set({ bookDetails: data }),

	setRoadmap: (data: RoadmapData) =>
		set({ nodes: data.nodes, edges: data.edges }),
}))

export default useRoadmapStore
