import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Accessibility', () => {
  test('counter page has no detectable accessibility violations (English)', async ({
    page,
  }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page }).analyze()

    expect(results.violations).toEqual([])
  })

  test('counter page has no detectable accessibility violations (Hindi)', async ({
    page,
  }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Hindi' }).click()
    await expect(page.getByText('Redux काउंटर')).toBeVisible()

    const results = await new AxeBuilder({ page }).analyze()

    expect(results.violations).toEqual([])
  })

  test('logs accessibility violations to console if any exist', async ({
    page,
  }) => {
    await page.goto('/')

    const results = await new AxeBuilder({ page }).analyze()

    if (results.violations.length > 0) {
      console.log('\n=== Accessibility Violations ===')
      results.violations.forEach((violation, index) => {
        console.log(`\n[${index + 1}] ${violation.id} (${violation.impact})`)
        console.log(`    Description: ${violation.description}`)
        console.log(`    Help: ${violation.helpUrl}`)
        violation.nodes.forEach((node) => {
          console.log(`    Element: ${node.html}`)
          node.failureSummary
            ?.split('\n')
            .forEach((line) => console.log(`    ${line}`))
        })
      })
    }

    // This test intentionally does NOT assert — it only surfaces issues.
    // Remove this comment and add expect(results.violations).toEqual([])
    // once all violations are addressed.
  })
})
