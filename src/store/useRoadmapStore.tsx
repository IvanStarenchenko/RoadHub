// store/useRoadmapStore.ts
import { RoadmapData, TMDBMediaItem } from '@/types'

import { create } from 'zustand'
interface RoadmapState {
	nodes: RoadmapData['nodes']
	edges: RoadmapData['edges']
	cardDetails: TMDBMediaItem | null
	setCardDetails: (data: TMDBMediaItem | null) => void
	title: string
	setRoadmap: (data: RoadmapData) => void
}
const useRoadmapStore = create<RoadmapState>(set => ({
	nodes: [
		{
			id: '1',
			tmdbId: '1',
			type: 'mediaNode',
			position: { x: 250, y: 5 },
			data: {
				name: 'Железный человек',
				description: 'Миллиардер, плейбой, филантроп строит костюм в пещере.',
				mediaType: 'movie',
				poster:
					'https://image.tmdb.org/t/p/w500/781tY96VvA3vS5qO806n6XvB7Z6.jpg',
				isSpoiler: false,
				vpnRequired: false,
			},
		},
		{
			id: '2',
			tmdbId: '2',
			type: 'mediaNode',
			position: { x: 250, y: 300 },
			data: {
				name: 'Железный человек 2',
				description:
					'Тони Старк под давлением правительства и своего здоровья.',
				mediaType: 'movie',
				poster:
					'https://image.tmdb.org/t/p/w500/69Sns8o3S6pYp9vO6YclUf6ndpB.jpg',
				isSpoiler: true,
				vpnRequired: false,
			},
		},
	],
	edges: [
		{ id: 'e1-2', source: '1', target: '2', animated: true, label: 'приквел' },
	],
	title: 'Default Title',

	cardDetails: null,
	setCardDetails: data => set({ cardDetails: data }),

	setRoadmap: (data: RoadmapData) =>
		set({ nodes: data.nodes, edges: data.edges }),
}))

export default useRoadmapStore
