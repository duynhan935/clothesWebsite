import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen w-[1250px] max-w-[calc(100%-48px)] mx-auto">
            <Header />

            <main className="flex-1 p-6">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
