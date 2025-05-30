import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "@/components/ui/provider";
import { LoadingSpinner } from "./components/loading";

const queryClient = new QueryClient();

const HomePage = lazy(() => import("./pages/home-page"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
