import { useActions } from '../hooks/useActions'

interface ActionBarProps {
	id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActions()

	return (
		<div>
			<button onClick={() => moveCell(id, 'up')}>Up</button>
			<button onClick={() => moveCell(id, 'down')}>Down</button>
			<button
				onClick={() => {
					console.log(id)
					deleteCell(id)
				}}
			>
				Delete
			</button>
		</div>
	)
}
export default ActionBar
