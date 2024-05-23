import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import React from "react";

type Props = {};

function settings({}: Props) {
  return (
    <ProtectedRoute>
      <div>
        <Layout sideNumber={4}>Coming Soon!</Layout>
      </div>
    </ProtectedRoute>
  );
}

export default settings;
