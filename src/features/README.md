# Features Folder

This folder is reserved for page- or domain-specific feature modules.

Recommended usage:

- Create a subfolder per feature or page, e.g. `projects/`, `donations/`, etc.
- Co-locate UI components, hooks, and logic that are only used by that feature.
- Keep truly shared UI in `src/components/ui` and cross-cutting logic in `src/lib` or `src/services`.

No runtime code depends on this file; it exists as documentation and a placeholder so the folder is tracked in version control.
