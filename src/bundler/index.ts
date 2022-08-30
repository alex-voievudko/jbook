import * as esbuild from 'esbuild-wasm'

import { unpkgPathPlugin } from './utils/unpkg-path-plugin'
import { fetchPlugin } from './utils/fetch-plugin'

let service: esbuild.Service

export const bundler = async (rawCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		})
	}

	try {
		const result = await service.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		})

		return {
			code: result.outputFiles[0].text,
			error: '',
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				code: '',
				error: error.message,
			}
		} else {
			throw error
		}
	}
}
