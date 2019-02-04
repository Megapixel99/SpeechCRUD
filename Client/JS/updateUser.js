function updateClicked() {
  if (!$('#name').val()) {
    $('#text').text("Please enter a name.")
  } else if (!$('#newname').val()) {
    $('#text').text("Please enter a new name.")
  } else {
    $.ajax({
      url: '/update/' + $('#name').val() + "/" + $('#newname').val(),
      type: 'PUT',
      success: function(data) {
        $('#text').text(data)
      }
    });
  }
}

function readClicked() {
  window.location = "/read"
}

function createClicked() {
  window.location = "/create"
}

function deleteClicked() {
  window.location = "/delete"
}
