import { ReactElement } from "react";

export type Themeprops = "light" | "dark" | "system"

export interface contents {
    icon: ReactElement;
    title: string;
    desc?: string;
}