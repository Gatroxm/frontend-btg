import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import useFetchData from '../hooks/useFetchData';

const Funds = () => {
    // Estados para la lista de fondos y el formulario
    const { data: funds, loading, error, setData: setFunds } = useFetchData('http://localhost:5000/api/funds');
    const [nombre, setNombre] = useState('');
    const [montoMinimo, setMontoMinimo] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editingFundId, setEditingFundId] = useState(null);

    if (loading) return <p>Cargando fondos...</p>;
    if (error) return <p>{error}</p>;

    // Crear un fondo nuevo
    const handleCreate = (e) => {
        e.preventDefault();
        const newFund = { nombre, montoMinimo: parseFloat(montoMinimo) };

        fetch('http://localhost:5000/api/funds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFund),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setFunds((prevFunds) => [...prevFunds, data]); // Utiliza una función de actualización
                setNombre(''); // Limpiar el formulario
                setMontoMinimo('');
            })
            .catch((error) => console.error('Error al crear el fondo:', error));
    };
    // Eliminar un fondo
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/funds/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setFunds(funds.filter((fund) => fund._id !== id)); // Filtrar la lista de fondos
            })
            .catch((error) => console.error('Error al eliminar el fondo:', error));
    };

    // Editar un fondo (cargar los datos en el formulario)
    const handleEdit = (fund) => {
        setEditMode(true);
        setNombre(fund.nombre);
        setMontoMinimo(fund.montoMinimo);
        setEditingFundId(fund._id);
    };

    // Actualizar un fondo existente
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedFund = { nombre, montoMinimo: parseFloat(montoMinimo) };

        fetch(`http://localhost:5000/api/funds/${editingFundId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFund),
        })
            .then((res) => res.json())
            .then((data) => {
                setFunds(funds.map((fund) => (fund._id === editingFundId ? data : fund))); // Actualizar el fondo en la lista
                setEditMode(false); // Salir del modo de edición
                setNombre('');
                setMontoMinimo('');
                setEditingFundId(null);
            })
            .catch((error) => console.error('Error al actualizar el fondo:', error));
    };

    return (
        <div>
            <h2>Gestión de Fondos</h2>

            {/* Formulario para crear/actualizar un fondo */}
            <Form onSubmit={editMode ? handleUpdate : handleCreate}>
                <Form.Group controlId="formFundName">
                    <Form.Label>Nombre del Fondo</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingrese el nombre del fondo"
                    />
                </Form.Group>
                <Form.Group controlId="formFundAmount">
                    <Form.Label>Monto Mínimo</Form.Label>
                    <Form.Control
                        type="number"
                        value={montoMinimo}
                        onChange={(e) => setMontoMinimo(e.target.value)}
                        placeholder="Ingrese el monto mínimo"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-3'>
                    {editMode ? 'Actualizar Fondo' : 'Crear Fondo'}
                </Button>
            </Form>

            <hr />

            {/* Tabla de fondos */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Monto Mínimo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {funds.map((fund) => (
                        <tr key={fund._id}>
                            <td>{fund._id}</td>
                            <td>{fund.nombre}</td>
                            <td>{fund.montoMinimo}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(fund)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(fund._id)}>
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

export default Funds;
