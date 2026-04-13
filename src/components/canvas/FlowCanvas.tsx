'use client'

import { useState } from 'react'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

import { useGetDetails } from '@/hooks/useGetDetails'
import { MediaType } from '@/types'
import { AISearch } from './AISeach'
import { CanvasLoader } from './CanvasLoader'
import { DetailsCard } from './DetailsCard'
import { MediaNode } from './MediaNode'

const nodeTypes = {
	mediaNode: MediaNode
}

export default function FlowCanvas() {
	const [selectedMedia, setSelectedMedia] = useState<{
		id: number
		type: MediaType
	} | null>(null)

	const { nodes, edges, cardDetails, isLoading, onNodeClick, generateRoadmap } =
		useGetDetails(
			selectedMedia?.type || 'movie',
			selectedMedia?.id || 0,
			selectedMedia,
			setSelectedMedia
		)

	if (isLoading) {
		return <CanvasLoader />
	}
	return (
		<div
			className="relative"
			style={{ width: '100vw', height: '100vh', position: 'relative' }}
		>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					zIndex: 10
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
				<div className="absolute top-0 right-0 h-full w-full max-w-[33%] z-50 p-4 pointer-events-none">
					<div className="pointer-events-auto h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
						<DetailsCard selectedType={selectedMedia?.type} />
					</div>
				</div>
			)}
		</div>
	)
}
