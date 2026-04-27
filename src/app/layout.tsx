import QueryProvider from '@/components/QueryProvider/QueryProvider'
import { LayoutContent } from '@/components/UI/LayoutContent'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'MediaRoad — Интеллектуальные дорожные карты',
	description:
		'Нейросеть генерирует персональные маршруты по вашим любимым играм, книгам и фильмам. Исследуйте вселенные в новом формате.',
	keywords: [
		'дорожная карта',
		'roadmap',
		'искусственный интеллект',
		'таймлайн вселенной',
		'медиа-хаб',
	],
	icons: {
		icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className='min-h-full flex flex-col' suppressHydrationWarning>
				<LayoutContent />
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
