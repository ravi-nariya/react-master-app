---
description: "Use when writing, reviewing, or refactoring React/TypeScript components, hooks, services, or utilities. Enforces SOLID principles and clean code practices for React projects."
applyTo: "**/*.tsx, **/*.ts"
---

# React SOLID & Clean Code Standards

## SOLID Principles

### S — Single Responsibility Principle
- Each component renders **one logical unit of UI**. Split if a component handles layout *and* data fetching *and* validation.
- Each custom hook encapsulates **one concern** (e.g., `useFetchUser`, `useFormValidation`, not `useUserFormPage`).
- Each utility/service file exports functions for **one domain** (e.g., `dateUtils.ts`, `authService.ts`).

```tsx
// BAD – fetching, transforming, and rendering in one component
const UserCard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => { fetch('/api/user').then(...) }, []);
  const formatted = user?.name.toUpperCase();
  return <div>{formatted}</div>;
};

// GOOD – separate concerns
const UserCard = ({ user }: { user: User }) => <div>{user.name}</div>;
const useUser = (id: string) => { /* fetch logic */ };
```

### O — Open/Closed Principle
- Extend component behavior through **props and composition**, not by modifying existing internals.
- Use `children`, render props, or compound components for variation.
- Prefer feature flags or strategy props (`variant`, `renderItem`) over `if/else` branches inside components.

```tsx
// BAD – modifying the Button for every new variant
const Button = ({ isPrimary, isDanger }) => { /* growing if/else */ };

// GOOD – open for extension via variant prop
const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => (
  <button className={styles[variant]} {...props}>{children}</button>
);
```

### L — Liskov Substitution Principle
- Child components must be substitutable for their base/parent without breaking behavior.
- A specialized component (e.g., `PrimaryButton`) must accept all props of its base (`Button`) and not violate its contract.
- Never narrow a prop type in a derived component; only broaden or add to it.

```tsx
// GOOD – PrimaryButton is a valid substitute for Button
interface PrimaryButtonProps extends ButtonProps {
  icon?: ReactNode;
}
const PrimaryButton = (props: PrimaryButtonProps) => (
  <Button variant="primary" {...props} />
);
```

### I — Interface Segregation Principle
- Define **narrow, focused prop interfaces**. Don't pass a large object when only two fields are needed.
- Avoid god-objects in props; split into separate interfaces per logical group.
- Hooks should return only what the consumer needs — use destructuring, not monolithic return objects.

```tsx
// BAD – component receives the entire User object but uses only 2 fields
const Avatar = ({ user }: { user: User }) => <img src={user.avatarUrl} alt={user.name} />;

// GOOD – explicit, minimal interface
interface AvatarProps { avatarUrl: string; name: string; }
const Avatar = ({ avatarUrl, name }: AvatarProps) => <img src={avatarUrl} alt={name} />;
```

### D — Dependency Inversion Principle
- Components depend on **abstractions (interfaces/hooks), not concrete implementations**.
- Inject services and side effects via hooks or context, not direct `import`s inside render logic.
- Pass callbacks as props for testability instead of hard-coding API calls inside components.

```tsx
// BAD – component is coupled to a concrete fetch call
const UserList = () => {
  const users = useSomeConcreteApiCall();
  return <ul>{users.map(...)}</ul>;
};

// GOOD – depend on abstraction; concrete impl lives in the hook
interface UseUsers { users: User[]; isLoading: boolean; }
const UserList = ({ useUsers }: { useUsers: () => UseUsers }) => {
  const { users, isLoading } = useUsers();
  return isLoading ? <Spinner /> : <ul>{users.map(...)}</ul>;
};
```

---

## Clean Code Principles

### Naming
- Use **intention-revealing names**: `isLoading`, `hasError`, `fetchUserById`, `UserProfileCard`.
- Boolean variables/props start with `is`, `has`, `should`, `can`: `isVisible`, `hasPermission`.
- Event handlers are prefixed with `handle`: `handleSubmit`, `handleInputChange`.
- Avoid abbreviations (`usr`, `cfg`, `tmp`) unless they are universal (`id`, `url`, `i`).

### Functions & Hooks
- Functions do **one thing** and fit in ~20 lines. Extract helper functions when logic grows.
- Custom hooks start with `use` and return a clear, destructurable object.
- Avoid side effects outside `useEffect`. Never mutate props or state directly.
- Default export for components; named exports for utilities and hooks.

### Components
- Keep JSX shallow. If JSX exceeds ~30 lines, extract sub-components.
- Lift state only as high as necessary — prefer local state before context/Redux.
- Co-locate related files: `UserCard/index.tsx`, `UserCard/UserCard.test.tsx`, `UserCard/useUserCard.ts`.
- Avoid inline object and array literals in JSX props (causes unnecessary re-renders).

```tsx
// BAD – new object on every render
<Component style={{ marginTop: 8 }} options={['a', 'b']} />

// GOOD – stable references
const STYLE = { marginTop: 8 };
const OPTIONS = ['a', 'b'];
<Component style={STYLE} options={OPTIONS} />
```

### Constants & Magic Values
- No magic numbers or strings — extract to named constants or enums.
- Place app-wide constants in `src/constants/` and domain constants near their feature.

```ts
// BAD
if (status === 3) { ... }

// GOOD
const OrderStatus = { PENDING: 1, PROCESSING: 2, SHIPPED: 3 } as const;
if (status === OrderStatus.SHIPPED) { ... }
```

### Types & Interfaces
- Prefer `interface` for component props and public APIs; `type` for unions and aliases.
- Never use `any`. Prefer `unknown` with type narrowing when the shape is truly unknown.
- Co-locate types with their consumer unless shared; shared types live in `src/types/`.

### Error Handling
- Handle errors at system boundaries (API calls, user input). Don't swallow errors silently.
- Use Error Boundaries for runtime UI failures.
- Validate all external data (API responses, URL params, form input) before use.

### Testing Alignment
- Write components that are easy to test: pure inputs → predictable output.
- Avoid testing implementation details; test observable behavior (what the user sees/does).
- Each test file mirrors its source file location.

### Code Organization
```
src/
  components/       # Reusable, presentational components
  features/         # Feature-sliced modules (container + slice + hooks)
  hooks/            # Shared custom hooks
  services/         # API clients and external integrations
  store/            # Redux store, slices, sagas
  types/            # Shared TypeScript types/interfaces
  utils/            # Pure utility functions
  constants/        # App-wide constants
```

### General Rules
- **DRY**: Duplicate code twice at most; on the third occurrence, extract.
- **YAGNI**: Don't add abstraction for hypothetical future needs.
- **KISS**: The simplest working solution is preferred.
- Prefer `const` over `let`; never use `var`.
- Use `async/await` over raw Promise chains for readability.
- Remove dead code, commented-out blocks, and unused imports before committing.
