import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-1 p-6 bg-gray-100">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
