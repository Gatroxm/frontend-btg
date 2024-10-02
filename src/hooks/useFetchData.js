import { useState, useEffect } from 'react';

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los datos');
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error, setData }; // Asegúrate de exportar setData
};


export default useFetchData;
