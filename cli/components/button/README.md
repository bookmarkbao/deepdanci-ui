# Button Component

A button component with various styles and sizes.

## Installation

```bash
npx deepdanci add Button
```

## Usage

```tsx
import { Button } from "./components/button";

export default function ButtonDemo() {
  return (
    <div className='flex flex-col gap-4'>
      <Button>Default Button</Button>
      <Button variant='destructive'>Destructive Button</Button>
      <Button variant='outline'>Outline Button</Button>
      <Button variant='secondary'>Secondary Button</Button>
      <Button variant='ghost'>Ghost Button</Button>
      <Button variant='link'>Link Button</Button>
    </div>
  );
}
```

## Props

The Button component accepts the following props:

| Prop    | Type                                                                        | Default   | Description                                                       |
| ------- | --------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------- |
| variant | "default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" | "default" | The visual style of the button                                    |
| size    | "default" \| "sm" \| "lg" \| "icon"                                         | "default" | The size of the button                                            |
| asChild | boolean                                                                     | false     | When true, the component will render as a div instead of a button |

Additionally, the Button component accepts all props that a standard HTML button element would accept.
