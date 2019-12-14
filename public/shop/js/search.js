function  render() {
  var history = JSON.parse(localStorage.getItem('history')) || []
  $('.history').html(template('tpl',{'rows':history}))
}
render()

$('.btn-search').click(function () {
  var content = $('.content input').val().trim()
  if(!content){
    mui.toast('输入的内容不能为空')
    return
  }

    var history = JSON.parse(localStorage.getItem('history')) || []
    var index = history.indexOf(content)
    if(index !== -1){
      history.splice(index,1)
    }
    history.unshift(content)
    localStorage.setItem('history',JSON.stringify(history))
    $('.content input').val('')
     location.href = 'searchList.html?key='+ content
})

$('.history').on('click','.delete',function () {
  var index =  $(this).data('index')
  var history = JSON.parse(localStorage.getItem('history'))
  history.splice(index,1)
  localStorage.setItem('history',JSON.stringify(history))
  render()
})

$('.history').on('click','.mui-pull-right',function () {
   localStorage.removeItem('history')
   render()
})