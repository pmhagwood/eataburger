// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour-burger").on("click", function(event) {
    var id = $(this).data("id");
    var eatBurger = $(this).data("eatburger");

    var eatenBugerState = {
      eaten: eatBurger
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: eatenBugerState
    }).then(
      function() {
        console.log("changed burger state to", eatBurger);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#add").val().trim(),
    };

    // Send the POST request.
    console.log("new burger is ", newBurger.name);
    console.log("new burger length ", newBurger.name.length);
    if (newBurger.name.length > 0){
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
    } else {
      $(".bottomblock").append('<p class="alert">Please use a valid burger name</p>')
      setTimeout(function () {
        $(".alert").text(' ')
      }, 3000);
    }
  });

});
