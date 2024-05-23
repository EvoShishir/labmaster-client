import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import React from "react";

type Props = {};

function attendence({}: Props) {
  return (
    <ProtectedRoute>
      <div>
        <Layout sideNumber={2}>
          <h1 className="text-center">Coming Soon!</h1>
        </Layout>
      </div>
    </ProtectedRoute>
  );
}

export default attendence;
