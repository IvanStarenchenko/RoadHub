export function NoticeText() {
	return (
		<div className='max-w-md space-y-2 border-l-2 border-indigo-500/30 pl-4 py-1'>
			<p className='text-sm leading-relaxed text-slate-400'>
				<span className='text-indigo-300 font-medium italic'>Примечание:</span>{' '}
				Дорожные карты создаются нейросетью в реальном времени. ИИ может
				допускать неточности в хронологии или связях — мы называем это
				«творческим видением».
			</p>
			<p className='text-xs text-slate-500 font-light italic'>
				Для некоторых объектов (в особености книг) расширенная информация может
				быть недоступна.
			</p>
		</div>
	)
}
