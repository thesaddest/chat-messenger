import { useAppSelector } from "./redux";

export function useAuth(): boolean {
    return useAppSelector((state) => state.auth.isAuth);
}