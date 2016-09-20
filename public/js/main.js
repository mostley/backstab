$(document).ready(function() {

  $('.search-query').on('keyup', function(e) {
    if (e.key === 13) {
      $('.search-query-form').submit();
    }
  });

  $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
      event.preventDefault();
      $(this).ekkoLightbox();
  });

  document.cookie='resolution='+Math.max(screen.width,screen.height)+("devicePixelRatio" in window ? ","+devicePixelRatio : ",1")+'; path=/';
});
