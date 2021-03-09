$(document).ready(function () {
  $('#form').on('submit', function (e) {
    e.preventDefault();
    const inputs = $('input');
    let data = { username: inputs[0].value, password: inputs[1].value };
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/post',
      data,
      success: function (data) {
        alertHandler(data);
      },
      error: function (Request, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });
  });

  function alertHandler(status) {
    switch (status) {
      case 'success':
        makeAlert('success', 'شما با موفقیت وارد شدید ');
        break;
      case 'wrongpassword':
        makeAlert('danger', 'رمز عبور شما اشتباه است');
        break;
      case 'usernotfound':
        makeAlert('danger', 'کاربری با این نام کاربری پیدا نشد');
        break;
      case 'emptyfield':
        makeAlert('warning', 'لطفا فیلدهای خالی را به درستی پر کنید');
        break;
    }
  }

  function makeAlert(error, message) {
    $('#alert').empty();
    let errorData = `
        <div class="alert alert-${error} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close p-0" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    return $('#alert').append(errorData);
  }

  //end
});
