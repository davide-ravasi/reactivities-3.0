# Understanding `: base(cmd => cmd.ActivityDto)` in CreateActivityValidator

This short tutorial breaks down the seemingly cryptic line you encounter in the refactored FluentValidation setup:

```csharp
public CreateActivityValidator() : base(cmd => cmd.ActivityDto) { }
```

We will see that it is nothing more than **constructor-chaining** plus a **lambda expression**.

---

## 1 The background

```csharp
public class BaseActivityValidator<T, TDto> : AbstractValidator<T>
    where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        // common rules, e.g. selector(x).Title.NotEmpty() …
    }
}
```

- `T` = the request/envelope type (e.g. `CreateActivity.Command`).
- `TDto` = the actual DTO that owns `Title`, `Description`, `Date`, …
- `selector` = a **function** that shows the base class how to reach the DTO given a `T`.

---

## 2 Constructor-chaining

In C# a derived constructor can explicitly call a base constructor:

```csharp
public Child() : base(arg1, arg2) { /* child-specific code */ }
```

The `: base(...)` part runs **before** the body `{ }` of the child constructor.

---

## 3 The required argument type

Because we fix the generics like so:

```csharp
class CreateActivityValidator
    : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
```

`BaseActivityValidator` now expects in its constructor:

```csharp
Func<CreateActivity.Command, CreateActivityDto>
```

—a function that accepts the command and returns its embedded DTO.

---

## 4 The lambda expression

`cmd => cmd.ActivityDto` is exactly such a function:

- Parameter `cmd` → type `CreateActivity.Command`
- Body `cmd.ActivityDto` → returns the DTO inside the command

In delegate form it matches `Func<CreateActivity.Command, CreateActivityDto>`.

---

## 5 Putting the pieces together

```csharp
public CreateActivityValidator()
    : base(cmd => cmd.ActivityDto)   // ① call base ctor with selector
{ }                                   // ② no extra rules in child
```

_Step ①_ passes the selector to the base class, which then writes rules like:

```csharp
RuleFor(c => selector(c).Title)   // resolves to cmd.ActivityDto.Title
```

_Step ②_ remains empty because all rules live in the base class.

---

## 6 Benefits of the pattern

| Benefit                    | Why it matters                                                                                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DRY validation**         | One source of truth for 9+ rules.                                                                                                                                                                  |
| **Type-safety end-to-end** | Generic constraints (`where TDto : BaseActivityDto`) guarantee the DTO exposes required properties.                                                                                                |
| **Easy extensibility**     | Add `EditActivityValidator` in one line:<br>`class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDto> { public EditActivityValidator() : base(c => c.Dto) { } }` |

---

## 7 Quick reference cheat-sheet

| Syntax                         | Meaning                                           |
| ------------------------------ | ------------------------------------------------- |
| `: base(args)`                 | Constructor-chaining – call a specific base ctor. |
| `<T, TDto>`                    | Generic type parameters.                          |
| `where TDto : BaseActivityDto` | Generic constraint (compile-time guarantee).      |
| `Func<T, TDto>`                | Delegate type: a function from T → TDto.          |
| `x => x.Property`              | Lambda expression – concise function definition.  |

---

### TL;DR

`CreateActivityValidator` doesn't do any validation itself; it merely tells the generic **template** (`BaseActivityValidator`) _"Here's how you extract my DTO."_ Constructor-chaining passes that extraction function, and the generic base class applies all the shared rules.
