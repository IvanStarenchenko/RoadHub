'use client'

import useRoadmapStore from '@/store/useRoadmapStore'
import { MediaType } from '@/types'
import Link from 'next/link'
import { DetailsLoader } from './DetailsLoader'
import { GameDetails } from './GameDetails'
import { TmdbDetails } from './TmdbDetails'

interface DetailsCardProps {
	selectedType?: MediaType
	isLoading?: boolean
}

export const DetailsCard = ({ selectedType, isLoading }: DetailsCardProps) => {
	const tmdbDetails = useRoadmapStore(state => state.tmdbDetails)
	const gameDetails = useRoadmapStore(state => state.gameDetails)
	const setTmdbDetails = useRoadmapStore(state => state.setTmdbDetails)
	const setGameDetails = useRoadmapStore(state => state.setGameDetails)

	const hasData = selectedType === 'game' ? !!gameDetails : !!tmdbDetails
	if (!hasData) return null

	const closeCard = () => {
		setTmdbDetails?.(null)
		setGameDetails?.(null)
	}

	const currentId = selectedType === 'game' ? gameDetails?.id : tmdbDetails?.id
	if (isLoading) {
		return (
			<div className="h-full bg-[#1a1c23]/90 backdrop-blur-xl">
				<DetailsLoader />
			</div>
		)
	}
	return (
		<div className="h-full flex flex-col bg-[#1a1c23]/90 backdrop-blur-xl text-slate-200">
			{selectedType === 'game' && gameDetails ? (
				<GameDetails data={gameDetails} />
			) : tmdbDetails ? (
				<TmdbDetails
					data={tmdbDetails}
					rating={tmdbDetails.vote_average?.toFixed(1)}
				/>
			) : null}

			<div className="flex flex-col gap-y-4 p-6 bg-black/20 backdrop-blur-md">
				<Link
					href={`https://media-hub.lol/details/${selectedType}/${currentId}`}
					className="w-full py-4 bg-(--secondActiveColor) border border-white/10 hover:bg-(--secondActiveColor)/60 text-white font-bold rounded-xl transition-all active:scale-[0.98] uppercase text-xs tracking-widest text-center"
				>
					{selectedType === 'game' ? 'Подробнее об игре' : 'Смотреть'}
				</Link>

				<button
					onClick={closeCard}
					className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all active:scale-[0.98] uppercase text-xs tracking-widest"
				>
					Закрыть
				</button>
			</div>
		</div>
	)
}
