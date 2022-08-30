import { useState, useEffect } from 'react'

import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { bundler } from '../bundler'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Resizable from './Resizable'
import { Cell } from '../redux'
import { useActions } from '../hooks/useActions'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [code, setCode] = useState('')
	const [error, setError] = useState('')
	const { updateCell } = useActions()

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(cell.content)
			setCode(output.code)
			setError(output.error)
		}, 750)

		return () => {
			clearTimeout(timer)
		}
	}, [cell.content])

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flex: 1 }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizable>

				<Preview code={code} error={error} />
			</div>
		</Resizable>
	)
}
export default CodeCell
