$("#form").bootstrapValidator({

  feedbackIcons:{
    valid: 'glyphicon glyphicon-ok-circle',
    invalid: 'glyphicon glyphicon-remove-circle',
    validating: 'glyphicon glyphicon-refresh'
  },

  //对字段的校验
  fields : {
    username:{
      //校验规则
      validators : {
        //空窗口信息
        notEmpty:{
          message : '用户名不能为空'
        },
        //长度要求
        stringLength : {
          min: 3,
          max: 6,
          message: "用户名长度必须是3-6位"
        },
        callback:{
          message: '用户名不存在'
        }
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:'密码不能为空'
        },
        stringLength : {
          min : 6,
          max : 12,
          message : '密码长度必须是6-12位'
        },
        callback:{
          message : '密码错误'
        }
      }
    }
  }
})
  // 2. 进行登录请求
  //    通过 ajax 进行登录请求

  // 表单校验插件有一个特点, 在表单提交的时候进行校验
  // 如果校验成功, 继续提交, 需要阻止这次默认的提交, 通过 ajax 进行请求提交
  // 如果校验失败, 默认会阻止提交
$('#form').on('success.form.bv',function (e) {
   e.preventDefault()
   $.ajax({
     type:'post',
     url:'/employee/employeeLogin',
     data:$('#form').serialize(),
     success : function (info) {
       console.log(info)
       if(info.success){
         location.href = 'index.html'
       } else if (info.error === 1000){
        $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
       } else {
          // updateStatus
          // 参数1: 字段名称
          // 参数2: 校验状态
          // 参数3: 校验规则, 可以设置提示文本
        $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")

       }
     }
   })
})


$('[type="reset"]').click(function(){
  $('#form').data("bootstrapValidator").resetForm(true);
})
