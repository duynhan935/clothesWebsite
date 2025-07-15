import { HashLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/70">
            <HashLoader color="#3986E4" />
        </div>
    );
};

export default Loading;
