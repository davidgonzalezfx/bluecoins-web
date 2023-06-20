import { MainLayout } from "./layouts";
import { Home, Upload } from "./views";

const routes = [
  {
    path: "/",
    title: "Home",
    exact: true,
    layout: MainLayout,
    component: Home,
  },
  {
    path: "/upload",
    title: "Upload",
    exact: true,
    layout: null,
    component: Upload,
  },
];

export default routes;
