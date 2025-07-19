// src/pages/NotFoundPage.tsx
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f6f2] text-center p-6">
            <h1 className="text-8xl font-bold text-[#007b8a] tracking-wide">404</h1>
            <p className="text-2xl mt-4 text-gray-700">PAGE NOT FOUND</p>
            <Button type="primary" className="mt-6 px-8 py-2" onClick={() => navigate(-1)}>
                GO BACK
            </Button>
        </div>
    );
};

export default NotFoundPage;
