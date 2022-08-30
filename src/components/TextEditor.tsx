import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'

import './TextEditor.css'
import { Cell } from '../redux'
import { useActions } from '../hooks/useActions'

interface TextEditorProps {
	cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const [editing, setEditing] = useState(false)
	const divRef = useRef<HTMLDivElement | null>(null)
	const { updateCell } = useActions()

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				divRef.current &&
				event.target &&
				divRef.current.contains(event.target as Node)
			) {
				return
			}

			setEditing(false)
		}

		document.addEventListener('click', listener, { capture: true })

		return () => {
			document.removeEventListener('click', listener, { capture: true })
		}
	}, [])

	if (editing) {
		return (
			<div ref={divRef} className='text-editor'>
				<MDEditor
					value={cell.content}
					onChange={(v) => updateCell(cell.id, v || '')}
				/>
			</div>
		)
	}

	return (
		<div onClick={() => setEditing(true)} className='text-editor card'>
			<div className='card-content'>
				<MDEditor.Markdown source={cell.content || 'Click to edit'} />
			</div>
		</div>
	)
}
export default TextEditor
