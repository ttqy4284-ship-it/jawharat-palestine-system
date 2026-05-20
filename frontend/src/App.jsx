import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    model: "",
    size: "",
    quantity: "",
    price: "",
  });

  const fetchProducts = async () => {

    try {

      const res = await axios.get("http://localhost:5000/products");

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchProducts();

  }, []);

  const addProduct = async () => {

    try {

      await axios.post("http://localhost:5000/products", form);

      fetchProducts();

      setForm({
        model: "",
        size: "",
        quantity: "",
        price: "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      dir="rtl"
      style={{
        backgroundColor: "#111827",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "sans-serif"
      }}
    >

      <h1>إدارة مخزن جوهرة فلسطين</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px"
        }}
      >

        <input
          type="text"
          placeholder="الموديل"
          value={form.model}
          onChange={(e) =>
            setForm({ ...form, model: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="القياس"
          value={form.size}
          onChange={(e) =>
            setForm({ ...form, size: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="الكمية"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="السعر"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <button
          onClick={addProduct}
          style={{
            padding: "10px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          إضافة منتج
        </button>

      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2>المنتجات</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px"
        }}
      >

        {products.map((product) => (

          <div
            key={product.id}
            style={{
              backgroundColor: "#1f2937",
              padding: "15px",
              borderRadius: "10px"
            }}
          >

            <h3>{product.model}</h3>

            <p>القياس: {product.size}</p>

            <p>الكمية: {product.quantity}</p>

            <p>السعر: {product.price}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default App;