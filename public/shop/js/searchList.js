var content = decodeURI(location.search).split("=")[1]
$(".nav-top input").val(content)

function render() {
  var option = {
    proName: content,
    page: 1,
    pageSize: 1000
  }
  // fa fa-angle-up
  if ($(".now").length > 0) {
    console.log($(".now").children("i"))
    var num = $(".now")
      .children("i")
      .hasClass("fa-angle-down fa")
      ? 2
      : 1
    option[$(".now").data("name")] = num
  }

  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: option,
    success: function(info) {
      $(".content ul").html(template("tpl", info))
    }
  })
}
render()
$("li[data-name]").click(function() {
  if ($(this).hasClass("now")) {
    $(this)
      .children("i")
      .toggleClass("fa fa-angle-down")
      .toggleClass("fa fa-angle-up")
  }

  $(this)
    .addClass("now")
    .siblings()
    .removeClass("now")

  render()
})

//  $(this).addClass('now').siblings().removeClass('now')
// })
// $('[name="num"]').click(function () {

// })

$(".content").on("click", "li", function() {
  location.href = "product.html?id=" + $(this).data("id")
})
