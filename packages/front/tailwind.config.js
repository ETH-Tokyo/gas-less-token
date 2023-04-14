module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      workSans: ["Work Sans"],
      roboto: [
        "Roboto",
        "Noto Sans JP",
        "游ゴシック体",
        "游ゴシック",
        "Yu Gothic",
        "メイリオ",
      ],
      oswald: ["Oswald"],
      openSans: ["Open Sans"],
      italic: ["Libre Baskerville"],
      "sans-serif": ["Poppins"],
      hiragino: ["Hiragino Kaku Gothic ProN", "Hiragino Sans"],
    },
  },
  plugins: [],
};
