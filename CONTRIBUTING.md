# Expertise Marketplace - Contributing Guide

## Getting Started

Thank you for considering contributing to the VOA Expertise Marketplace project!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test locally: `npm run dev`
6. Build to verify: `npm run build`
7. Commit with clear messages
8. Push and create a Pull Request

## Code Standards

### TypeScript
- Use TypeScript strict mode
- Define proper interfaces for all data structures
- Avoid `any` types

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper TypeScript props interfaces

### Styling
- Use CSS modules or component-specific CSS files
- Follow existing naming conventions
- Maintain professional, clean design
- No emojis in production UI

### File Organization
```
src/
  components/     # Reusable UI components
    Component.tsx
    Component.css
  hooks/         # Custom React hooks
  types/         # TypeScript type definitions
  utils/         # Helper functions
```

## Commit Messages

Use clear, descriptive commit messages:
- `feat: Add skill endorsement feature`
- `fix: Correct search filter logic`
- `style: Update card spacing`
- `docs: Update README with deployment steps`

## Pull Request Process

1. Update README.md with any new features or changes
2. Ensure all TypeScript compiles without errors
3. Test in multiple browsers if UI changes
4. Request review from maintainers
5. Address review feedback promptly

## Questions?

Contact the development team or open an issue for discussion.
