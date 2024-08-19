import AuthGuard from "../guard/authGuard";
import Pitch from "../pages/pitch/Pitch";
import PitchDetail from "../pages/pitch/PitchDetail";

export const PitchRouter: any = {
  path: "pitch",
  children: [
    { path: "", element: <Pitch /> },
    { path: ":id", element: <PitchDetail /> },
  ],
};
