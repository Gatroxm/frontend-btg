import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import useFetchData from '../hooks/useFetchData';

const Dashboard = () => {
    // Obtener transacciones y fondos usando el hook personalizado
    const { data: transactions, loading: loadingTransactions } = useFetchData('/api/transactions/historial');
    const { data: funds, loading: loadingFunds } = useFetchData('/api/funds');

    // Calcular estadísticas
    const totalTransacciones = transactions.length;
    const totalFondos = funds.length;
    const saldoTotal = transactions.reduce((total, tx) => total + (tx.tipo === 'Apertura' ? -tx.monto : tx.monto), 500000); // Suponiendo que el saldo inicial es de 500,000 COP

    if (loadingTransactions || loadingFunds) {
        return <p>Cargando datos del dashboard...</p>;
    }

    return (
        <Container>
            <h2>Resumen del Panel Administrativo</h2>
            <Row>
                <Col md={4}>
                    <Card bg="primary" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total de Transacciones</Card.Title>
                            <Card.Text>
                                {totalTransacciones} transacciones registradas.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="success" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Saldo Disponible</Card.Title>
                            <Card.Text>
                                COP ${saldoTotal.toLocaleString()} disponible.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="info" text="white" className="mb-4">
                        <Card.Body>
                            <Card.Title>Total de Fondos</Card.Title>
                            <Card.Text>
                                {totalFondos} fondos disponibles.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Últimas Transacciones</Card.Title>
                            <ul>
                                {transactions.slice(0, 5).map((tx) => (
                                    <li key={tx._id}>
                                        {tx.tipo} - {tx.monto} COP el {new Date(tx.fecha).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Fondos Recientes</Card.Title>
                            <ul>
                                {funds.slice(0, 5).map((fondo) => (
                                    <li key={fondo._id}>{fondo.nombre} - Monto Mínimo: {fondo.montoMinimo} COP</li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
