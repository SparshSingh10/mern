import { useState } from "react";

function Edit() {
    const [img, setImg] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    function handleSubmit(e) {
        e.preventDefault(); 

        const obj = { img, name, price: parseFloat(price), desc };

        console.log(obj);
        setDesc('');
        setImg('');
        setName('');
        setPrice('');
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">Edit Items</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Edit image"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                            required
                        />
                        <input
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Edit price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required

                        />
                        <input
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Edit name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required

                        />
                        <textarea
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Edit description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required

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
        </>
    );
}

export default Edit;
