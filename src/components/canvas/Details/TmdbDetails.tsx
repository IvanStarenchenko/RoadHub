'use client'
import { TMDBMediaItem } from '@/types/tmdb'
import Image from 'next/image'

interface TmdbDetailsProps {
	data: TMDBMediaItem
	rating?: string
}

export const TmdbDetails = ({ data, rating }: TmdbDetailsProps) => {
	const title = data.title || data.name || 'Без названия'
	const poster = data.poster_path
		? `https://image.tmdb.org/t/p/w780${data.poster_path}`
		: null

	return (
		<>
			<div className="relative h-[45%] w-full shrink-0">
				{poster ? (
					<Image
						src={poster}
						alt={title}
						fill
						className="object-cover"
						priority
					/>
				) : (
					<div className="w-full h-full bg-slate-800 flex items-center justify-center">
						Нет фото
					</div>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-black/20" />
				{rating && (
					<div className="absolute bottom-4 right-6 bg-yellow-500 text-black font-black px-3 py-1 rounded shadow-lg text-sm italic">
						{rating} TMDB
					</div>
				)}
			</div>

			<div className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide">
				<header className="space-y-2">
					<div className="flex items-center gap-2 text-[10px] font-bold text-yellow-500/80 uppercase tracking-[0.2em]">
						<span>{data.media_type || 'Movie'}</span>
						<span className="w-1 h-1 rounded-full bg-slate-600" />
						<span>{data.release_date?.split('-')[0] || 'N/A'}</span>
					</div>
					<h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
						{title}
					</h2>
				</header>

				<section className="space-y-3">
					<h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
						Обзор
					</h3>
					<p className="text-slate-400 leading-relaxed font-light text-[15px]">
						{data.overview || 'Описание не предоставлено.'}
					</p>
				</section>

				<div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-white/5">
					<div>
						<span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
							Голоса
						</span>
						<span className="text-white font-medium">
							{data.vote_count?.toLocaleString()}
						</span>
					</div>
					<div>
						<span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
							Язык
						</span>
						<span className="text-white font-medium uppercase">
							{data.original_language}
						</span>
					</div>
				</div>
			</div>
		</>
	)
}
