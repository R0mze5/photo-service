const theme = {
  bgColor: "#fafafa",
  blackColor: "#262626",
  blueColor: "#3897f0",
  darkGrayColor: "#999999",
  lightGrayColor: "#c7c7c7",
  redColor: "#ed4956",
  darkBlueColor: "#003569",
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  maxWidth: "935px",
  postBgColor: "#fff",
};

export default {
  ...theme,
  whiteBox: `border-radius: ${theme.borderRadius}; border: ${theme.boxBorder}; background-color: #ffffff`,
};
