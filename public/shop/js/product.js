$(function() {
  let id = location.search.split("=")[1]

  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: id
    },
    success: function(info) {
      console.log(info)

      let arr = []
      for (
        let i = +info.size.split("-")[0];
        i <= info.size.split("-")[1];
        i++
      ) {
        arr.push(i)
      }
      info.arr = arr
      $(".main").html(template("tpl", info))
      $(".mui-numbox-input").val("1")
      mui(".mui-slider").slider({
        interval: 5000
      })
      mui(".mui-numbox").numbox()
    }
  })
  $(".main").on("click", ".size span", function() {
    $(this)
      .addClass("color")
      .siblings()
      .removeClass("color")
  })
  $(".btn-add").click(function() {
    let num = $(".mui-numbox-input").val()
    let size = $(".color").text()
    if (!size) {
      mui.toast("请选择尺码")
      return
    }
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        id: id,
        num: num,
        size: size
      },
      success: function(info) {
        if (info.error === 400) {
          location.href = "login.html?form=" + location.href
        }
      }
    })
  })
})
