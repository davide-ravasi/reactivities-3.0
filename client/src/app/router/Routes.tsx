import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetail from "../features/activities/detail/ActivityDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "activities",
        element: <ActivityDashboard />,
      },
      {
        path: "createActivity",
        element: <ActivityForm key="create" />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetail />,
      },
      {
        path: "manage/:id",
        element: <ActivityForm key="manage" />,
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
