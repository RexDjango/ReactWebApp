$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $("#nav-side-menu").toggleClass(
      "d-none d-sm-inline d-md-inline d-lg-inline d-xl-inline"
    );
  });
});

$(document).ready(function () {
  $("#summernote").summernote();
});
