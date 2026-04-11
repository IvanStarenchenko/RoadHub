// components/canvas/FlowCanvas.tsx
'use client'
import { useCanvasGeneration } from '@/hooks/useCanvasGeneration'
import useRoadmapStore from '@/store/useRoadmapStore'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { AISearch } from './AISeach'
import { CanvasLoader } from './CanvasLoader'
// import { HeaderCanvas } from './HeaderCanvas'
import { MediaNode } from './MediaNode'
const nodeTypes = {
	mediaNode: MediaNode,
}

export function FlowCanvas() {
	const { nodes, edges, title } = useRoadmapStore()
	const { isLoading, generateRoadmap } = useCanvasGeneration()

	return (
		<div className='h-screen w-full bg-hub-dark'>
			{/* <HeaderCanvas title={isLoading ? 'Generating universe...' : title} /> */}

			{isLoading && <CanvasLoader />}

			<ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
				<Background color='#222' gap={20} />
				<Controls />
				<AISearch onSearch={generateRoadmap} />
			</ReactFlow>
		</div>
	)
}
