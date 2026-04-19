export interface OLSearchDocument {
	title: string
	key: string
	author_name?: string[]
	author_key?: string[]
	cover_i?: number
	first_publish_year?: number
	edition_count?: number
}

export interface OLSearchResponse {
	numFound: number
	docs: OLSearchDocument[]
	q: string
}
export interface OLAuthor {
	name: string
	url: string
}

export interface OLCover {
	small?: string
	medium?: string
	large?: string
}

export interface OpenLibraryBookDetails {
	title: string
	key: string
	notes?: string
	description?: string | { type: string; value: string }
	authors?: OLAuthor[]
	cover?: OLCover
	subjects?: { name: string; url: string }[]
	publish_date?: string
	by_statement?: string
	identifiers?: Record<string, string[]>
	links?: { url: string; title: string }[]
	weight?: string
	number_of_pages?: number
}
