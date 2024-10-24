import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [imageUrl, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://mern-2-wbdf.onrender.com/edit/${id}`);
                setImg(response.data.imageUrl);
                setPrice(response.data.price);
                setName(response.data.name);
                setDesc(response.data.desc);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const obj = { imageUrl, name, price: parseFloat(price), desc };

        try {
            await axios.patch(`https://mern-2-wbdf.onrender.com/edit/${id}`, obj);
            navigate('/items'); // Redirect to home or another route after successful update
        } catch (error) {
            console.error('Error updating item:', error);
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Edit Items</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Edit image URL"
                        value={imageUrl}
                        onChange={(e) => setImg(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Edit price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Edit name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Edit description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
