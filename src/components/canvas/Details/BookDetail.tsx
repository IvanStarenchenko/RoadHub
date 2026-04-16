'use client'
import { OpenLibraryBookDetails } from '@/types/book'
import Image from 'next/image'
import Link from 'next/link'

interface BookDetailsProps {
	data: OpenLibraryBookDetails | null | undefined
}

export const BookDetails = ({ data }: BookDetailsProps) => {
	if (!data) return null
	const coverId = data.covers?.[0]
	const coverUrl = coverId
		? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
		: null

	const description =
		typeof data.description === 'string'
			? data.description
			: data.description || data.excerpts?.[0]?.excerpt

	return (
		<>
			<div className='relative h-[45%] w-full shrink-0 bg-[#1a1c23]'>
				{coverUrl ? (
					<div className='relative w-full h-full flex items-center justify-center p-6'>
						<Image
							src={coverUrl}
							alt=''
							fill
							className='object-cover opacity-20 blur-md'
						/>
						<div className='relative h-full aspect-[2/3] shadow-[0_20px_50px_rgba(0,0,0,0.5)]'>
							<Image
								src={coverUrl}
								alt={data.title}
								fill
								className='object-contain'
								priority
							/>
						</div>
					</div>
				) : (
					<div className='w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 italic'>
						Обложка отсутствует
					</div>
				)}
				<div className='absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-black/20' />
			</div>

			<div className='flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide'>
				<header className='space-y-2'>
					<div className='flex items-center gap-2 text-[10px] font-bold text-blue-400/80 uppercase tracking-[0.2em]'>
						<span>Book</span>
						<span className='w-1 h-1 rounded-full bg-slate-600' />
						<span>{data.first_publish_date || 'Unknown Date'}</span>
					</div>
					<h2 className='text-3xl font-extrabold tracking-tight text-white leading-tight'>
						{data.title}
					</h2>
				</header>

				<section className='space-y-3'>
					<h3 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
						Аннотация
					</h3>
					<div className='text-slate-400 leading-relaxed font-light text-[15px] max-h-40 overflow-y-auto pr-2 custom-scrollbar'>
						{description || 'Описание книги не найдено.'}
					</div>
				</section>

				<div className='grid grid-cols-2 gap-y-6 pt-6 border-t border-white/5'>
					<div>
						<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
							Ревизия
						</span>
						<span className='text-white font-medium'>v{data.revision}</span>
					</div>
					<div>
						<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
							Первая публикация
						</span>
						<span className='text-white font-medium text-sm'>
							{data.first_publish_date}
						</span>
					</div>

					{data.subjects && data.subjects.length > 0 && (
						<div className='col-span-2'>
							<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
								Темы
							</span>
							<div className='flex flex-wrap gap-2 mt-2'>
								{data.subjects
									.slice(0, 8)
									.map((subject: string, index: number) => (
										<span
											key={`${subject}-${index}`}
											className='text-[9px] bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded text-blue-300'
										>
											{subject}
										</span>
									))}
							</div>
						</div>
					)}

					{data.links && (
						<div className='col-span-2'>
							<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
								Ссылки
							</span>
							<div className='flex flex-col gap-2 mt-2'>
								{data.links.map(
									(link: { url?: string; title: string }, index: number) =>
										link.url ? (
											<Link
												key={index}
												href={link.url}
												target='_blank'
												className='text-xs text-blue-400 hover:underline flex items-center gap-1'
											>
												{link.title} ↗
											</Link>
										) : null
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
