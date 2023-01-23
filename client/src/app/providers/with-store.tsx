import { Provider } from "react-redux";
import { ReactNode } from "react";

import { store } from "../store";

export const withStore = (component: () => ReactNode) => () =>
    <Provider store={store}> {component()}</Provider>;