import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

import { varAlpha } from "../theme/styles";
import { AuthLayout } from "../layouts/auth";
import { DashboardLayout } from "../layouts/dashboard";

// Import Protected and Public Routes
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("../pages/home"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const PatientPage = lazy(() => import("../pages/patients"));
export const SignInPage = lazy(() => import("../pages/sign-in"));
export const SignUpPage = lazy(() => import("../pages/sign-up"));
export const DoctorsPage = lazy(() => import("../pages/doctors"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

// ----------------------------------------------------------------------

// Loading screen
const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: <PublicRoute />,
      children: [
        {
          path: "sign-in",
          element: (
            <AuthLayout>
              <SignInPage />
            </AuthLayout>
          ),
        },
        {
          path: "sign-up", // Added Sign Up route here
          element: (
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          ),
        },
      ],
    },

    // Protected Routes (Dashboard and other pages)
    {
      element: <ProtectedRoute />, // Protects all dashboard-related pages
      children: [
        {
          element: (
            <DashboardLayout>
              <Suspense fallback={renderFallback}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            { element: <HomePage />, index: true },
            { path: "patients", element: <PatientPage /> },
            { path: "doctors", element: <DoctorsPage /> },
            { path: "blog", element: <BlogPage /> },
          ],
        },
      ],
    },

    // 404 Page
    {
      path: "404",
      element: <Page404 />,
    },

    // Redirect unknown routes to 404
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
