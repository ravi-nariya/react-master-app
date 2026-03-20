import '@testing-library/jest-dom'
import '../i18n'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)
