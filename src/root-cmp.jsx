import { Provider } from 'react-redux'
import { Route, Router, Routes } from 'react-router-dom'

import { ToyIndex } from './pages/ToyIndex'
import './App.css'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">

          {/* <AppHeader /> */}
          <main className="main-layout">
            <Routes>
              {/* <Route element={<HomePage />} path="/"></Route> */}
              <Route element={<ToyIndex />} path="/toys"></Route>
            </Routes>
          </main>

        </section>
      </Router>

    </Provider>
  )
}

