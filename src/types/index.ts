import { StaticImageData } from 'next/image'

export type MediaType = 'movie' | 'game' | 'book' | 'tv'

export interface RoadmapData {
	id: string
	title: string
	nodes: {
		id: string
		tmdbId: string
		type: 'mediaNode'
		position: { x: number; y: number }
		data: {
			poster: string
			name: string
			description: string
			mediaType: MediaType
			isSpoiler: boolean
			vpnRequired: boolean
		}
	}[]
	edges: {
		id: string
		source: string
		target: string
		label?: string
	}[]
}
export interface TMDBMediaItem {
	id: number | string
	title?: string
	name?: string
	original_title?: string
	original_name?: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null | StaticImageData
	release_date?: string
	first_air_date?: string
	genre_ids: number[]
	popularity: number
	vote_average: number
	vote_count: number
	original_language: string
	adult: boolean
	origin_country?: string[]

	media_type: MediaType
}
