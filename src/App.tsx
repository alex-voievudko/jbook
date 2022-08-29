import * as esbuild from 'esbuild-wasm'
import { useEffect, useRef, useState } from 'react'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

import { unpkgPathPlugin } from './utils/unpkg-path-plugin'
import { fetchPlugin } from './utils/fetch-plugin'

import CodeEditor from './components/CodeEditor'

const App = () => {
	const ref = useRef<any>()
	const refIframe = useRef<any>()
	const [input, setInput] = useState('')

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		})
	}

	useEffect(() => {
		startService()
	}, [])

	const handleClick = async () => {
		if (!ref.current) {
			return
		}

		refIframe.current.srcdoc = html

		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		})

		refIframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
	}

	const html = `
		<html>
		<head></head>
		<body>
			<div id="root"></div>
			<script>
				window.addEventListener('message', (event) => {
					try {
						eval(event.data)
					} catch(err) {
						const root = document.getElementById('root')
						root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
						throw err
					}
				}, false)
			</script>
		</body>
		</html>
	`

	return (
		<div>
			<CodeEditor initialValue='' onChange={(value) => setInput(value)} />
			<textarea onChange={(e) => setInput(e.target.value)} value={input} />
			<div>
				<button onClick={handleClick}>Submit</button>
			</div>

			<iframe
				ref={refIframe}
				srcDoc={html}
				sandbox='allow-scripts'
				title='preview'
			/>
		</div>
	)
}

export default App
