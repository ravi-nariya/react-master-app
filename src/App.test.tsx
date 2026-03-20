import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import createSagaMiddleware from 'redux-saga'
import App from './App'
import i18n from './i18n'
import counterReducer from './store/features/counterSlice'
import rootSaga from './store/sagas'

function renderWithStore() {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sagaMiddleware),
  })

  sagaMiddleware.run(rootSaga)

  return {
    user: userEvent.setup(),
    store,
    ...render(
      <Provider store={store}>
        <App />
      </Provider>,
    ),
  }
}

describe('App counter', () => {
  it('renders controls and updates count', async () => {
    await i18n.changeLanguage('en')

    const { user } = renderWithStore()

    expect(screen.getByText('Redux Counter')).toBeInTheDocument()
    expect(screen.getByText('Count is 0')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Increment' }))
    expect(screen.getByText('Count is 1')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Decrement' }))
    expect(screen.getByText('Count is 0')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Increment amount'))
    await user.type(screen.getByLabelText('Increment amount'), '4')
    await user.click(screen.getByRole('button', { name: 'Increment by 4' }))

    await waitFor(() => {
      expect(screen.getByText('Count is 4')).toBeInTheDocument()
    })
  })

  it('switches to Hindi using language button', async () => {
    await i18n.changeLanguage('en')

    const { user } = renderWithStore()

    await user.click(screen.getByRole('button', { name: 'Hindi' }))

    await waitFor(() => {
      expect(screen.getByText('Redux काउंटर')).toBeInTheDocument()
      expect(screen.getByText('गिनती 0 है')).toBeInTheDocument()
    })
  })

  it('has no accessibility violations', async () => {
    await i18n.changeLanguage('en')

    const { container } = renderWithStore()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
