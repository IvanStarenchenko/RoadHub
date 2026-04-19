'use client'

import useRoadmapStore from '@/store/useRoadmapStore'
import { MediaType } from '@/types'
import Link from 'next/link'
import { BookDetails } from './BookDetail'
import { GameDetails } from './GameDetails'
import { TmdbDetails } from './TmdbDetails'

interface DetailsCardProps {
	selectedType?: MediaType
}

export const DetailsCard = ({ selectedType }: DetailsCardProps) => {
	const {
		tmdbDetails,
		gameDetails,
		bookDetails,
		setTmdbDetails,
		setGameDetails,
		setBookDetails,
	} = useRoadmapStore()

	const getCurrentData = () => {
		if (selectedType === 'game') return gameDetails
		if (selectedType === 'book') return bookDetails
		return tmdbDetails
	}
	const data = getCurrentData()

	if (!data) return null

	const closeCard = () => {
		setTmdbDetails(null)
		setGameDetails?.(null)
		setBookDetails?.(null)
	}
	const currentId =
		'key' in data
			? data.key?.replace('/works/', '')
			: 'id' in data
			? data.id
			: null

	return (
		<div className='h-full flex flex-col bg-[#1a1c23]/90 backdrop-blur-xl text-slate-200'>
			<div className='flex-1 overflow-y-auto'>
				{selectedType === 'game' && gameDetails && (
					<GameDetails data={gameDetails} />
				)}

				{selectedType === 'book' && bookDetails && (
					<BookDetails data={bookDetails} />
				)}

				{(selectedType === 'movie' || selectedType === 'tv') && tmdbDetails && (
					<TmdbDetails
						data={tmdbDetails}
						rating={tmdbDetails.vote_average?.toFixed(1)}
					/>
				)}
			</div>

			<div className='flex flex-col gap-y-4 p-6 bg-black/20 backdrop-blur-md shrink-0'>
				<Link
					href={`https://media-hub.lol/details/${selectedType}/${currentId}`}
					className='w-full py-4 bg-(--secondActiveColor) border border-white/10 hover:bg-(--secondActiveColor)/60 text-white font-bold rounded-xl transition-all active:scale-[0.98] uppercase text-xs tracking-widest text-center'
				>
					{selectedType === 'game'
						? 'Подробнее об игре'
						: selectedType === 'book'
						? 'Подробнее о книге'
						: 'Смотреть'}
				</Link>

				<button
					onClick={closeCard}
					className='w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98] uppercase text-xs tracking-widest'
				>
					Закрыть
				</button>
			</div>
		</div>
	)
}
