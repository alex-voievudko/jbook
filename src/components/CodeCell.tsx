import { useState, useEffect } from 'react'

import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { bundler } from '../bundler'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Resizable from './Resizable'

const CodeCell = () => {
	const [code, setCode] = useState('')
	const [input, setInput] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(input)
			setCode(output.code)
			setError(output.error)
		}, 750)

		return () => {
			clearTimeout(timer)
		}
	}, [input])

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flex: 1 }}>
				<Resizable direction='horizontal'>
					<CodeEditor initialValue='' onChange={(value) => setInput(value)} />
				</Resizable>

				<Preview code={code} error={error} />
			</div>
		</Resizable>
	)
}
export default CodeCell
