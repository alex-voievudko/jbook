import * as esbuild from 'esbuild-wasm'
import { useEffect, useRef, useState } from 'react'

import { unpkgPathPlugin } from './utils/unpkg-path-plugin'

const App = () => {
	const ref = useRef<any>()
	const [input, setInput] = useState('')
	const [code, setCode] = useState('')

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		})
	}

	useEffect(() => {
		startService()
	}, [])

	const handleClick = async () => {
		if (!ref.current) {
			return
		}

		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		})

		setCode(result.outputFiles[0].text)
	}

	return (
		<div>
			<textarea onChange={(e) => setInput(e.target.value)} value={input} />
			<div>
				<button onClick={handleClick}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	)
}

export default App
