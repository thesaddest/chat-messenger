import { useAppSelector } from "./redux-hooks";

export function useAuth(): boolean {
    return useAppSelector((state) => state.auth.isAuth);
}