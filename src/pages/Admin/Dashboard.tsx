import { Card, Row, Col } from "antd";
import { useEffect, useState } from "react";

interface Stats {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
}

const Dashboard: React.FC = () => {
    // mock data –> khi có API chỉ cần gọi và set lại
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
    });

    useEffect(() => {
        // TODO: gọi API thật ở đây
        // Ví dụ:
        // const fetch = async () => {
        //   const [u, p, o] = await Promise.all([
        //     getUsersAPI(), getProductsAPI(), getOrdersAPI()
        //   ]);
        //   setStats({
        //     totalUsers: u.length,
        //     totalProducts: p.length,
        //     totalOrders: o.length,
        //   });
        // };
        // fetch();

        // ------- dữ liệu giả để demo -------
        setTimeout(() => {
            setStats({ totalUsers: 4, totalProducts: 4, totalOrders: 9 });
        }, 300);
    }, []);

    const cards = [
        { title: "Total Users", value: stats.totalUsers },
        { title: "Total Products", value: stats.totalProducts },
        { title: "Total Orders", value: stats.totalOrders },
    ];

    return (
        <Row gutter={[24, 24]}>
            {cards.map(({ title, value }) => (
                <Col xs={24} md={8} key={title}>
                    <Card
                        className="text-center"
                        bodyStyle={{
                            minHeight: 140,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                    >
                        <p className="text-lg text-gray-500">{title}</p>
                        <p className="text-4xl font-semibold text-[#001529]">{value}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default Dashboard;
