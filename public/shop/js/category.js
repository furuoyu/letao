
$.ajax({
  type:'get',
  url : '/category/queryTopCategory',
  success : function (info) {
  //  window.info1 = info
    $('.left ul').html(template('tpl',info))   
    render(info.rows[0].id)
  }
})

function render (id) {
  $.ajax({
    type:'get',
    url : '/category/querySecondCategory',
    data:{
      id: id
    },
    success : function (info) {
       console.log(info)
       $('.right ul').html(template('tpl1',info))
    }
  })
}

$('.left').on('click','li',function () {
   $('.left li').removeClass('now')
   $(this).addClass('now')
   render($(this).data('id'))
})