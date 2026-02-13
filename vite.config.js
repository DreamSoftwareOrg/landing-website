import { defineConfig } from 'vite'

export default defineConfig({
    envPrefix: ['VITE_', 'TBOT_', 'TCHAT_'],
    server: {
        proxy: {
            '/telegram': {
                target: 'https://api.telegram.org',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/telegram/, '')
            }
        }
    }
})
