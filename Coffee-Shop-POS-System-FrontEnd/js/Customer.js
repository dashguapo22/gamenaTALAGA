// Helper functions
function getCustomers() {
    return JSON.parse(localStorage.getItem('customers')) || [];
}
function setCustomers(customers) {
    localStorage.setItem('customers', JSON.stringify(customers));
}
function renderCustomers() {
    const customers = getCustomers();
    const tbody = document.getElementById('customer-table-list');
    tbody.innerHTML = '';
    customers.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.address}</td>
            <td>${c.number}</td>
            <td><button class="update-customer" data-index="${i}">Update</button></td>
            <td><button class="delete-customer" data-index="${i}">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}
function resetCustomerForm() {
    document.getElementById('customerID').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('customerNumber').value = '';
}

// Show/Hide form
document.getElementById('add-customer').onclick = () => {
    document.getElementById('customerRegisterForm').style.display = 'block';
    document.getElementById('registerTitle').innerText = 'Register Customer';
    resetCustomerForm();
    document.getElementById('customer-submit').dataset.mode = 'add';
};
document.getElementById('customerRegisterForm-close').onclick = () => {
    document.getElementById('customerRegisterForm').style.display = 'none';
};

// Add/Update customer
document.getElementById('customer-form').onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('customerID').value.trim();
    const name = document.getElementById('customerName').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const number = document.getElementById('customerNumber').value.trim();
    if (!id || !name || !address || !number) {
        alert('All fields required!');
        return;
    }
    let customers = getCustomers();
    if (this.querySelector('#customer-submit').dataset.mode === 'update') {
        const idx = +this.querySelector('#customer-submit').dataset.index;
        customers[idx] = { id, name, address, number };
    } else {
        customers.push({ id, name, address, number });
    }
    setCustomers(customers);
    renderCustomers();
    document.getElementById('customerRegisterForm').style.display = 'none';
};

// Update button
document.getElementById('customer-table-list').onclick = function(e) {
    if (e.target.classList.contains('update-customer')) {
        const idx = e.target.dataset.index;
        const customers = getCustomers();
        const c = customers[idx];
        document.getElementById('customerID').value = c.id;
        document.getElementById('customerName').value = c.name;
        document.getElementById('customerAddress').value = c.address;
        document.getElementById('customerNumber').value = c.number;
        document.getElementById('customerRegisterForm').style.display = 'block';
        document.getElementById('registerTitle').innerText = 'Update Customer';
        document.getElementById('customer-submit').dataset.mode = 'update';
        document.getElementById('customer-submit').dataset.index = idx;
    }
    // Delete button
    if (e.target.classList.contains('delete-customer')) {
        const idx = e.target.dataset.index;
        let customers = getCustomers();
        if (confirm('Delete this customer?')) {
            customers.splice(idx, 1);
            setCustomers(customers);
            renderCustomers();
        }
    }
};

// Initial render
renderCustomers();

