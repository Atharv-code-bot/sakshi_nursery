import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ New state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stockQuantity: "",
    images: [],
    status: "AVAILABLE",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // ✅ Fetch categories on mount
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/products/all");
      const data = await res.json();
      setProducts(data);
      console.log(data.status);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/products/getallcategory");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchProductDetailByName = async (name) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/products/product?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      setSelectedProduct(data);
    } catch (err) {
      console.error("Error fetching product detail by name", err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

const handleSubmit = async (e) => {
   const token="eOCYfFKB_7FtuhxyCSFEy9:APA91bFCfbpV_m5TS_CUdEVvYtlH0vEWP2wCsHVOzHWv_oBQOqoNaDRZOMyKCrCWx4KpGsRhlqZ2hH7jjb_x3S69VOIAhuk2hB48YK4zNUEWqpgNJj1YUi0"
  e.preventDefault();

  const product = {
    name: formData.name,
    description: formData.description,
    price: parseFloat(formData.price),
    stockQuantity: parseInt(formData.stockQuantity),
    category: { name: formData.category },
    status: formData.status,
  };

  const form = new FormData();
  console.log(product.status)
  // console.log(product.)
  form.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));

  // Only append files if new images are selected
  if (formData.images.length > 0) {
    formData.images.forEach((img) => form.append("file", img));
   
  }

  const url = editingProduct
    ? `http://localhost:8080/api/admin/products/update/${editingProduct.id}`
    : `http://localhost:8080/api/admin/products/create?token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: editingProduct ? "PUT" : "POST",
      body: form,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to submit: ${errorText}`);
    }

    const savedProduct = await res.json();

    if (editingProduct) {
      setProducts(products.map((p) => (p.name === editingProduct.name ? savedProduct : p)));
    } else {
      setProducts([...products, savedProduct]);
    }

    resetForm();
  } catch (err) {
    console.error("Submit failed", err);
  }
};




  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      stockQuantity: "",
      images: [],
      status: "",
    });
    setEditingProduct(null);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category?.name || "",
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      images: [],
      status: product.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (name) => {
    try {
      await fetch(`http://localhost:8080/api/admin/products/deleteByName?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p.name !== name));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/150";
    return `http://localhost:8080/${path.replace(/\\/g, "/")}`;
  };

  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || categoryMatch;
      })
    : [];

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Plant Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 space-x-2 text-white bg-blue-600 rounded"
        >
          <Plus size={20} /> <span>Add Plant</span>
        </button>
      </div>

      <div className="p-6 bg-green-50 border rounded-lg">
        <div className="relative">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border rounded-lg"
          />
        </div>
      </div>

     <div className="bg-green-50 border rounded-lg">
  {/* Desktop view */}
  <div className="hidden overflow-x-auto md:block">
    <table className="w-full">
      <thead className="bg-green-50">
        <tr>
          <th className="px-4 py-2 text-left">Plant</th>
          <th className="px-4 py-2 text-left">Category</th>
          <th className="px-4 py-2 text-left">Price</th>
          <th className="px-4 py-2 text-left">Stock</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id} className="border-b">
            <td
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:underline"
              onClick={() => fetchProductDetailByName(product.name)}
            >
              <img
                src={
                  Array.isArray(product.imageUrls) && product.imageUrls.length > 0
                    ? getImageUrl(product.imageUrls[0])
                    : "https://via.placeholder.com/50"
                }
                alt="Product"
                className="object-cover w-10 h-10 rounded"
              />
              {product.name}
            </td>
            <td className="px-4 py-2">{product.category?.name}</td>
            <td className="px-4 py-2">₹{product.price}</td>
            <td className="px-4 py-2">{product.stockQuantity}</td>
              <td><p className="text-base">
  <span className="font-medium">Status:</span>{" "}
  <span
    className={`px-3 py-1 rounded-full text-green-800 font-semibold ${
      product.status === "AVAILABLE"
        ? "bg-green-100"
        : "bg-red-100 text-red-800"
    }`}
  >
    {product.status}
  </span>
</p></td>

           <td className="px-4 py-2 space-x-2">
  <button
    onClick={() => handleEdit(product)}
    className="text-green-700 hover:text-green-900"
  >
    <Edit size={16} />
  </button>
  <button
    onClick={() => handleDelete(product.name)}
    className="text-red-600 hover:text-red-800"
  >
    <Trash2 size={16} />
  </button>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>

{/* Mobile view - Product Card Layout */}
<div className="block space-y-4 md:hidden">
  {filteredProducts.map((product) => (
    <div
      key={product.id}
      className="p-4 bg-white border border-gray-200 rounded-lg shadow-md"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={
            Array.isArray(product.imageUrls) && product.imageUrls.length > 0
              ? getImageUrl(product.imageUrls[0])
              : "https://via.placeholder.com/50"
          }
          alt="Product"
          className="object-cover w-16 h-16 border rounded-lg"
        />
        <div>
          <h3
            className="text-lg font-semibold text-blue-600 cursor-pointer"
            onClick={() => fetchProductDetailByName(product.name)}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category?.name}</p>
        </div>
      </div>

      <div className="mb-3 space-y-1 text-sm text-gray-700">
        <p><span className="font-medium">Price:</span> ₹{product.price}</p>
        <p><span className="font-medium">Stock:</span> {product.stockQuantity}</p>
       <p>
  <span className="font-medium">Status:</span>{" "}
  <span
    className={`px-2 py-1 rounded text-white font-semibold ${
      product.status === "AVAILABLE"
        ? "bg-green-600"
        : "bg-red-600"
    }`}
  >
    {product.status}
  </span>
</p>

      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => handleEdit(product)}
          className="px-4 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product.name)}
          className="px-4 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

</div>


      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="mb-4 text-xl font-bold text-center">Plant Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedProduct.name}</p>
              <p><strong>Description:</strong> {selectedProduct.description}</p>
              <p><strong>Category:</strong> {selectedProduct.category?.name}</p>
              <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
              <p><strong>Stock:</strong> {selectedProduct.stockQuantity}</p>
           <p>
  <strong>Status:</strong>{" "}
  <span
    className={
      selectedProduct.status === "AVAILABLE"
        ? "text-green-600 font-semibold"
        : "text-red-600 font-semibold"
    }
  >
    {selectedProduct.status}
  </span>
</p>

            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">Plant Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.imageUrls?.map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt={`Product ${idx}`}
                    className="object-cover w-full h-40 border rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ... (rest of the UI remains unchanged) */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="mb-4 text-xl font-bold text-center">
              {editingProduct ? "Edit Plant" : "Add Plant"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product Name"
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product Description"
                required
                className="w-full p-2 border rounded"
              ></textarea>

              {/* ✅ Dynamic Category Dropdown */}
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full p-2 border rounded"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Price"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                placeholder="Stock Quantity"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />

              {/* ✅ Status Dropdown */}
             <select
  value={formData.status}
  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
  className={`w-full p-2 border rounded 
    ${formData.status === 'AVAILABLE' ? 'bg-green-100 text-green-700 border-green-300' : ''}
    ${formData.status === 'OUT_OF_STOCK' ? 'bg-red-100 text-red-700 border-red-300' : ''}
  `}
>
  <option value="AVAILABLE">AVAILABLE</option>
  <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
</select>


              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  {editingProduct ? "Update Plant" : "Add Plant"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
