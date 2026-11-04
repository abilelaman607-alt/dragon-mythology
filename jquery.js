jQuery(document).ready(function () {
  // ---------- Task 1: Selectors & Effects ----------
  if ($("#gallery-container").length) {
    $("#gallery-container").fadeIn(1000);
  }

  // ---------- Task 2: Events & Effects ----------
  $("#jq-toggle").click(function () {
    $("#jq-box").slideToggle();
  });

  // ---------- Task 3: Events & DOM Traversal ----------
  $(document)
    .on("mouseover", ".cd", function () {
      $(this).parent().css("box-shadow", "0 0 15px rgba(184, 134, 11, 0.8)");
    })
    .on("mouseout", ".cd", function () {
      $(this).parent().css("box-shadow", "none");
    });
});
