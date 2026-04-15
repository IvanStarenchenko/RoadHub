export interface IGameDetails {
	id: number
	slug: string
	name: string
	description: string
	released: string
	background_image: string
	website: string
	rating: number
	achievements_count: number
	ratings_count: number
	game_series_count: number
	metacritic: number
	description_raw: string
	genres: { name: string }[]
	platforms: { platform: { name: string } }[]
	publishers: { name: string }[]
	esrb_rating: { name: string } | null
	playtime: number
	developers: { name: string }[]
}
