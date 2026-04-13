'use client'

import useRoadmapStore from '@/store/useRoadmapStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const DetailsCard = () => {
	const cardDetails = useRoadmapStore(state => state.cardDetails)
	const setCardDetails = useRoadmapStore(state => state.setCardDetails)
	const router = useRouter()
	if (!cardDetails) return null

	const title = cardDetails.title || cardDetails.name || 'Без названия'
	const rating = cardDetails.vote_average?.toFixed(1)
	const poster = cardDetails.poster_path
		? `https://image.tmdb.org/t/p/w780${cardDetails.poster_path}`
		: null

	return (
		<div className='h-full flex flex-col bg-[#1a1c23]/90 backdrop-blur-xl text-slate-200'>
			{/* Секция Постера */}
			<div className='relative h-[45%] w-full shrink-0'>
				{poster ? (
					<Image
						src={poster}
						alt={title}
						fill
						className='object-cover'
						priority
					/>
				) : (
					<div className='w-full h-full bg-slate-800 flex items-center justify-center'>
						Нет фото
					</div>
				)}
				{/* Затемнение снизу для текста */}
				<div className='absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-black/20' />

				{/* Рейтинг поверх картинки */}
				{rating && (
					<div className='absolute bottom-4 right-6 bg-yellow-500 text-black font-black px-3 py-1 rounded shadow-lg text-sm italic'>
						{rating} TMDB
					</div>
				)}
			</div>

			{/* Контентная часть */}
			<div className='flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide'>
				<header className='space-y-2'>
					<div className='flex items-center gap-2 text-[10px] font-bold text-yellow-500/80 uppercase tracking-[0.2em]'>
						<span>{cardDetails.media_type}</span>
						<span className='w-1 h-1 rounded-full bg-slate-600' />
						<span>{cardDetails.release_date?.split('-')[0] || 'N/A'}</span>
					</div>
					<h2 className='text-3xl font-extrabold tracking-tight text-white leading-tight'>
						{title}
					</h2>
				</header>

				<section className='space-y-3'>
					<h3 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
						Обзор
					</h3>
					<p className='text-slate-400 leading-relaxed font-light text-[15px]'>
						{cardDetails.overview || 'Описание не предоставлено.'}
					</p>
				</section>

				{/* Сетка характеристик */}
				<div className='grid grid-cols-2 gap-y-6 pt-6 border-t border-white/5'>
					<div>
						<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
							Голоса
						</span>
						<span className='text-white font-medium'>
							{cardDetails.vote_count.toLocaleString()}
						</span>
					</div>
					<div>
						<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
							Язык
						</span>
						<span className='text-white font-medium uppercase'>
							{cardDetails.original_language}
						</span>
					</div>
					<div className='col-span-2'>
						<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
							Популярность
						</span>
						<div className='w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden'>
							<div
								className='h-full bg-yellow-500/50 rounded-full'
								style={{
									width: `${Math.min(cardDetails.popularity / 10, 100)}%`,
								}}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-y-4 p-6 bg-black/20 backdrop-blur-md'>
				<button
					onClick={() =>
						router.push(
							`/https://media-hub.lol/details/${cardDetails.media_type}/${cardDetails.id}`
						)
					}
					className='w-full py-4 bg-(--secondActiveColor) border border-white/10 hover:bg-(--secondActiveColor)/60 text-white font-bold rounded-xl transition-all active:scale-[0.98] uppercase text-xs tracking-widest'
				>
					Смотреть
				</button>
				<button
					onClick={() => setCardDetails(null)}
					className='w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98] uppercase text-xs tracking-widest'
				>
					Закрыть
				</button>
			</div>
		</div>
	)
}
