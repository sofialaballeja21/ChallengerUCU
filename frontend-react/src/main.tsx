import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM  from 'react-dom/client'
import store from './store'
import App from './App.jsx'

const rootElement = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(rootElement).render(
<React.StrictMode>
   <Provider store={store}>
         <App />
   </Provider>

</React.StrictMode>
)


