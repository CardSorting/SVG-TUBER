# 🌐 Internationalization & Documentation Translation Guidelines

SVG-TUBER is committed to being accessible to VTubers and creators worldwide. This guide outlines how to contribute translations for documentation and UI strings.

---

## 🗺️ Supported Languages & Target Priorities

We welcome documentation translations in all languages! Key priority target languages include:

- 🇯🇵 **Japanese (日本語)**
- 🇰🇷 **Korean (한국어)**
- 🇨🇳 **Simplified Chinese (简体中文)**
- 🇪🇸 **Spanish (Español)**
- 🇫🇷 **French (Français)**
- 🇩🇪 **German (Deutsch)**

---

## 📁 Translation File Structure

Translations are organized within subdirectories under `docs/i18n/`:

```
docs/
├── i18n/
│   ├── ja/                # Japanese Documentation
│   │   ├── README.md
│   │   ├── ARCHITECTURE.md
│   │   └── RIGGING_GUIDE.md
│   ├── es/                # Spanish Documentation
│   │   ├── README.md
│   │   └── ARCHITECTURE.md
│   └── zh/                # Chinese Documentation
│       ├── README.md
│       └── ARCHITECTURE.md
```

---

## ✍️ Translation Guidelines

1. **Keep Code Snippets in English**: Do not translate code variables, CSS class names, TypeScript interfaces, or CLI commands.
2. **Preserve Markdown Links**: Ensure relative file links (`[link text](./docs/...)`) are updated to point to the correct localized path.
3. **Submit a Pull Request**: Prefix your PR title with `docs(i18n): add Japanese translation for RIGGING_GUIDE`.
