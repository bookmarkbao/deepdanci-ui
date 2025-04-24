# DeepDanci UI

DeepDanci UI is a collection of reusable UI components built with React and Tailwind CSS, inspired by Shadcn/UI.

## Features

- Copy-and-paste components into your projects
- Fully customizable and themeable
- Built with React and Tailwind CSS
- TypeScript support

## Installation

```bash
# Install from npm (once published)
npm install -g deepdanci

# Or use it directly with npx
npx deepdanci init
npx deepdanci add Button
npx deepdanci add SiteHeader
npx deepdanci list
```

## Local Development and Installation

To develop or install the CLI locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/deepdanci-ui.git
cd deepdanci-ui

# Install dependencies
npm install

# Build and install the CLI locally
node install.js

# Or manually:
cd cli
npm install
npm run build
npm install -g .  # Install the CLI globally
```

## Available Components

- Button
- SiteHeader
- (more coming soon)

## How It Works

Unlike conventional component libraries, DeepDanci UI doesn't install components as dependencies. Instead, it copies the component code directly into your project, allowing you to customize and modify it to fit your needs.

## Customization

Since the components are copied into your project, you can easily modify them to match your design system. The components use Tailwind CSS for styling, making it easy to customize the look and feel.

## Creating New Components

To add a new component to the library:

1. Create a new directory in the `components` folder with the component name
2. Add the component files (index.tsx, etc.)
3. Make sure to document the component usage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
