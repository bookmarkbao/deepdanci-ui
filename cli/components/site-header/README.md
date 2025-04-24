# SiteHeader Component

A responsive header component for your website or application.

## Installation

```bash
npx deepdanci add SiteHeader
```

## Usage

```tsx
import { SiteHeader } from "./components/site-header";

export default function Layout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>{/* Your content */}</main>
    </div>
  );
}
```

## Customization

You can customize the SiteHeader by modifying the component after adding it to your project. For example, you can change the logo, navigation links, and styling.

## Props

The SiteHeader component accepts the following props:

| Prop      | Type   | Default   | Description                                   |
| --------- | ------ | --------- | --------------------------------------------- |
| className | string | undefined | Additional CSS classes to apply to the header |

Additionally, the SiteHeader component accepts all props that a standard HTML header element would accept.
