import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "", Component: HomePage },
      {
        path: "activities",
        Component: ActivityDashboard,
      },
      {
        path: "createActivity",
        Component: ActivityForm,
      },
      //   {
      //     path: "concerts",
      //     children: [
      //       { index: true, Component: ConcertsHome },
      //       { path: ":city", Component: ConcertsCity },
      //       { path: "trending", Component: ConcertsTrending },
      //     ],
      //   },
    ],
  },
]);
