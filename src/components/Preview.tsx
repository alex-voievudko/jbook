import { useEffect, useRef } from 'react'
import './Preview.css'

interface PreviewProps {
	code: string
}

const html = `
		<html>
		<head>
			<style> html { background-color: white;}</style>
		</head>
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

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const refIframe = useRef<any>()

	useEffect(() => {
		refIframe.current.srcdoc = html
		setTimeout(() => {
			refIframe.current.contentWindow.postMessage(code, '*')
		}, 50)
	}, [code])

	return (
		<div className='preview-wrapper'>
			<iframe
				ref={refIframe}
				srcDoc={html}
				sandbox='allow-scripts'
				title='preview'
			/>
		</div>
	)
}
export default Preview