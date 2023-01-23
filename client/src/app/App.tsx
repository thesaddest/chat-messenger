import { Pages } from "../pages";

import { withStore } from "./providers";

function App() {
    return (
        <Pages />
    );
}

export default withStore(App);
