import getRootElement from '../lib/dom/get-root-element'
import App from './app'
import React from 'react'
import { createRoot } from 'react-dom/client'

createRoot(getRootElement()).render(<App />)
