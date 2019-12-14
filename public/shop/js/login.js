$(".mui-btn-primary").click(function() {
  let user = $(".mui-input-clear")
    .val()
    .trim()
  let password = $(".mui-input-password")
    .val()
    .trim()
  if (!user) {
    mui.toast("请输入用户名")
    return
  }
  if (!password) {
    mui.toast("请输入密码")
    return
  }
  $.ajax({
    type: "post",
    url: "/user/login",
    data: {
      username: user,
      password: password
    },
    success: function(info) {
      if (info.success) {
        if (location.search.indexOf("?from") !== -1) {
          location.href = location.href.split("?from=")[1]
        } else {
          location.href = "index.html"
        }
      } else {
        mui.toast(info.message)
      }
    }
  })
})
