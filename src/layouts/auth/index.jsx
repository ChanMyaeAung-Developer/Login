import React from "react";
import { Navigate, Outlet } from "react-router";
import useAuth from "../../utils/hooks/useAuth";

const AuthLayout = () => {
    // const { status } = useAuth();
    // console.log('auth', status)

    // if (status === "authenticated") return <Navigate to="/" replace />

    return (
        <main className="bg-primary min-h-screen">
            <Outlet />
        </main>
    );
};

export default AuthLayout;
