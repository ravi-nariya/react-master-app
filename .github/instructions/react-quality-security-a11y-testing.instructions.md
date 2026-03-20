---
description: "Use when implementing or reviewing React/TypeScript code to enforce security, coding best practices, accessibility (a11y), and high unit-test coverage requirements."
applyTo: "**/*.ts, **/*.tsx"
---

# React Quality, Security, Accessibility, and Testing Standards

## Security Requirements
- Never hard-code secrets, tokens, API keys, passwords, or private URLs in source code.
- Load sensitive values from environment variables and keep `.env` files out of version control.
- Validate and sanitize all external input: form data, URL params, query strings, API payloads, and local storage values.
- Treat all server responses as untrusted; narrow unknown values with runtime checks before use.
- Avoid `dangerouslySetInnerHTML`; if unavoidable, sanitize content with a vetted sanitizer.
- Enforce authorization in UI flows by role/permission checks and fail safely on missing permissions.
- Do not expose internal error details to users; show safe messages and log technical details separately.
- Keep dependencies up-to-date and resolve known vulnerabilities before merge.

```tsx
// BAD
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// GOOD
// Render trusted text content by default.
<div>{userContent}</div>
```

## Coding Best Practices
- Keep functions and hooks focused on one responsibility.
- Use clear naming: `isLoading`, `hasError`, `handleSubmit`, `fetchOrderById`.
- Prefer immutability; do not mutate state, props, or shared objects.
- Avoid `any`; use `unknown` + narrowing or explicit interfaces.
- Handle all async paths: loading, success, empty, and error states.
- Remove dead code, TODO-only stubs, and commented-out logic before commit.
- Keep components composable and small; extract complex logic into hooks/services.
- Prefer early returns over deep nesting.

## Accessibility (A11y) Requirements
- Every interactive element must be keyboard-accessible.
- Use semantic HTML first (`button`, `nav`, `main`, `label`, `table`, etc.).
- Do not use `div` or `span` as buttons unless proper role, tab index, and key handlers are implemented.
- Ensure form controls have associated labels and clear error/help text.
- Provide meaningful alt text for informative images; use empty alt text only for decorative images.
- Maintain sufficient color contrast and do not rely only on color to communicate state.
- Include visible focus styles for keyboard navigation.
- Use ARIA only when semantic HTML cannot provide the needed behavior.

```tsx
// BAD
<div onClick={onSave}>Save</div>

// GOOD
<button type="button" onClick={onSave}>Save</button>
```

## Unit Testing and Coverage Policy
- Unit tests are required for all new business logic, hooks, reducers, and component behavior.
- Tests must validate behavior, not implementation details.
- Include positive, negative, and edge-case coverage.
- Mock only external boundaries (network, time, storage); keep core logic tests realistic.
- Every bug fix should include a regression test.

## SonarQube Quality and Code Health Standards
- All pull requests must pass SonarQube Quality Gate before merge.
- Maintain clean status for:
  - Bugs: **0 new critical/blocker bugs**
  - Vulnerabilities: **0 new critical/blocker vulnerabilities**
  - Security Hotspots: **100% reviewed**
  - Code Smells: **no new critical code smells** and no unreviewed major smells
- Keep maintainability rating at **A** for new code.
- Keep reliability rating at **A** for new code.
- Keep security rating at **A** for new code.
- New code duplication should remain low (target: **< 3%**).
- New code should follow clean-code rules: low complexity, small methods, clear naming, no dead code, no commented-out blocks.
- Avoid suppressing Sonar rules without written justification in code review.
- If a rule is intentionally bypassed, document reason, risk, and mitigation in PR notes.

### SonarQube Best Practices
- Prefer early returns and guard clauses to reduce cognitive complexity.
- Split long functions/components into smaller units when complexity grows.
- Replace nested condition chains with strategy maps or typed helper functions where appropriate.
- Use strict typing and null checks to prevent runtime defects.
- Centralize error handling and avoid swallowed exceptions.
- Track and resolve recurring Sonar issues by creating reusable utilities/patterns.

### Coverage Gate
- Required minimum unit test coverage: **95%**.
- Target thresholds:
  - Statements: **95%**
  - Branches: **95%**
  - Functions: **95%**
  - Lines: **95%**
- Pull requests that reduce any threshold below 95% should not be merged.

## PR Quality Checklist
- Security review completed for changed flows and data handling.
- Accessibility checks completed for keyboard, labels, and focus behavior.
- Unit tests added/updated and passing.
- Coverage remains at or above 95% for statements, branches, functions, and lines.
- SonarQube Quality Gate passed (no blocker/critical new issues and hotspots reviewed).
- No lint errors, type errors, or unresolved TODOs.
