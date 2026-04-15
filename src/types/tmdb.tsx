import { StaticImageData } from 'next/image'
import { MediaType } from '.'

export interface TMDBMediaItem {
	id: number | string
	title?: string
	name?: string
	original_title?: string
	original_name?: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null | StaticImageData
	release_date?: string
	first_air_date?: string
	genre_ids: number[]
	popularity: number
	vote_average: number
	vote_count: number
	original_language: string
	adult: boolean
	origin_country?: string[]

	media_type: MediaType
}
