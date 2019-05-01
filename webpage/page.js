// 下拉菜单
var dropDown = function () {
    var container = e('#id-div-container')
    // 鼠标移入该类别  则显示相应菜单
    container.addEventListener('mouseover', function(event) {
        // log('鼠标移入container')
        var self = event.path[1]
        var index = self.dataset.index
        var Selector = '#id-list-' + String(index)
        var list = e(Selector)
        list.classList.add('mao')

    })
    container.addEventListener('mouseout', function(event) {
        // log('鼠标移开container')
        var self = event.path[1]
        var index = self.dataset.index
        var Selector = '#id-list-' + String(index)
        var list = e(Selector)
        list.classList.remove('mao')

    })
    //鼠标移入菜单 该类别样式保持
    var maoList = es('.mao-list')
    for (let i = 0; i < maoList.length; i++) {
        maoList[i].addEventListener('mouseover', function(event) {
            // log('in',i)
            maoList[i].classList.add('mao')
            container.classList.add('mao')
            var Selector = '#mao-list-' + String(i)
            var s = e(Selector)
            // log(s)
            s.classList.add('active')
        })
        maoList[i].addEventListener('mouseout', function(event) {
            // log('out',i)
            maoList[i].classList.remove('mao')
            container.classList.remove('mao')
            removeClassAll('active')
        })
    }
}

// 检查时间位数
var checkTime = function (s) {
    if (s < 10) {
        s = '0' + s
    }
        return s
}
// 时钟和倒计时
var showTime = function() {
    nowtime = new Date()
    var year = nowtime.getFullYear()
    var month = checkTime(nowtime.getMonth() + 1)
    var date = checkTime(nowtime.getDate())
    var hours = checkTime(nowtime.getHours())
    var minutes = checkTime(nowtime.getMinutes())
    var seconds = checkTime(nowtime.getSeconds())
    e('#clock').innerText = hours + ':' + minutes
    e('#myDate').innerText = year + ' 年 ' + month + ' 月 ' + date + ' 日'
    // 到指定日期剩余的时间
    var endtime = new Date("2020/1/1,0:0:0")
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime())/1000)
    var d = parseInt(lefttime/3600/24)
    var h = parseInt((lefttime/3600)%24)
    var hh = checkTime(h)
    var m = parseInt((lefttime/60)%60)
    var mm = checkTime(m)
    var s = parseInt(lefttime%60)
    var ss = checkTime(s)
    e('#leftTime').innerText = '今年还剩 ' + d + ' 天 ' + hh + ' 小时 ' + mm + ' 分 ' + ss + ' 秒'
}
// picture
var bigPicture = function() {
    var smalls = es('.small')
    var popup = e('.mao-popup')
    var big = e('.big')
    // log('***',big.src)
    for (var i = 0; i < smalls.length; i++) {
        var s = smalls[i]
        s.addEventListener('click', function(event) {
            big.src = this.src
            popup.classList.toggle('mao')
        })
    }
    popup.addEventListener('click', function(event) {
        // log('dianjidatu')
        popup.classList.toggle('mao')
    })
}
// 轮播图
var showImageAtIndex = function(slide, index) {
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'gua-active'
    removeClassAll(className)
    // 得到下一张图片的选择器
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    var img = e(nextSelector)
    img.classList.add(className)
    // 切换小圆点
    // 1, 删除当前的小圆点的 class
    removeClassAll('gua-white')
    // 2, 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('gua-white')
}

var nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    // 因为得到的是 string 所以用 parseInt 转成 number
    // 也可以用 Number() 函数来转
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    // 求出下一张图片的 id
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event){
        console.log('click next')
        var button = event.target
        // 找到 slide div
        var slide = button.parentElement
        // log('click slide', )
        // 求出 button 的 data-offset
        // 上一张按钮的 offset 是 -1
        // 下一张按钮的 offset 是 1
        var offset = parseInt(button.dataset.offset)
        // 求出下一个图片的 index
        var index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

var bindEventIndicator = function() {
    var selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event){
        log('indi 小圆点')
        var self = event.target
        var index = parseInt(self.dataset.index)
        log('index', index)
        // 得到 slide
        var slide = self.closest('.gua-slide')
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.gua-slide')
    // 求出下一个图片的 index
    var index = nextIndex(slide, 1)
    // 显示下一张图片
    showImageAtIndex(slide, index)
}

var autoPlay = function() {
    var interval = 6000
    setInterval(function(){
        // 每 3s 都会调用这个函数
        playNextImage()
    }, interval)
}

var __main = function() {
    dropDown()
    showTime()

    setInterval("showTime()",1000)
    bigPicture()
    bindEventSlide()
    bindEventIndicator()
    autoPlay()
}

__main()
