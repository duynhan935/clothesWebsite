/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers, getAllProducts } from "../../services/api.services";

interface Stats {
    totalUsers: number;
    totalProducts: number;
}

function Dashboard() {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalProducts: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [userRes, productRes] = await Promise.all([getAllUsers(), getAllProducts()]);

                setStats({
                    totalUsers: userRes.data.length,
                    totalProducts: productRes.data.length,
                });
            } catch (err) {
                message.error("Failed to fetch dashboard statistics");
            }
        };

        fetchStats();
    }, []);

    const cards = [
        { title: "Total Users", value: stats.totalUsers },
        { title: "Total Products", value: stats.totalProducts },
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
}

export default Dashboard;
