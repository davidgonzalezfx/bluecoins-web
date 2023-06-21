import { MainLayout } from './layouts';
import { Home, Upload } from "./views";

const routes = [
  {
    path: "/",
    title: "Home",
    layout: MainLayout,
    component: Home,
  },
  {
    path: "/upload",
    title: "Upload",
    component: Upload,
  },
];

export default routes;
