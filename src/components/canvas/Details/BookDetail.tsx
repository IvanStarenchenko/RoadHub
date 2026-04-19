'use client'
import { OpenLibraryBookDetails } from '@/types/book'
import Image from 'next/image'
import Link from 'next/link'
interface BookDetailsProps {
	data: OpenLibraryBookDetails | null | undefined
}

export const BookDetails = ({ data }: BookDetailsProps) => {
	if (!data) return null
	const coverUrl =
		data.cover?.large || data.cover?.medium || data.cover?.small || null
	const description =
		typeof data.description === 'string'
			? data.description
			: data.description?.value || data.notes

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
					<div className='w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 italic text-xs uppercase tracking-widest'>
						Обложка отсутствует
					</div>
				)}
				<div className='absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-black/20' />
			</div>

			<div className='flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide'>
				<header className='space-y-3'>
					<div className='flex items-center gap-2 text-[10px] font-bold text-blue-400/80 uppercase tracking-[0.2em]'>
						<span>Книга</span>
						<span className='w-1 h-1 rounded-full bg-slate-600' />
						<span>{data.publish_date || 'Дата неизвестна'}</span>
					</div>

					<h2 className='text-3xl font-extrabold tracking-tight text-white leading-tight'>
						{data.title}
					</h2>

					{data.authors && (
						<div className='flex flex-wrap gap-2'>
							{data.authors.map((author, idx) => (
								<span key={idx} className='text-sm text-slate-400 font-medium'>
									{author.name}
									{idx < data.authors!.length - 1 ? ',' : ''}
								</span>
							))}
						</div>
					)}
				</header>

				<section className='space-y-3'>
					<h3 className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
						Аннотация
					</h3>
					<div className='text-slate-400 leading-relaxed font-light text-[15px] max-h-48 overflow-y-auto pr-2 custom-scrollbar'>
						{description || 'Описание книги не найдено.'}
					</div>
				</section>

				<div className='grid grid-cols-2 gap-y-6 pt-6 border-t border-white/5'>
					{data.publish_date && (
						<div>
							<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
								Опубликовано
							</span>
							<span className='text-white font-medium text-sm'>
								{data.publish_date}
							</span>
						</div>
					)}

					{data.number_of_pages && (
						<div>
							<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
								Страниц
							</span>
							<span className='text-white font-medium text-sm'>
								{data.number_of_pages}
							</span>
						</div>
					)}

					{data.subjects && data.subjects.length > 0 && (
						<div className='col-span-2'>
							<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
								Темы
							</span>
							<div className='flex flex-wrap gap-2 mt-2'>
								{data.subjects.slice(0, 6).map((subject, index) => (
									<span
										key={index}
										className='text-[9px] bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded text-blue-300 uppercase tracking-wider'
									>
										{subject.name}
									</span>
								))}
							</div>
						</div>
					)}

					{data.links && data.links.length > 0 && (
						<div className='col-span-2'>
							<span className='block text-[10px] text-slate-500 uppercase font-bold mb-1'>
								Ресурсы
							</span>
							<div className='flex flex-col gap-2 mt-2'>
								{data.links.map((link, index) => (
									<Link
										key={index}
										href={link.url}
										target='_blank'
										className='text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1'
									>
										{link.title}{' '}
										<span className='text-[10px] opacity-50'>↗</span>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
