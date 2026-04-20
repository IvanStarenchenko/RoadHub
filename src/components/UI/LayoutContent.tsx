'use client'
import { CircleArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NoticeText } from '../canvas/noticeText'

export function LayoutContent() {
	const router = useRouter()

	const getBack = () => {
		router.back()
	}
	return (
		<div className='absolute cursor-pointer top-7 text-(--activeColor) left-7 z-2'>
			<div onClick={getBack}>
				<CircleArrowLeft size={38} />
			</div>

			<div className='mt-5'>
				<NoticeText />
			</div>
		</div>
	)
}
