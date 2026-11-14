const svgImage = (label, color) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="600" height="600" fill="${color}"/><text x="300" y="315" font-family="Arial" font-size="48" text-anchor="middle" fill="#222">${label}</text></svg>`,
  )}`;

export const testUser = {
  id: 2,
  name: "Test User",
  email: "test@eshop.com",
  role: "user",
};

export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 30000000,
    description: "Điện thoại cao cấp của Apple",
    category_id: 1,
    category: "Điện thoại",
    imageUrl: svgImage("iPhone 15", "#dddddd"),
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 28000000,
    description: "Màn hình đẹp và camera zoom xa",
    category_id: 1,
    category: "Điện thoại",
    imageUrl: svgImage("Samsung S24", "#d8e8ff"),
  },
  {
    id: 3,
    name: "MacBook Pro M3",
    price: 45000000,
    description: "Laptop chuyên nghiệp mạnh mẽ",
    category_id: 2,
    category: "Máy tính",
    imageUrl: svgImage("MacBook Pro", "#e8e8e8"),
  },
];
