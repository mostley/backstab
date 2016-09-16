$(document).ready(function() {

  $('.search-query').on('keyup', function(e) {
    if (e.key === 13) {
      $('.search-query-form').submit();
    }
  });

});
