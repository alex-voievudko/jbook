import { useEffect, useRef } from 'react'
import './Preview.css'

interface PreviewProps {
	code: string
	error: string
}

const html = `
		<html>
		<head>
			<style> html { background-color: white;}</style>
		</head>
		<body>
			<div id="root"></div>
			<script>
				const handleError = (err) => {
					const root = document.getElementById('root')
					root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
					console.error(err)
				}

				window.addEventListener('error', (event) => {
					event.preventDefault()
					handleError(event.error)
				})

				window.addEventListener('message', (event) => {
					try {
						eval(event.data)
					} catch(err) {
						handleError(err)
					}
				}, false)
			</script>
		</body>
		</html>
	`

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
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
			{error && <div className='preview-error'>{error}</div>}
		</div>
	)
}
export default Preview
