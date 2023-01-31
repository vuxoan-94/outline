declare module "autotrack/autotrack.js";

declare module "string-replace-to-array";

declare module "sequelize-encrypted";

declare module "styled-components-breakpoint";

declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

declare namespace JSX {
  interface IntrinsicElements {
    "zapier-app-directory": any;
  }
}
