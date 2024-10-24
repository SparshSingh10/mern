import axios from 'axios'; // Import Axios
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
                const response = await axios.get('http://localhost:5000/items'); // Use Axios to fetch data
                setItems(response.data); // Set items from response
        };

        fetchData();
    }, []);

    return (
        <div className="pt-12 px-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 h-full">
            {items.map((item) => (
                <div key={item._id} className="col-span-1 bg-gray-200 p-5 h-72 flex flex-col justify-between rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <div>
                        <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-700">Price: ${item.price}</p>
                    </div>
                    <div className="flex justify-center">
                        <Link to={{ pathname: `/edit/${item._id}`, state: item }}>
                            <button className='bg-blue-700 m-2 text-white rounded p-3 h-10 w-24 flex justify-center items-center hover:bg-blue-600 transition duration-300'>
                                Edit
                            </button>
                        </Link>
                        <Link to={`/view/${item._id}`}>
                            <button className='bg-green-700 m-2 text-white rounded p-3 h-10 w-24 flex justify-center items-center hover:bg-green-600 transition duration-300'>
                                View
                            </button>
                        </Link>
                        <button className='bg-red-700 m-2 text-white rounded p-3 h-10 w-24 flex justify-center items-center hover:bg-red-600 transition duration-300'>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
