const BASE_URL = "https://exam-server-5c4e.onrender.com";

export async function getAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products/all`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories/all`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getProductsByCategory(categoryId) {
  try {
    const res = await fetch(`${BASE_URL}/categories/${categoryId}`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    const response = await res.json();

    const products = response.data || response;
    const categoryTitle =
      response.category?.title || response.title || "Category";

    if (Array.isArray(products)) {
      return products.map((product) => ({
        ...product,
        categoryTitle: categoryTitle,
      }));
    }

    return products;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
}

export async function getDiscountedProducts() {
  try {
    const allProducts = await getAllProducts();
    return allProducts.filter((product) => product.discont_price !== null);
  } catch (error) {
    console.error("Error fetching discounted products:", error);
    throw error;
  }
}

export function formatProduct(product) {
  return {
    id: product.id,
    name: product.title,
    title: product.title,
    image: `https://exam-server-5c4e.onrender.com${product.image}`,
    price: Number(product.discont_price || product.price),
    oldPrice: product.discont_price ? Number(product.price) : null,
    originalPrice: Number(product.price),
    discountPrice: product.discont_price ? Number(product.discont_price) : null,
    description: product.description || "",
    categoryId: product.categoryId,
  };
}

export function formatCategory(category) {
  return {
    id: category.id,
    title: category.title,
    image: category.image,
  };
}

export function getRandomItems(array, count) {
  if (count >= array.length) return array;

  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function getRandomDiscountedProducts(count = 4) {
  try {
    const discountedProducts = await getDiscountedProducts();
    const formatted = discountedProducts.map((product) => ({
      id: product.id,
      title: product.title,
      image: `https://exam-server-5c4e.onrender.com${product.image}`,
      price: Number(product.discont_price),
      oldPrice: Number(product.price),
      description: product.description || "",
      categoryId: product.categoryId,
    }));
    return getRandomItems(formatted, count);
  } catch (error) {
    console.error("Error fetching random discounted products:", error);
    throw error;
  }
}
