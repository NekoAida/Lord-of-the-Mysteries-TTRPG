# Contributing

Thank you for your interest in contributing to the Lord of the Mysteries TTRPG system.

Contributions of all sizes are welcome, whether they're bug reports, documentation improvements, bug fixes, or new features.

## Before You Start

If you're planning a larger feature or significant change, please open an issue first so we can discuss the design before development begins.

If you'd like to work on an existing issue, leave a comment and ask to be assigned to it. This helps avoid duplicated work.

## Development Setup

The source files for this system are located directly in the root directory and its subdirectories.

### Requirements

- [Node.js](https://nodejs.org/) (optional, depending on if you are writing custom build scripts)
- A local installation of Foundry VTT for testing

### Installing the Development Build

For active development, symlink or copy the repository folder into your Foundry User Data directory.

Example (Linux/macOS):
```bash
ln -s /path/to/Lord-of-the-Mysteries-TTRPG $FoundryUserDataPath/systems/lotm
```
*(Replace `$FoundryUserDataPath` with the path to your Foundry User Data directory, e.g., `~/.local/share/FoundryVTT/Data`)*

Example (Windows - Run as Administrator):
```cmd
mklink /D "C:\Users\<you>\AppData\Local\FoundryVTT\Data\systems\lotm" "C:\path\to\Lord-of-the-Mysteries-TTRPG"
```

## Pull Requests

Please:

1. Create a feature fork & branch instead of committing directly to main.
2. Keep pull requests focused on a single feature or fix.
3. Reference any related issue in the PR description (for example, `Closes #42`).
4. Test your changes in Foundry VTT before submitting.
5. Update documentation (like `README.md` and `README.th.md`) if your changes modify the system's behavior noticeably.

Pull requests may receive review feedback before being merged.

## Coding Style

There are no strict formatting requirements beyond keeping the existing style consistent.

When possible:

- Prefer clear, readable, and maintainable code over clever solutions.
- Keep commits focused and logically grouped.
- Avoid unrelated formatting changes in the same pull request.

## Reporting Bugs

When reporting a bug, please include:

- Foundry VTT version
- System version
- Browser (if applicable)
- Steps to reproduce
- Expected behavior
- Actual behavior
- Any console errors (F12) or screenshots

The more information provided, the easier it is to reproduce and fix the issue.

## Code of Conduct

Please be respectful and constructive when interacting with other contributors. The goal is to build a welcoming project for everyone.
