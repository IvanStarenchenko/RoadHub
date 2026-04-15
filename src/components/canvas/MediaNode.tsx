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
		note: '#fbbf24'
	}

	const color = colorMap[data.mediaType] ?? '#00E5FF'

	return (
		<div
			className="relative"
			style={{ pointerEvents: 'none' }}
		>
			<Handle
				type="target"
				position={Position.Top}
				className="bg-hub-cyan! w-3 h-3"
			/>

			<div
				className="flex w-75 gap-4 rounded-xl border bg-hub-surface p-3 transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
				style={{
					borderColor: `${color}`
				}}
			>
				<div className="relative h-39 w-25.5 shrink-0 overflow-hidden rounded-md bg-white/5">
					<Image
						fill
						src={data.poster || 'no img'}
						alt={data.name}
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="mt-1 flex flex-col gap-y-2 overflow-hidden">
					<h3 className="text-md  font-semibold leading-tight text-white">
						{data.name}
					</h3>

					<span
						className="w-fit rounded px-2 py-0.5 text-[10px] font-bold uppercase"
						style={{
							border: `1px solid ${color}`,
							color,
							backgroundColor: `${color}20`
						}}
					>
						{data.mediaType}
					</span>

					<p className=" text-[10px]  text-gray-400">{data.description}</p>
				</div>
			</div>

			<Handle
				type="source"
				position={Position.Bottom}
				className="bg-hub-cyan! h-3 w-3"
			/>
		</div>
	)
}
