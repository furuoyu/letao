
//隐藏事件
$('.glyphicon-align-justify').on('click', function () {
  $('.nav-left, .main').toggleClass('now')
  $('.nav-top').toggleClass('move')
})
//推出模态框
$('.glyphicon-log-out').on('click', function () {
  $('.outmodal').modal('show')

})
//推出事件
$('.outbtn').on('click', function () {
  $.ajax({
    type: 'get',
    url: '/employee/employeeLogout',
    success: function (info) {
      if (info.success) {
        location.href = 'login.html'
      }
    }
  })
})

$('.category').click(function() {
  $('.child').slideToggle()

})

 
//柱性图
var info = {
  title: '2019年注册人数',
  list: [
    { month: '1月', count: 300 },
    { month: '2月', count: 400 },
    { month: '3月', count: 330 },
    { month: '4月', count: 500 },
    { month: '5月', count: 770 },
    { month: '6月', count: 900 },
    { month: '7月', count: 100 },
    { month: '8月', count: 200 },
    { month: '9月', count: 400 },
    { month: '10月', count: 300 },
    { month: '11月', count: 330 },
    { month: '12月', count: 46 }
  ]
}
var month = []
var count = []
for (var i = 0; i < info.list.length; i++) {
  month.push(info.list[i].month)
  count.push(info.list[i].count)
}
var echars1 = echarts.init(document.querySelector(".echars-1"));

var option1 = {

  title: {
    text: '2017年注册人数'
  },
  tooltip: {},
  legend: {
    data: ['人数']
  },
  xAxis: {
    data: month
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: count
  }]
};
echars1.setOption(option1);

//饼状图
var info2 = {
  title: '热门品牌销售',
  date: '2019年11月',
  list: [
    { brand: '阿迪达斯', count: 222 },
    { brand: '耐克', count: 333 },
    { brand: '新百伦', count: 444 },
    { brand: '特步', count: 543 },
    { brand: '李宁', count: 521 },
    { brand: '乔丹', count: 765 }
  ]
}
var arr = []
for (var i = 0; i < info2.list.length; i++) {
  arr.push({
    name: info2.list[i].brand,

    value: info2.list[i].count
  })
}

var echars2 = echarts.init(document.querySelector(".echars-2"));

option2 = {

  title: {
    text: '热门品牌销售',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },

  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },

  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '品牌',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: arr.sort(function (a, b) { return a.value - b.value; }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },

      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};
echars2.setOption(option2);

// 侧边导航
var lis = document.querySelectorAll('.bar li:not(.category)')
var category = document.querySelector('.category')
var cn = ['.user', '.first', '.second']

// console.log(li)
// var arr = [1,2,3]
//  arr.splice(1,1)
// console.log(arr)
//  ;[].splice.call(li,1,1)
//   console.log(li)
// // console.log(lis)

// $('.bar li').click(function(){
//   $('.main,.user').toggleClass('show')
// })

// $('.category').click(function(){
//   $(this).unbind("click")
//   $('.child').slideToggle()

// })

for (var i = 0; i < lis.length; i++) {
  lis[i].onclick = function () {

    $('.main,.user,.first,.second').removeClass('show')
    //存下标
    for (var i = 0; i < lis.length - 1; i++) {
      lis[i].setAttribute('index', i)
    }
    window.index = this.getAttribute('index')
    //显示
    $(cn[index]).addClass('show')
  }
}


//user
var page = 1
var pageSize = 5
function render() {
  $.ajax({
    type: 'get',
    url: '/user/queryUser',
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function (info) {
      $('.user-tb').html(template('tpl', info))
      $('#page').bootstrapPaginator({
        // 指定bootstrap的版本，如果是3版本必须指定
        bootstrapMajorVersion: 3,
        // 当前页
        currentPage: page,
        // 总页数
        totalPages: Math.ceil(info.total/info.size),
        // 当分页的按钮被点击的时候，会触发的事件, 关注第四个参数： 第几页
        onPageClicked: function (a,b,c,d) {
          page = arguments[3]
          render()
        }
      })
    }
  })
}
render()

$('.user-tb').on('click','.btn-user',function(){
  $('.updatemodal').modal('show')
  window.id = $(this).data('id')
  window.isDelete =  $(this).hasClass('btn-success') ? 1: 0
})
$('.btn-update').click(function() {  
  $.ajax({
    type:'post',
    url:'/user/updateUser',
    data:{
      id:id,
      isDelete:isDelete
    },
    success : function (info) {
      if(info.success){
        render()
        $('.updatemodal').modal('hide')
      }
    }
  })
})

//first
var first_page = 1
var first_pagesize = 3
function first() {
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data:{
      page : first_page,
      pageSize : first_pagesize
    },
    success : function (info) {
       $('.first-tb').html(template('tpl1',info))
       $('#first-page').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        // 当前页
        currentPage: first_page,
        // 总页数
        totalPages: Math.ceil(info.total/info.size),
        // 当按钮被点击的时候触发
        onPageClicked: function(a,b,c,d) {
          first_page = d
          // 重新渲染
          first()
        }
      });
    }
  })
}
first()

$('.btn-add').click(function() {
  $('.addmodal').modal('show')
})

$('form').bootstrapValidator({
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    // 校验分类名字
    categoryName: {
      validators: {
        notEmpty: {
          message: '分类名称不能为空'
        }
      }
    }
  }
})

$('form').on('success.form.bv', function(e) {
  e.preventDefault()
  $.ajax({
    type:'post',
    url : '/category/addTopCategory',
    data:{
      categoryName: $('[name=categoryName]').val()
    },
    success: function (info) {
      if(info.success){
        first()
        $('.addmodal').modal('hide')

      }
    }
  })
})

//second

var second_page = 1
var second_pagesize = 5
$.ajax({
  type:'get',
  url:'/category/querySecondCategoryPaging',
  data:{
    page : second_page,
    pageSize:second_pagesize
  },
  success : function (info) {
    $('#second-tb').html(template('tpl2',info))
  }
})