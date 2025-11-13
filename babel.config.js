module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Plugin para resolver alias de caminhos
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "@components": "./components",
            "@constants": "./constants",
            "@assets": "./assets",
            "@hooks": "./hooks",
            "@utils": "./utils",
            "@app": "./app",
            "@interfaces": "./interfaces",
            "@style": "./style",
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
        },
      ],
      // Plugin para Reanimated (já está no seu projeto)
      "react-native-reanimated/plugin",
    ],
  };
};
