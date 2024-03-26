import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { ToyIndex } from './pages/ToyIndex.jsx'

import { store } from './store/store.js'
import '../src/assets/App.css'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">

          {/* <AppHeader /> */}
          <main className="main-layout">
            <Routes>
              {/* <Route element={<HomePage />} path="/" /> */}
              <Route element={<ToyIndex />} path="/toy" />
            </Routes>
          </main>

        </section>
      </Router>
    </Provider>
  )
}

