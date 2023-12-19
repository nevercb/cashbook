/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import postCssPxToRem from 'postcss-pxtorem'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), createStyleImportPlugin({
    libs:[
      {
        libraryName: "zarm",
        esModule: true,
        resolveStyle: (name) => {
          console.log("successfully resolve")
          return `zarm/es/${name}/style/css`
        }
      }
    ]
  })],  
  css: {
      modules: {
        localsConvention: 'dashesOnly'
      }, 
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        }
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue:37,
            propList:['*']
          }),
          
        ]
      }
    },
  server:{
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/api',
        changeOrigin: true,
        rewrite: path=>path.replace(/^\/api/, '')
      }
    }    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },
})
