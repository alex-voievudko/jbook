import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'

import './TextCell.css'

const TextCell: React.FC = () => {
	const [editing, setEditing] = useState(false)
	const [value, setValue] = useState('# Header')
	const divRef = useRef<HTMLDivElement | null>(null)

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
				<MDEditor value={value} onChange={(v) => setValue(v || '')} />
			</div>
		)
	}

	return (
		<div onClick={() => setEditing(true)} className='text-editor card'>
			<div className='card-content'>
				<MDEditor.Markdown source={value} />
			</div>
		</div>
	)
}
export default TextCell
