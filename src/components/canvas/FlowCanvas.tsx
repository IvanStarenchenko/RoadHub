'use client'

import { useGetDetails } from '@/hooks/useGetDetails'
import { CircleArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReactFlow, { Background, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { AISearch } from './AISeach'
import { CanvasLoader } from './CanvasLoader'
import { DetailsCard } from './Details/DetailsCard'
import { DetailsLoader } from './Details/DetailsLoader'
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
	const router = useRouter()
	const getBack = () => {
		router.back()
	}
	if (isLoading) {
		return <CanvasLoader />
	}
	const isAnyLoading = isGameLoading || isTMDBLoading || isBookLoading
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
			<div
				className='absolute cursor-pointer top-7 text-(--activeColor) left-7 z-2'
				onClick={getBack}
			>
				<CircleArrowLeft size={38} />
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
				<div className='absolute top-0 right-0 h-full w-full max-w-[33%] z-50 p-4 pointer-events-none animate-in fade-in slide-in-from-right-5 duration-300'>
					<div className='pointer-events-auto h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#1a1c23]/95 backdrop-blur-xl flex flex-col'>
						{isAnyLoading ? (
							<div className='flex-1 flex items-center justify-center'>
								<DetailsLoader />
							</div>
						) : (
							<DetailsCard selectedType={selectedMedia?.type} />
						)}
					</div>
				</div>
			)}
		</div>
	)
}
