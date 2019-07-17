To enable ESLint on typescript files in VS Code add following lines to your settings (Preferences -> Settings)

```
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "typescript",
        "autoFix": true
    },
    {
        "language": "typescriptreact",
        "autoFix": true
    }
]
```
