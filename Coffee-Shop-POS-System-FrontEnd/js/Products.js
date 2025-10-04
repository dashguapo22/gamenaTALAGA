$(document).ready(function() {
    const $productRegisterForm = $("#productRegisterForm");
    const $productTableList = $("#product-table-list");
    const $productForm = $("#product-form");
    const $productButton = $("#product-submit");
    const $title = $("#title");
    let isProductUpdateMode = false;
    let currentProductId = null;

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

    // Set up event listener
    const openProductRegisterForm = () => {
        $productRegisterForm.show();
        $title.text("Register Product");
    };

    const closeProductRegisterForm = () => {
        $productRegisterForm.hide();
        $productForm[0].reset();
        $productButton.text("Submit");
        isProductUpdateMode = false;
        currentProductId = null;
    };

    $("#add-product").on("click", openProductRegisterForm);
    $("#productRegisterForm-close").on("click", closeProductRegisterForm);

    // Local Storage functions
    function getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }
    function setProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Load items
    const LoadProductsIntoTable = async () => {
        const products = getProducts();
        $productTableList.empty();
        products.forEach((product, i) => {
            addProductToTable(product, $productTableList, i);
        });
    };

    const addProductToTable = (product, table, index) => {
        const $row = $("<tr>");
        const keys = ["id", "name", "price", "category"];
        keys.forEach((key) => {
            const $cell = $("<td>").text(product[key]);
            $row.append($cell);
        });

        // Create Update button
        const $updateCell = $("<td>");
        const $updateButton = $("<button>").text("Update").addClass("action-button update-product").attr("data-index", index);
        $updateButton.on("click", () => {
            openProductRegisterForm();
            fillFormWithProductData(product);
            $title.text("Update Product");
            isProductUpdateMode = true;
            currentProductId = product.id;
            $productButton.text("Update");
        });
        $updateCell.append($updateButton);
        $row.append($updateCell);

        // Create Remove button
        const $removeCell = $("<td>");
        const $removeButton = $("<button>").text("Remove").addClass("action-button delete-product").attr("data-index", index);
        $removeButton.on("click", async () => {
            const idx = $removeButton.data("index");
            let products = getProducts();
            if (confirm('Delete this product?')) {
                products.splice(idx, 1);
                setProducts(products);
                showToast("Product Deleted Successfully", "success");
                await LoadProductsIntoTable();
            }
        });
        $removeCell.append($removeButton);
        $row.append($removeCell);

        // Append the row to the table
        table.append($row);
    };

    const fillFormWithProductData = (product) => {
        $("#productID").val(product.id);
        $("#productName").val(product.name);
        $("#price").val(product.price);
        $("#category").val(product.category);
    
    };

    // Validation functions
    const validateProID = (pro_id) => /^P\d{3}$/.test(pro_id);
    const validateProName = (pro_name) => /^[a-zA-Z\s]+$/.test(pro_name);
    const validatePrice = (price) => /^[0-9]+(\.[0-9]{1,2})?$/.test(price) && parseFloat(price) > 0;
    const validateCategory = (category) => category.trim() !== "";
   

    // Handle form submit and update product
    $productForm.on("submit", async (event) => {
        event.preventDefault();

        // Get form data
        const id = $("#productID").val();
        const name = $("#productName").val();
        const price = $("#price").val();
        const category = $("#category").val();
        

        // Validate data
        if (!validateProID(id)) {
            showToast("Item ID must be in 'P000' format", "error");
            return;
        }
        if (!validateProName(name)) {
            showToast("Name must contain only letters", "error");
            return;
        }
        if (!validatePrice(price)) {
            showToast("Price must be a valid positive number", "error");
            return;
        }
        if (!validateCategory(category)) {
            showToast("Category cannot be empty", "error");
            return;
        }
        

        const productData = {
            id,
            name,
            price,
            category,
            
        };

        try {
            let products = getProducts();
            if (isProductUpdateMode) {
                const idx = products.findIndex(p => p.id === currentProductId);
                products[idx] = productData;
                setProducts(products);
                showToast("Product Updated Successfully", "success");
            } else {
                products.push(productData);
                setProducts(products);
                showToast("Product Added Successfully", "success");
            }
            await LoadProductsIntoTable();
            closeProductRegisterForm();
        } catch (error) {
            showToast("Error processing product data", "error");
        }
    });

    LoadProductsIntoTable();
});
