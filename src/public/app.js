$(function (){

    $('#getProducts').on('click', function(){
        
        $.ajax({
            type: "GET",
            url: "/products",
            success: function (products) {
                //console.log(products);

                let tbody = $('tbody');

                tbody.html('');

                products.forEach(product => {
                    tbody.append(`
                        <tr>
                            <td class="id">${product.id}</td>
                            <td>
                                <input type="text" class="name" value="${product.name}"/>
                            </td>
                            <td>
                                <button class="update-button">Update</button>
                                <button class="delete-button">Delete</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });

    });

    $('#productForm').on('submit', function(e){
        e.preventDefault();

        let newProduct = $('#newProduct');

        $.ajax({
            type: "POST",
            url: "/products",
            data: {
                name: newProduct.val(),
            },
            success: function (response) {
                //console.log(response);
                $('#getProducts').click();
            }
        });

    });

    $('table').on('click', '.update-button', function(){
        let row = $(this).closest('tr');

        let id = row.find('.id').text();
        let name = row.find('.name').val();
        
        $.ajax({
            type: "PUT",
            url: "/products/" + id,
            data: {
                name: name
            },
            success: function (response) {
                //console.log(response);

                $('#getProducts').click();
            }
        });

    });

    $('table').on('click', '.delete-button', function(){
        let row = $(this).closest('tr');

        let id = row.find('.id').text();
        
        $.ajax({
            type: "DELETE",
            url: "/products/" + id,
            data: {
                id: id
            },
            success: function (response) {
                //console.log(response);
                
                $('#getProducts').click();
            }
        });

    });
});