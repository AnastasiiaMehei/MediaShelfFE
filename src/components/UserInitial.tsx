import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function UserInitial() {
  const user = useSelector((state: RootState) => state.auth.user);

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold cursor-pointer"
    >
      {initial}
    </div>
  );
}
