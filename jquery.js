// gallery
jQuery(document).ready(function () {
  // Show the gallery slowly (1 second) if it is on the page.
  if ($("#gallery-container").length) {
    $("#gallery-container").fadeIn(1000);
  }
  // Open or close #jq-box slowly on button click.
  $("#jq-toggle").click(function () {
    $("#jq-box").slideToggle();
  });

  // ИСПРАВЛЕНИЕ ГЛЮКА: используем mouseenter/mouseleave и $(this) вместо parent()
  $(document)
    .on("mouseenter", ".cd", function () {
      $(this).css("box-shadow", "0 0 15px rgba(184, 134, 11, 0.8)");
    })
    .on("mouseleave", ".cd", function () {
      $(this).css("box-shadow", "none");
    });
});
