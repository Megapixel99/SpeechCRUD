function submitClicked() {
  $.post('/create/' + $('#name').val(), successSubmit);
}

function successSubmit(data) {
  $('#text').text(data)
}

function readClicked() {
  window.location = "/read"
}

function deleteClicked() {
  window.location = "/delete"
}

function updateClicked() {
  window.location = "/update"
}
