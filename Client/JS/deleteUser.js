function deleteClicked() {
  $.ajax({
    url: '/delete/' + $('#name').val(),
    type: 'DELETE',
    success: function(data) {
      $('#text').text(data)
    }
  });
}

function readClicked() {
  window.location = "/read"
}

function createClicked() {
  window.location = "/create"
}

function updateClicked() {
  window.location = "/update"
}
