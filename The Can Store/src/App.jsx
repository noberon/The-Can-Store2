import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/products.json");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;
    if (category !== "All") {
      filtered = filtered.filter((product) => product.type === category.toLowerCase());
    }
    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(filtered);
  }, [category, searchTerm, products]);

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category" onChange={(e) => setCategory(e.target.value)}>
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="e.g. beans"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </aside>
        <main>
          {filteredProducts.map((product) => (
            <section key={product.name} className={product.type}>
              <h2>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
              <img src={`/images/${product.image}`} alt={product.name} />
            </section>
          ))}
        </main>
      </div>
      <footer>
        {/* フッターコンテンツ */}
      </footer>
    </>
  );
}
