import { Button, Divider } from "antd";
import ao1 from "../../assets/ao1.svg?url";


const Cart = () => {
    const cartItems = [
        {
            id: 1,
            name: "Modern Green Sweater",
            cartId: "12345678910",
            price: 60,
            img: ao1,
        },
        {
            id: 2,
            name: "Corporate Office Shoes",
            cartId: "12345678911",
            price: 399,
            img: ao1,
        },
        {
            id: 3,
            name: "Women Hand Bags",
            cartId: "12345678912",
            price: 123,
            img: ao1,
        },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="flex flex-row gap-10 p-4">
            <div className="flex-1 max-h-screen overflow-y-auto pr-10">
                {cartItems.map((item, index) => (
                    <div key={item.id} className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Item {index + 1}</span>
                            <div>
                                <a className="!text-gray-400 hover:underline cursor-pointer">Edit</a> |{" "}
                                <a className="!text-gray-400 hover:underline cursor-pointer">Remove</a>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-16 h-16 object-cover border border-gray-300"
                            />
                            <div>
                                <div className="font-medium text-base">{item.name}</div>
                                <div className="text-xs text-gray-500">Cart ID: {item.cartId}</div>
                                <div className="text-base font-bold mt-1">${item.price}</div>
                            </div>
                        </div>
                        <Divider className="my-3" />
                    </div>
                ))}
            </div>

            <div className="w-1/3 pl-6 border-l border-gray-200">
                <div className="flex justify-between font-semibold text-lg mb-3">
                    <span>Cart order total ({cartItems.length})</span>
                    <span>${total}</span>
                </div>
                <div className="text-sm text-gray-700 mb-4">
                    Congrats! You get <span className="text-green-600 font-medium">Free Shipping</span>.
                    <br />
                    <small className="text-xs text-gray-500">
                        Excludes furniture, mattresses & other exclusions apply.
                    </small>
                </div>
                <Button type="primary" block className="!mb-3">
                    View Cart
                </Button>
                <Button block>Check Out</Button>
            </div>
        </div>
    );
};

export default Cart;
