import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ReportApp } from './ReportApp'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ReportApp />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
