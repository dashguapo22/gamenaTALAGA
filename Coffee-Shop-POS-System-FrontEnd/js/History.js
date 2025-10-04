$(document).ready(function () {
    const $historyTableList = $("#history-table-list");

    // Local Storage functions
    function getOrders() {
        return JSON.parse(localStorage.getItem('orders')) || [];
    }

    // Load items
    const LoadHistoryIntoTable = async () => {
        const orders = getOrders();
        $historyTableList.empty();
        orders.forEach((order, i) => {
            addOrderToTable(order, $historyTableList, i);
        });
    };

    const addOrderToTable = (order, table, index) => {
        const $row = $("<tr>");
        const keys = ["id", "customerId", "items", "totalAmount", "date"];
        keys.forEach((key) => {
            const $cell = $("<td>").text(order[key]);
            $row.append($cell);
        });
        const $actionCell = $("<td>");
        const $deleteButton = $("<button>")
            .addClass("delete-order")
            .text("Delete")
            .on("click", function () {
                deleteOrder(index);
            });
        $actionCell.append($deleteButton);
        $row.append($actionCell);
        table.append($row);
    };

    // Delete order
    function deleteOrder(index) {
        let orders = getOrders();
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        LoadHistoryIntoTable();
        showToast("Order deleted successfully.", "success");
    }

    // Toast notification function
    const showToast = (message, type = "success") => {
        const $toast = $("#toast");
        $toast.removeClass("success error");
        $toast.addClass(type);
        $toast.text(message);
        $toast.addClass("show");
        setTimeout(() => {
            $toast.removeClass("show");
        }, 3000);
    };

    // Initial load
    LoadHistoryIntoTable();

    // Refresh button
    $("#refresh-history").on("click", function () {
        LoadHistoryIntoTable();
    }
    );

    function loadOrderHistory() {
        const history = JSON.parse(localStorage.getItem('orderHistory')) || [];
        const tbody = document.getElementById('history-table-list');
        tbody.innerHTML = '';

        if (history.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No orders yet.</td></tr>';
            return;
        }

        history.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${order.orderId}</td>
                <td>${order.customerName}</td>
                <td>${order.date}</td>
                <td>${order.total}</td>
                <td><button class="view-history" data-id="${order.orderId}">View</button></td>
            `;
            tbody.appendChild(tr);
        });

        // Show latest order in the info card
        const latest = history[0];
        if (latest) {
            document.getElementById('history-customer-id').textContent = latest.customerId;
            document.getElementById('history-order-id').textContent = latest.orderId;
            document.getElementById('history-total-price').textContent = latest.total;
            document.getElementById('history-date-time').textContent = latest.date;
            // Add loyalty points if you have it in your card
            if (document.getElementById('history-loyalty-points')) {
                document.getElementById('history-loyalty-points').textContent = latest.loyaltyPoints || '0';
            }
        }
    }

    // Call this when History section is shown
    document.getElementById('HistoryForm-button').addEventListener('click', loadOrderHistory);

    // Optionally, call on page load if you want
    // loadOrderHistory();
});