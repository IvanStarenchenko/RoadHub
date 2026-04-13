'use client'
import { getLayoutedElements } from '@/lib/layout'
import useRoadmapStore from '@/store/useRoadmapStore'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export function useCanvasGeneration() {
	const { setRoadmap } = useRoadmapStore()
	const [isLoading, setIsLoading] = useState(false)
	const params = useParams()
	const searchParams = useSearchParams()
	const generateRoadmap = async (userQuery: string) => {
		setIsLoading(true)
		try {
			const response = await fetch('/roadmaps/api/generate', {
				method: 'POST',
				body: JSON.stringify({ prompt: userQuery }),
			})

			if (!response.ok) throw new Error('Ошибка сервера')

			const rawData = await response.json()

			if (!rawData.nodes || !rawData.edges) {
				console.error('ИИ прислал неполные данные:', rawData)
				return
			}

			const { nodes: layoutedNodes, edges: layoutedEdges } =
				getLayoutedElements(rawData)

			setRoadmap({
				title: rawData.title,
				nodes: layoutedNodes,
				edges: layoutedEdges,
				id: rawData.id || 'new',
			})
		} catch (error) {
			console.error('Ошибка генерации:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (params.slug) {
			const decodedQuery = decodeURIComponent(params.slug as string)
			generateRoadmap(decodedQuery)
		}
	}, [params.slug])
	return {
		isLoading,
		generateRoadmap,
	}
}
