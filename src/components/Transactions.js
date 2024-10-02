import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import useFetchData from '../hooks/useFetchData';

const Transactions = () => {
    // Estados para la lista de transacciones y el formulario
    const { data: transactions, loading, error, setData: setTransactions } = useFetchData('http://localhost:5000/api/transactions');
    const [fondoId, setFondoId] = useState('');
    const [monto, setMonto] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingTransactionId, setEditingTransactionId] = useState(null);

    if (loading) return <p>Cargando transacciones...</p>;
    if (error) return <p>{error}</p>;

    // Crear una nueva transacción
    const handleCreate = (e) => {
        e.preventDefault();
        const nuevaTransaccion = { fondoId, monto: parseFloat(monto) };

        fetch('http://localhost:5000/api/transactions/apertura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaTransaccion),
        })
            .then((res) => res.json())
            .then((data) => {
                setTransactions([...transactions, data]); // Añadir la nueva transacción a la lista
                setFondoId(''); // Limpiar el formulario
                setMonto('');
            })
            .catch((error) => console.error('Error al crear la transacción:', error));
    };

    // Eliminar una transacción
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/transactions/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTransactions(transactions.filter((tx) => tx._id !== id)); // Filtrar la lista de transacciones
            })
            .catch((error) => console.error('Error al eliminar la transacción:', error));
    };

    // Editar una transacción (cargar los datos en el formulario)
    const handleEdit = (tx) => {
        setEditMode(true);
        setFondoId(tx.fondoId);
        setMonto(tx.monto);
        setEditingTransactionId(tx._id);
    };

    // Actualizar una transacción existente
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedTransaction = { fondoId, monto: parseFloat(monto) };

        fetch(`http://localhost:5000/api/transactions/${editingTransactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTransaction),
        })
            .then((res) => res.json())
            .then((data) => {
                setTransactions(transactions.map((tx) => (tx._id === editingTransactionId ? data : tx))); // Actualizar la transacción en la lista
                setEditMode(false); // Salir del modo de edición
                setFondoId('');
                setMonto('');
                setEditingTransactionId(null);
            })
            .catch((error) => console.error('Error al actualizar la transacción:', error));
    };

    return (
        <div>
            <h2>Gestión de Transacciones</h2>

            {/* Formulario para crear/actualizar una transacción */}
            <Form onSubmit={editMode ? handleUpdate : handleCreate}>
                <Form.Group controlId="formFondoId">
                    <Form.Label>ID del Fondo</Form.Label>
                    <Form.Control
                        type="text"
                        value={fondoId}
                        onChange={(e) => setFondoId(e.target.value)}
                        placeholder="Ingrese el ID del fondo"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formMonto">
                    <Form.Label>Monto</Form.Label>
                    <Form.Control
                        type="number"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        placeholder="Ingrese el monto"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3'>
                    {editMode ? 'Actualizar Transacción' : 'Crear Transacción'}
                </Button>
            </Form>

            <hr />

            {/* Tabla de transacciones */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((tx) => (
                        <tr key={tx._id}>
                            <td>{tx.identificador}</td>
                            <td>{tx.tipo}</td>
                            <td>{tx.monto}</td>
                            <td>{new Date(tx.fecha).toLocaleDateString()}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(tx)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(tx._id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Transactions;
