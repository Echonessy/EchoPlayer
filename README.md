# EchoPlayer
> this is demo
## Creat By Echonessy  2017.06.13
``` bash
/*****************************congfig参数说明****************************/ 
//'ele ':绑定的DOM  例如 .app  #app
//'ClassPrefix ':自定义播放器的标识类名 例如 .EchoPlayer-Play 自定义播放器的标识类名注意同时启用多个播放器的时候类名不要重复
//ClassPrefixPosition:'fixed'//自定义播放器的布局方式fixed 特殊 默认auto
//Defultcss:true :是否启用默认播放器样式
//注意：Chrome浏览器针对audio 设置currentTime始终为0，
是因为服务器导致的，建议测试采用线上音频链接或者配置nginx、Apache等服务代理

注意：本插件可以同时渲染多个audio标签，并且只要类名没有冲突，各播放器之间毫无冲突，目前只写了点击事件，后续会更新相应的其他事件方法。

用法
可以使用默认的播放器样式，也可以自己根据结构编写
```

``` bash
css:
.Test{ width: 800px;height:60px;border-radius: 10px; box-sizing: border-box;padding: 0 30px; background: rgba(25,20,105,0.8);overflow: hidden;margin:80px auto;}
.Test-Play{float: left; width: 30px;height: 30px;background: url("../img/playico.png")0 0 no-repeat;cursor: pointer;margin-top: 15px;}
.Test-Pause{float: left;width: 30px;height: 30px;background: url("../img/pauseico.png")0 0 no-repeat;cursor: pointer;margin-top: 15px;}
.Test-BarBox{float: left;width: 345px;height: 5px;background: white;margin:28px 20px 0 20px;cursor: pointer;border-radius: 3px;overflow: hidden; }
.Test-LoadBar{float: left;width: 0%;height: 5px;background: #656914;border-radius: 3px;}
.Test-TimeBox{width: 90px;float: left;line-height: 60px;font-size: 12px;color: white;margin-right: 45px;}
.Test-TimeBox>span:nth-child(2){margin: 0 10px;}
.Test-Volume{float: left;height: 100%;box-sizing: border-box;}
.Test-Volume-Mute{float: left;width: 30px;height: 22px;background: url("../img/voicenoico.png")0 0 no-repeat;cursor: pointer;margin-top: 19px;}
.Test-Volume-Adjust{float: left;width: 30px;height: 22px;background: url("../img/voiceico.png")0 0 no-repeat;cursor: pointer;margin-top: 19px;}
.Test-Volume-BarBox{float: left;width: 145px;height: 5px;background: white;margin:28px 0 0 10px;cursor: pointer;border-radius: 3px;overflow: hidden; }
.Test-Volume-LoadBar{float: left;width: 50%;height: 5px;background: #656914;border-radius: 3px;}


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


## 效果图
![image](https://github.com/Echonessy/EchoPlayer/blob/master/read/1.png)
