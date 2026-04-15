'use client'
import { IGameDetails } from '@/types/game'
import Image from 'next/image'

interface GameDetailsProps {
	data: IGameDetails
}

export const GameDetails = ({ data }: GameDetailsProps) => {
	return (
		<>
			<div className="relative h-[45%] w-full shrink-0">
				{data.background_image ? (
					<Image
						src={data.background_image}
						alt={data.name}
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
				{data.metacritic && (
					<div className="absolute bottom-4 right-6 bg-green-500 text-white font-black px-3 py-1 rounded shadow-lg text-sm">
						{data.metacritic} Metacritic
					</div>
				)}
			</div>

			<div className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide">
				<header className="space-y-2">
					<div className="flex items-center gap-2 text-[10px] font-bold text-green-400/80 uppercase tracking-[0.2em]">
						<span>Game</span>
						<span className="w-1 h-1 rounded-full bg-slate-600" />
						<span>{data.released?.split('-')[0] || 'N/A'}</span>
					</div>
					<h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
						{data.name}
					</h2>
				</header>

				<section className="space-y-3">
					<h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
						Описание
					</h3>
					<div className="text-slate-400 leading-relaxed font-light text-[15px] max-h-40 overflow-hidden text-ellipsis">
						{data.description_raw || 'Описание игры не найдено.'}
					</div>
				</section>

				<div className="grid grid-cols-2 gap-y-6 pt-6 border-t border-white/5">
					<div>
						<span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
							Время игры
						</span>
						<span className="text-white font-medium">{data.playtime} ч.</span>
					</div>
					<div>
						<span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
							Рейтинги
						</span>
						<span className="text-white font-medium">
							{data.ratings_count?.toLocaleString()}
						</span>
					</div>
					<div className="col-span-2">
						<span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">
							Платформы
						</span>
						<div className="flex flex-wrap gap-2 mt-2">
							{data.platforms?.map((p, index) => (
								<span
									key={`${p.platform.name}-${index}`}
									className="text-[9px] bg-white/10 px-2 py-1 rounded text-slate-300"
								>
									{p.platform.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
