import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./redux/store/store";
import Loading from "./components/Loading/loading";
import { useEffect } from "react";
import { getUserDetails } from "./services/api.services";
import { doGetProfileAction, doLogoutAction, setLoading } from "./redux/store/profileSlice";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.account.isLoading);

    useEffect(() => {
        getProfile();
    }, [dispatch]);

    const getProfile = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const userData = await getUserDetails(token);
                dispatch(doGetProfileAction(userData.data));
                dispatch(setLoading(false));
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                dispatch(doLogoutAction());
            }
        }
        dispatch(setLoading(false));
    };

    return (
        <>
            {!isLoading ? (
                <div className="bg-[#F2EDE6]">
                    <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: "#1677ff" } }}>
                        <RouterProvider router={router} />
                    </ConfigProvider>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}
