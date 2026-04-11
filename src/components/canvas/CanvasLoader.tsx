export function CanvasLoader() {
	return (
		<div className='absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
			<div className='flex flex-col items-center gap-4'>
				<div className='h-12 w-12 animate-spin rounded-full border-4 border-hub-cyan border-t-transparent'></div>
				<p className='text-hub-cyan font-mono animate-pulse'>
					AI is mapping the stars...
				</p>
			</div>
		</div>
	)
}
