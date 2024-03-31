import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyChart } from './pages/ToyChart.jsx'

import { store } from './store/store.js'
// import '../src/assets/style/main.css'
import '../src/assets/styles/main.scss'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">

          <AppHeader className="full" />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyChart />} path="/chart" />
            </Routes>
          </main>

        </section>
      </Router>
    </Provider>
  )
}

