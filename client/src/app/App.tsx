import { Pages } from "../pages";

import { withStore } from "./providers";

function App() {
    //TODO: Separate business logic (socket events) from ui
    return <Pages />;
}

export default withStore(App);
