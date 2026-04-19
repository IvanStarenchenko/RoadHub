'use client'

export const DetailsLoader = () => {
	return (
		<div className='h-full flex flex-col bg-[#1a1c23]/90 backdrop-blur-xl animate-pulse'>
			<div className='relative h-[45%] w-full bg-white/5 shrink-0 overflow-hidden'>
				<div className='absolute inset-0 bg-gradient-to-t from-[#1a1c23] via-transparent to-transparent' />
				<div className='absolute bottom-4 right-6 w-16 h-8 bg-white/10 rounded' />
			</div>

			<div className='flex-1 p-8 space-y-6'>
				<header className='space-y-3'>
					<div className='flex items-center gap-2'>
						<div className='w-12 h-3 bg-white/5 rounded' />
						<div className='w-1 h-1 rounded-full bg-white/5' />
						<div className='w-8 h-3 bg-white/5 rounded' />
					</div>
					<div className='w-3/4 h-8 bg-white/10 rounded-lg' />
				</header>

				<div className='space-y-3'>
					<div className='w-16 h-3 bg-white/5 rounded' />
					<div className='space-y-2'>
						<div className='w-full h-4 bg-white/5 rounded' />
						<div className='w-full h-4 bg-white/5 rounded' />
						<div className='w-2/3 h-4 bg-white/5 rounded' />
					</div>
				</div>

				<div className='grid grid-cols-2 gap-y-6 pt-6 border-t border-white/5'>
					<div className='space-y-2'>
						<div className='w-10 h-2 bg-white/5 rounded' />
						<div className='w-14 h-4 bg-white/10 rounded' />
					</div>
					<div className='space-y-2'>
						<div className='w-10 h-2 bg-white/5 rounded' />
						<div className='w-14 h-4 bg-white/10 rounded' />
					</div>
				</div>
			</div>

			<div className='p-6 space-y-4 bg-black/20'>
				<div className='w-full h-14 bg-white/5 rounded-xl' />
				<div className='w-full h-14 bg-white/5 rounded-xl' />
			</div>
		</div>
	)
}
