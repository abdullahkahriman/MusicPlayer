$(function () {
  const slListItem = ".list-item";
  $(document).on("click", `${slListItem} a`, function (e) {
    $(slListItem).removeClass("active");
    $(this).parent().addClass("active");
    return false;
  });
});
