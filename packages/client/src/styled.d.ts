// import original module declaration
import "styled-components";
import Theme from "./styles/Theme";

type ThemeType = typeof Theme;

// and extend it
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {
    color?: string;
  }
}
