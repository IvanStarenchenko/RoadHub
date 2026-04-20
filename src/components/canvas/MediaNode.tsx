'use client'
import { useContentPoster } from '@/hooks/useContentPoster'
import Image from 'next/image'
import { memo } from 'react'
import { Handle, NodeProps, Position } from 'reactflow'

const MEDIA_THEMES: Record<
	string,
	{ border: string; shadow: string; glow: string }
> = {
	movie: {
		border: 'border-yellow-500',
		shadow: 'rgba(234, 179, 8, 0.3)',
		glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
	},
	tv: {
		border: 'border-green-500',
		shadow: 'rgba(34, 197, 94, 0.3)',
		glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
	},
	game: {
		border: 'border-red-500',
		shadow: 'rgba(239, 68, 68, 0.3)',
		glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
	},
	book: {
		border: 'border-blue-500',
		shadow: 'rgba(59, 130, 246, 0.3)',
		glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
	},
	default: { border: 'border-white/10', shadow: 'transparent', glow: '' },
}
type MediaNodeData = {
	contentSlug: string
	tmdbId: string
	name: string
	description: string
	mediaType: 'movie' | 'tv' | 'game' | 'book'
	poster?: string
	isSpoiler: boolean
	vpnRequired: boolean
	releaseYear: number
}
export const MediaNode = memo(
	({ data, selected }: NodeProps<MediaNodeData>) => {
		const { tmdbId, name, mediaType, releaseYear, description } = data

		const theme = MEDIA_THEMES[mediaType] || MEDIA_THEMES.default

		const { posterPath, isLoading } = useContentPoster(tmdbId, mediaType)
		const finalPoster = posterPath || data.poster

		return (
			<div
				className={`group transition-transform duration-300 ${
					selected ? 'scale-105' : 'hover:scale-[1.02]'
				}`}
			>
				<Handle
					type='target'
					position={Position.Top}
					className='w-3 h-3 bg-yellow-500 border-2 border-[#1a1c23] !opacity-0 group-hover:!opacity-100 transition-opacity'
				/>

				<div
					className={`w-[200px] bg-[#1a1c23] border transition-all duration-300 ${
						selected ? `${theme.border} ${theme.glow}` : 'border-white/10'
					}`}
				>
					<div className='relative h-[280px] w-full bg-slate-800 overflow-hidden'>
						{finalPoster ? (
							<Image
								src={finalPoster}
								alt={name}
								fill
								className='object-cover'
								sizes='200px'
								priority={selected}
							/>
						) : (
							<div className='flex items-center justify-center h-full text-slate-500 text-[10px] uppercase font-bold p-4 text-center'>
								{isLoading ? 'Загрузка...' : name}
							</div>
						)}
						<div className='absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-transparent' />
						<div className='absolute bottom-2 right-2 flex gap-1'>
							<span className='text-[9px] bg-black/50 backdrop-blur-md text-white/70 px-2 py-0.5 rounded capitalize'>
								{mediaType}
							</span>
						</div>
					</div>

					<div className='p-3 space-y-1'>
						<div className='flex justify-between items-start gap-2'>
							<h4 className='font-bold text-sm text-white flex-1 line-clamp-1'>
								{name}
							</h4>
							<span className='text-[10px] text-slate-500 font-medium'>
								{releaseYear}
							</span>
						</div>
						<p className='text-[10px] text-slate-400 font-light leading-relaxed line-clamp-3'>
							{description}
						</p>
					</div>
				</div>

				<Handle
					type='source'
					position={Position.Bottom}
					className='w-3 h-3 bg-yellow-500 border-2 border-[#1a1c23] !opacity-0 group-hover:!opacity-100 transition-opacity'
				/>
			</div>
		)
	}
)

MediaNode.displayName = 'MediaNode'
