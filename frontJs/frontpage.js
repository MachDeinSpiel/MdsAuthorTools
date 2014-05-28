$( document ).ready(function() {
    console.log( "ready!" );

    {

    $('#top-menu-bar li:has(ul)').hover(
      function () { //appearing on hover
        $('ul', this).fadeIn();
      },
      function () { //disappearing on hover
        $('ul', this).fadeOut();
      }
    );
  }
});