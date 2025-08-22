//customer List
let customerDataList = [];

//product List
let productDataList = [];

//Item Cart
let cart = [];

// Product Data (preloaded menu)
const defaultProducts = [
    // Fruit Tea
    { id: 'P001', name: 'Green Apple Fruit Tea', price: 140, category: 'Fruit Tea', quantity: 10 },
    { id: 'P002', name: 'Cucumber Fruit Tea', price: 140, category: 'Fruit Tea', quantity: 10 },
    { id: 'P003', name: 'Lychee Fruit Tea', price: 140, category: 'Fruit Tea', quantity: 10 },
    { id: 'P004', name: 'Peach Fruit Tea', price: 140, category: 'Fruit Tea', quantity: 10 },
    { id: 'P005', name: 'Passion Fruit Tea', price: 140, category: 'Fruit Tea', quantity: 10 },
    { id: 'P006', name: 'Strawberry Fruit Tea', price: 140, category: 'Fruit Tea', quantity: 10 },
    // Non-Coffee Based
    { id: 'P007', name: 'Signature Chocolate', price: 120, category: 'Non-Coffee Based', quantity: 10 },
    { id: 'P008', name: 'Matcha Latte', price: 140, category: 'Non-Coffee Based', quantity: 10 },
    { id: 'P009', name: 'Strawberry Latte', price: 140, category: 'Non-Coffee Based', quantity: 10 },
    { id: 'P010', name: 'Strawberry Matcha', price: 140, category: 'Non-Coffee Based', quantity: 10 },
    // Frappe
    { id: 'P011', name: 'Vanilla Delight Oreo Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P012', name: 'Caramel Macchiato Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P013', name: 'Coffee Jelly Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P014', name: 'Latte Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P015', name: 'Mocha Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P016', name: 'Matcha Latte Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P017', name: 'Double Chocolate Cream Chip Frappe', price: 160, category: 'Frappe', quantity: 10 },
    { id: 'P018', name: 'Strawberry Milkshake Frappe', price: 160, category: 'Frappe', quantity: 10 },
    // Coffee Based (Hot/Iced)
    { id: 'P019', name: 'Americano', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P020', name: 'Espresso', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P021', name: 'Doppio', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P022', name: 'Cortado', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P023', name: 'Cappuccino', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P024', name: 'Latte', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P025', name: 'Spanish Latte', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P026', name: 'Caramel Macchiato', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P027', name: 'Classic Vanilla', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P028', name: 'Mocha Latte', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P029', name: 'White Chocolate', price: 120, category: 'Coffee Based', quantity: 10 },
    { id: 'P030', name: 'Salted Caramel', price: 120, category: 'Coffee Based', quantity: 10 }
];

// Initialize products in localStorage if not present
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// Initialize customers in localStorage if not present
if (!localStorage.getItem('customers')) {
    localStorage.setItem('customers', JSON.stringify([]));
}