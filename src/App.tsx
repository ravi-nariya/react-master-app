import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import type { AppDispatch, AppState } from './store'
import {
  decrement,
  increment,
  incrementByXRequest,
} from './store/features/counterSlice'
import { Button } from '@components/Button'
import { Text } from '@components/Text'

function App() {
  const { i18n, t } = useTranslation()
  const count = useSelector((state: AppState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()
  const [amount, setAmount] = useState('5')
  const parsedAmount = Number(amount) || 0
  const selectedLanguage = i18n.resolvedLanguage?.startsWith('hi') ? 'hi' : 'en'

  return (
    <>
      <main id="center">
        <div className='dxp-container-wide center py-8'> 
          <Text variant="h1" align="center" gutterBottom className='pb-4'>
            {t('counter.title')}
          </Text>
          <div className="counter-card">
            <p className="count-value">{t('counter.countIs', { count })}</p>

            <div className="counter-controls">
              <Button variant="contained" color="primary" onClick={() => dispatch(increment())}>
                {t('counter.increment')}
              </Button>
              <Button variant="contained" color="secondary" onClick={() => dispatch(decrement())}>
                {t('counter.decrement')}
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => dispatch(incrementByXRequest(parsedAmount))}
              >
                {t('counter.incrementBy', { amount: parsedAmount })}
              </Button>
            </div>

            <div className="amount-row">
              <label htmlFor="increment-amount">{t('counter.amount')}</label>
              <input
                id="increment-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-label={t('counter.incrementAmountLabel')}
              />
            </div>

            <div className="language-row">
              <span>{t('counter.language')}:</span>
              <div className="language-buttons" role="group" aria-label={t('counter.language')}>
                <Button
                  size="small"
                  variant={selectedLanguage === 'en' ? 'contained' : 'outlined'}
                  color={selectedLanguage === 'en' ? 'primary' : 'secondary'}
                  aria-pressed={selectedLanguage === 'en'}
                  onClick={() => {
                    void i18n.changeLanguage('en')
                  }}
                >
                  {t('counter.english')}
                </Button>
                <Button
                  size="small"
                  variant={selectedLanguage === 'hi' ? 'contained' : 'outlined'}
                  color={selectedLanguage === 'hi' ? 'primary' : 'secondary'}
                  aria-pressed={selectedLanguage === 'hi'}
                  onClick={() => {
                    void i18n.changeLanguage('hi')
                  }}
                >
                  {t('counter.hindi')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="ticks"></div>
    </>
  )
}

export default App
