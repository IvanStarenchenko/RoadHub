// components/canvas/MediaNode.tsx
'use client'
import { RoadmapData } from '@/types'
import Image from 'next/image'
import { Handle, Position } from 'reactflow'

type MediaNodeProps = {
	data: RoadmapData['nodes'][0]['data']
}

export function MediaNode({ data }: MediaNodeProps) {
	if (!data) return null

	const colorMap: Record<string, string> = {
		movie: '#ff7e5f',
		game: '#ef4444',
		book: '#3b82f6',
		note: '#fbbf24',
	}

	const color = colorMap[data.mediaType] ?? '#00E5FF'

	return (
		<div className='relative'>
			<Handle
				type='target'
				position={Position.Top}
				className='!bg-hub-cyan w-3 h-3'
			/>

			<div
				className='flex w-[300px] gap-4 rounded-xl border bg-hub-surface p-3 transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]'
				style={{
					borderColor: `${color}`,
				}}
			>
				<div className='relative h-[156px] w-[102px] flex-shrink-0 overflow-hidden rounded-md bg-white/5'>
					<Image
						src={data.poster}
						alt={data.name}
						priority
						fill
						className={`object-cover transition-all hover:scale-105 `}
					/>
				</div>

				<div className='mt-1 flex flex-col gap-y-2 overflow-hidden'>
					<h3 className='text-md font-semibold leading-tight text-white truncate'>
						{data.name}
					</h3>

					<span
						className='w-fit rounded px-2 py-[2px] text-[10px] font-bold uppercase'
						style={{
							border: `1px solid ${color}`,
							color,
							backgroundColor: `${color}20`,
						}}
					>
						{data.mediaType}
					</span>

					<p className='text-[10px] text-gray-400 leading-snug line-clamp-3'>
						{data.description}
					</p>
				</div>
			</div>

			<Handle
				type='source'
				position={Position.Bottom}
				className='!bg-hub-cyan w-3 h-3'
			/>
		</div>
	)
}
