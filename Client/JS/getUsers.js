$.get('/read/data', successSubmit);

function successSubmit(data) {
  for (var i = 0; i < data.length; i++) {
    console.log(data[i].Name);
    $('#list').append("<li>" + data[i].Name + "</li>")
  }
}

function deleteClicked() {
  window.location = "/delete"
}

function createClicked() {
  window.location = "/create"
}

function updateClicked() {
  window.location = "/update"
}
