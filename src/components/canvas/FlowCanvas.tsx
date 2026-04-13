'use client'

import { useState } from 'react'
import ReactFlow, { Background, Controls, Node } from 'reactflow'
import 'reactflow/dist/style.css'

import { useCanvasGeneration } from '@/hooks/useCanvasGeneration'
import { useGetDetails } from '@/hooks/useGetDetails'
import useRoadmapStore from '@/store/useRoadmapStore'
import { MediaType } from '@/types'
import { AISearch } from './AISeach'
import { DetailsCard } from './DetailsCard'
import { MediaNode } from './MediaNode'
interface MediaNodeData {
	tmdbId?: string | number
	mediaType?: string
	name?: string
	description?: string
	poster?: string
	isSpoiler?: boolean
	vpnRequired?: boolean
}
const nodeTypes = {
	mediaNode: MediaNode,
}

export default function FlowCanvas() {
	const nodes = useRoadmapStore(state => state.nodes)
	const edges = useRoadmapStore(state => state.edges)
	const cardDetails = useRoadmapStore(state => state.cardDetails)
	const { generateRoadmap } = useCanvasGeneration()

	const [selectedMedia, setSelectedMedia] = useState<{
		id: number
		type: MediaType
	} | null>(null)

	useGetDetails(selectedMedia?.type || 'movie', selectedMedia?.id || 0)

	const onNodeClick = (event: React.MouseEvent, node: Node<MediaNodeData>) => {
		event.preventDefault()
		event.stopPropagation()

		const tmdbId = node.data?.tmdbId || node.id

		if (tmdbId && tmdbId !== '0') {
			setSelectedMedia({
				id: Number(tmdbId),
				type: (node.data?.mediaType as MediaType) || 'movie',
			})
		}
	}

	return (
		<div
			className='relative'
			style={{ width: '100vw', height: '100vh', position: 'relative' }}
		>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					zIndex: 10,
				}}
			>
				<AISearch onSearch={generateRoadmap} />
			</div>

			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				onNodeClick={onNodeClick}
				selectNodesOnDrag={false}
				fitView
			>
				<Background />
				<Controls />
			</ReactFlow>
			{cardDetails && (
				<div className='absolute top-0 right-0 h-full w-full max-w-[33%] z-50 p-4 pointer-events-none'>
					<div className='pointer-events-auto h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
						<DetailsCard />
					</div>
				</div>
			)}
		</div>
	)
}
