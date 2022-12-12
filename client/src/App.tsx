import styled from "styled-components";

import Pages from "./components/Pages";

const AppWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function App() {
    return (
        <AppWrapper>
            <Pages />
        </AppWrapper>
    );
}

export default App;
