// eslint-disable-next-line no-undef
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  globals: {
    JSX: true,
    GeolocationPosition: true,
    GeolocationPositionError: true,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
