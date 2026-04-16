export type MediaType = 'movie' | 'game' | 'book' | 'tv'

export interface RoadmapData {
	id: string
	title: string
	nodes: {
		id: string
		type: 'mediaNode'
		position: { x: number; y: number }
		data: {
			contentSlug: string
			tmdbId: string

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
