import { Button, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { closeCart } from "../../redux/store/cartSlice";
import { closeLogin } from "../../redux/store/loginSlice";
import { closeRegister } from "../../redux/store/registerSlice";

import Cart from "../../components/Client/Cart";
import Login from "../../auth/login";
import RegisterPage from "../../auth/register";

import Products from "../../components/Client/Products";

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const isLoginOpen = useSelector((state: RootState) => state.login.isLoginOpen);
    const isRegisterOpen = useSelector((state: RootState) => state.register.isRegisterOpen);

    return (
        <div className="min-h-screen px-8 py-6">
            {/* ----- Header + bộ lọc ----- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-0">Find Your Products</h1>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <Button icon={<FilterOutlined />}>All Filters</Button>

                    <Select
                        defaultValue="relevancy"
                        options={[
                            { value: "relevancy", label: "Relevancy" },
                            { value: "price_low_high", label: "Price: Low to High" },
                            { value: "price_high_low", label: "Price: High to Low" },
                        ]}
                    />
                </div>
            </div>
            {/* ----- Danh sách sản phẩm ----- */}
            <Products /> {/* sử dụng mock data mặc định */}
            {/* Hoặc truyền data khác:  <Products products={customList} /> */}
            {/* ----- Modals ----- */}
            <Modal open={isCartOpen} onCancel={() => dispatch(closeCart())} footer={null} width={800}>
                <Cart />
            </Modal>
            <Modal
                open={isLoginOpen}
                onCancel={() => dispatch(closeLogin())}
                footer={null}
                width={400}
                centered
                styles={{ body: { padding: 0 } }}
            >
                <Login />
            </Modal>
            <Modal
                open={isRegisterOpen}
                onCancel={() => dispatch(closeRegister())}
                footer={null}
                width={400}
                centered
                styles={{ body: { padding: 0 } }}
            >
                <RegisterPage />
            </Modal>
        </div>
    );
};

export default HomePage;
