import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Room } from "@/routes/room.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import { JoinRoom } from "./routes/join-room.tsx";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>ERROR</div>,
  },
  {
    path: "room/:roomId?",
    element: <Room />,
  },
  {
    path: "room/:roomId?/join",
    element: <JoinRoom />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
    <Toaster />
  </StrictMode>
);
