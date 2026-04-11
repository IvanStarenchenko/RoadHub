export type MediaType = 'movie' | 'game' | 'book' | 'note'

export interface RoadmapData {
	id: string
	title: string
	nodes: {
		id: string
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
