import axios from "axios";
import { useState } from "react";

function New() {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const obj = { imageUrl, name, price: parseFloat(price), desc };

    axios.post('https://mern-2-wbdf.onrender.com/new', obj)
      .then(response => {
        console.log("Data sent to server:", obj);

        setDesc('');
        setImageUrl('');
        setName('');
        setPrice('');
      })
  };
  return (
    <>

      <div className="min-h-screen p-5 ">
        <h1 className="text-lg font-serif mb-4">Add New Item</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className="p-2 border border-gray-300 rounded" type="text" required placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          <input className="p-2 border border-gray-300 rounded" type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="p-2 border border-gray-300 rounded" type="text" required placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <textarea className="p-2 border border-gray-300 rounded" required placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit</button>
        </form>
      </div>

    </>
  )
}
export default New