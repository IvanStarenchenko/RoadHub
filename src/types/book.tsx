export interface OpenLibraryBookDetails {
	description?: string
	title: string
	covers?: number[]
	revision: number

	subjects?: string[]
	created?: {
		type: string
		value: string
	}
	links?: { url?: string; title: string }[]
	excerpts?: { excerpt: string }[]
	key: string
	authors?: { author: { key: string } }[]
	first_publish_date?: string
	subject_people?: string[]
}
