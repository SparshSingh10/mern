import axios from 'axios'; // Import Axios
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams and Link for navigation

function ViewItem() {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null); // State to hold item data

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://mern-2-wbdf.onrender.com/view/${id}`); // Fetch item by ID
        setItem(response.data); // Set the item data
        // console.log(response.data);

      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem(); // Call the function to fetch item
  }, [id]); // Fetch item when the component mounts or ID changes

  if (!item) {
    return <div className="text-center text-lg">Loading...</div>; // Show loading message while fetching
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">{item.name}</h1>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-64 object-cover rounded mb-4" // Responsive image styling
        />
        <p className="text-xl font-semibold text-gray-800 mb-2">Price: ${item.price}</p> {/* Display item price */}
        <p className="text-gray-700 text-base mb-4">{item.desc}</p> {/* Display item description */}
        <Link to="/">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Back to Home
          </button>
        </Link> {/* Link to go back to Home */}
      </div>
    </div>
  );
}

export default ViewItem;
