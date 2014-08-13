(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
    $('#recipes').on('click', '.delete', delRecipe);
    $('#categories a').click(filterCategory);
  });

  function hide(){
    $('form').fadeOut();
  }

  function show(){
    $('form').fadeIn();
  }

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action');

    //clearing form
    $('input, textarea').val('');
    hide();

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      var $recipe = $(html);
      $recipe.css('display', 'none');
      $('#recipes').prepend($recipe);
      $recipe.fadeIn();
    }});

    e.preventDefault();
  }

  function delRecipe(){
    var id   = $(this).closest('.recipe').attr('data-recipe-id'),
        type = 'delete',
        url  = '/recipes/' + id;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      $('.recipe[data-recipe-id='+data.id+']').remove();
    }});
  }

  function filterCategory(e){
    console.log('clicked');
    var category = $(this).text();
    $('.recipe .category:contains('+category+')').closest('.recipe').fadeIn();
    $('.recipe .category:not(:contains('+category+'))').closest('.recipe').fadeOut();
    e.preventDefault();
  }

})();

