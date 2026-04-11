import { RoadmapData } from '@/types'
import dagre from 'dagre'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 300
const nodeHeight = 180

export const getLayoutedElements = (data: RoadmapData) => {
	const { nodes, edges } = data

	// Настройка графа: TB = Top to Bottom (Сверху вниз)
	dagreGraph.setGraph({ rankdir: 'TB', nodesep: 70, ranksep: 120 })

	nodes.forEach(node => {
		dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
	})

	edges.forEach(edge => {
		dagreGraph.setEdge(edge.source, edge.target)
	})

	dagre.layout(dagreGraph)

	const layoutedNodes = nodes.map(node => {
		const nodeWithPosition = dagreGraph.node(node.id)
		return {
			...node,
			position: {
				x: nodeWithPosition.x - nodeWidth / 2,
				y: nodeWithPosition.y - nodeHeight / 2,
			},
		}
	})

	return { nodes: layoutedNodes, edges }
}
