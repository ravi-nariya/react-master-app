import { expect, test } from '@playwright/test'

test.describe('Redux counter', () => {
  test('increment, decrement, and increment by amount', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Count is 0')).toBeVisible()

    await page.getByRole('button', { name: 'Increment', exact: true }).click()
    await expect(page.getByText('Count is 1')).toBeVisible()

    await page.getByRole('button', { name: 'Decrement', exact: true }).click()
    await expect(page.getByText('Count is 0')).toBeVisible()

    const amountInput = page.getByLabel('Increment amount')
    await amountInput.fill('4')
    await page.getByRole('button', { name: 'Increment by 4' }).click()

    await expect(page.getByText('Count is 4')).toBeVisible()
  })
})
