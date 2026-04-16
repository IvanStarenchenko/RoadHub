'use client'

import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'

import { useGetDetails } from '@/hooks/useGetDetails'
import { AISearch } from './AISeach'
import { CanvasLoader } from './CanvasLoader'
import { DetailsCard } from './Details/DetailsCard'
import { MediaNode } from './MediaNode'

const nodeTypes = {
	mediaNode: MediaNode,
}

export default function FlowCanvas() {
	const {
		nodes,
		edges,
		tmdbDetails,
		isLoading,
		onNodeClick,
		isGameLoading,
		isTMDBLoading,
		isBookLoading,
		generateRoadmap,
		gameDetails,
		bookDetails,
		selectedMedia,
	} = useGetDetails()

	if (isLoading) {
		return <CanvasLoader />
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

			{(tmdbDetails || gameDetails || bookDetails) && (
				<div className='absolute top-0 right-0 h-full w-full max-w-[33%] z-50 p-4 pointer-events-none'>
					<div className='pointer-events-auto h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]'>
						<DetailsCard
							selectedType={selectedMedia?.type}
							isLoading={isGameLoading || isTMDBLoading || isBookLoading}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
