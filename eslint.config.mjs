// eslint.config.mjs
import nextPlugin from "eslint-config-next";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tailwind from "eslint-plugin-tailwindcss";

export default [
  // Базовые правила Next.js + TypeScript
  nextPlugin(),
  prettierConfig,

  {
    plugins: {
      prettier,
      import: importPlugin,
      "unused-imports": unusedImports,
      tailwind,
    },

    rules: {
      // ——————————————————————————
      // ⭐ Строгий уровень качества
      // ——————————————————————————

      // Prettier: авто-форматирование
      "prettier/prettier": "error",

      // Удаление неиспользуемого
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],

      // Строгий порядок импортов
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
        },
      ],

      // Запрет console — кроме важного
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Tailwind — сортировка по группам (как рекомендуют)
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off", // ты используешь свои CSS — оставим разрешённым

      // Запрещаем 'any'
      "@typescript-eslint/no-explicit-any": "error",
    },
  },

  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      "build/**/*",
      "dist/**/*",
      "public/**/*",
    ],
  },
];
