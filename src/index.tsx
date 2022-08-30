import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux'

import App from './App'

const Root = () => (
	<Provider store={store}>
		<App />
	</Provider>
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<Root />)
