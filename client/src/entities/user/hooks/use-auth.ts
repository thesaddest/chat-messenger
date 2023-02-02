import { useAppSelector } from "../../../shared/lib/hooks";

export function useAuth(): boolean {
    return useAppSelector((state) => state.auth.isAuth);
}
