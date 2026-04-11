import { useState } from 'react'

export function AISearch({ onSearch }: { onSearch: (val: string) => void }) {
	const [value, setValue] = useState('')

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			onSearch(value)
		}
	}

	return (
		<div className='absolute top-4 left-1/2 -translate-x-1/2 z-10'>
			<input
				type='text'
				value={value}
				onChange={e => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder='Нажми Enter для генерации...'
				className='
					w-105
					px-4 py-3
					rounded-xl
					
					bg-white/5
					backdrop-blur-md
					
					border border-white/10
					
					text-white text-sm
					placeholder:text-white/40
					
					outline-none
					
					transition-all duration-200
					
					focus:border-[#ff7e5f]
					focus:bg-white/10
					focus:shadow-[0_0_0_1px_rgba(255,126,95,0.3),0_0_20px_rgba(255,126,95,0.15)]
					
					hover:border-white/20
	'
			/>
		</div>
	)
}
