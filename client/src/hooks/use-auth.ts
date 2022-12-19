import { useAppSelector } from "./redux-hooks";

export function useAuth(): boolean {
    const { isAuth } = useAppSelector((state) => state.auth);

    return isAuth;
}
