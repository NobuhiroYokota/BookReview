import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { store } from '../store';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
  <CookiesProvider>
    <App />
  </CookiesProvider>
</Provider>,
)
