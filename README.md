# EchoPlayer
> this is demo
## Creat By Echonessy  2017.06.13

## congfig参数说明

>'ele ':绑定的DOM  例如 .app  #app <br>
>'ClassPrefix ':自定义播放器的标识类名<br> 例如 .EchoPlayer-Play 自定义播放器的标识类名注意同时启用多个播放器的时候类名不要重复
>ClassPrefixPosition:'fixed'//自定义播放器的布局方式fixed 特殊 默认auto<br>
>Defultcss:true :是否启用默认播放器样式<br>
>注意：Chrome浏览器针对audio 设置currentTime始终为0，<br>
是因为服务器导致的，建议测试采用线上音频链接或者配置nginx、Apache等服务代理<br>
注意：本插件可以同时渲染多个audio标签，<br>并且只要类名没有冲突，各播放器之间毫无冲突，<br>目前只写了点击事件，后续会更新相应的其他事件方法。


``` bash
Html:
<audio src="content/qi_tian.mp3" controls id="audio"></audio>

JS:
var player1=new EchoPlayer();
    player1.config({
        ele: '#audio', //绑定的DOM
        ClassPrefix: 'EchoPlayer', //自定义播放器的标识类名
        Defultcss:true,//是否启用默认播放器样式
        ClassPrefixPosition:'fixed'//自定义播放器的布局方式fixed 特殊 默认auto 可以不填
    })
```
[Demo演示地址]( https://echonessy.github.io/EchoPlayer/)  

## 效果图
![image](https://github.com/Echonessy/EchoPlayer/blob/master/read/1.png)
