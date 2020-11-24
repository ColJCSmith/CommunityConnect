// On submit of post task form
$("#post-form").on("submit", function (event) {
    event.preventDefault();

    // Get the form data
    const taskData = {
        title: $('#inputTaskTitle').val().trim(),
        description: $('#inputTaskDescription').val().trim(),
        categoryId: $('#categories').children('option:selected').data('id')
    }

    console.log(taskData);

    // Make a post request to add the new task to the database.
    $.post('/api/tasks', taskData).then(function (data) {
        // this bit is for the login section once we have that
        // window.location.replace("members");
    });

    $('#inputTaskTitle').val("");
    $('#inputTaskDescription').val("");
    $('#categories').val("");
})

// Function to populate category list.
function renderCategories() {
    $.get('/api/categories', function (data) {
            console.log(data);
            data.forEach(category => {
                // Create a new option for the selector
                let newOption = $('<option>');
                newOption.attr('data-id', category.id);
                newOption.text(category.name);
                $('#categories').append(newOption);
            });
        }
    );
}

renderCategories();
