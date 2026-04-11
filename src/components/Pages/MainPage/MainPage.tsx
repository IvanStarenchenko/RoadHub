import { TrendingUp } from 'lucide-react'
export function MainPage() {
	return (
		<div>
			<div>
				<h1>RoadHub</h1>
				<p>AI-Powered Media Universe Navigator</p>
			</div>
			<div className='ai-loader'>
				<span></span>
				<span></span>
				<span></span>
				<p className='ml-2'>AI Ready to Generate</p>
			</div>
			<div>
				<TrendingUp /> <h2>Trending Roadmaps</h2>
			</div>
		</div>
	)
}
