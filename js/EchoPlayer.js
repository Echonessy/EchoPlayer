/*****************************EchoPlayer*****Creat By Echonessy  2017.06.13*******************************/
/*****************************congfig参数说明****************************/
//'ele ':绑定的DOM  例如 .app  #app
//'ClassPrefix ':自定义播放器的标识类名 例如 .EchoPlayer-Play 自定义播放器的标识类名注意同时启用多个播放器的时候类名不要重复
//ClassPrefixPosition:'fixed'//自定义播放器的布局方式fixed 特殊 默认auto
//Defultcss:true :是否启用默认播放器样式
//注意：Chrome浏览器针对audio 设置currentTime始终为0，是因为服务器导致的，建议测试采用线上音频链接或者配置nginx、Apache等服务代理
window.EchoPlayer = (function () {
    var InitPlayer = function () {};
    InitPlayer.prototype = {
        config: function (params) {
            //创建css 若要自定义样式可以不启用
            if(params.Defultcss){
                this.CreatCss(params)
            }
            //替换Html
            this.CreatHtml(params);
        },
        //检测音频文件是否支持
        FileSupport:function (params) {
            //判断对象是否为空
            function isEmptyObject(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            }
            this.ele=document.querySelector(params.ele)
            this.fileType=this.ele.getAttribute('src').split('.')[1].toLowerCase();
            this.Support=false;
            //检测项目
            this.Detection='audio/'+this.fileType+';';
            if(!isEmptyObject(this.ele.canPlayType(this.Detection))){
                this.Support=true;
            }
            return this.Support;
        },
        //检测音频文件是否有
        CheckAudioFile:function (params) {
            this.Defult=false;//判断链接是否含有
            //判断对象是否为空
            function isEmptyObject(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            }
            this.ele=document.querySelector(params.ele)
            this.file=this.ele.getAttribute('src');
            if(!isEmptyObject(this.file)){
                if(this.FileSupport(params)){
                    this.Defult=true;
                }
            }
            return this.Defult;
        },
        //类名重置
        ClassNameReset:function (params) {
            //固定类名
            this.ClassPrefix=params.ClassPrefix;
            //存放最终的类名
            var cssClass= {};
            //存放单个模块
            var cssClassSub = {
                    Pause:'Pause',
                    Play:'Play',
                    PlayBtn:'PlayBtn',
                    BarBox:'BarBox',
                    LoadBar:'LoadBar',
                    TimeBox:'TimeBox',
                    DurationTime:'DurationTime',
                    TotalTime:'TotalTime',
                    Volume:'Volume',
                    VolumeBarBox:'Volume-BarBox',
                    VolumeLoadBar:'Volume-LoadBar',
                    VolumeMute:'Volume-Mute',
                    VolumeAdjust:'Volume-Adjust',
                    VolumeBtn:'VolumeBtn',
            };
            for( var ClassName in cssClassSub ){
                cssClass[ ClassName ]=this.ClassPrefix+'-'+ cssClassSub[ ClassName ];
            }
            return cssClass;
        },
        //创建Css
        CreatCss:function (params) {
            var Class=this.ClassNameReset(params);
            //固定类名
            this.ClassPrefix=params.ClassPrefix;
            this.ClassPosition=params.ClassPrefixPosition//不同布局方式计算方式不同
            console.log(Class)
            var Css='';
            Css+='.'+this.ClassPrefix+'{ width: 800px;height:60px;border-radius: 10px; box-sizing: border-box;padding: 0 30px; background: rgba(0,0,0,0.8);overflow: hidden;margin:80px auto;}';
            if(this.ClassPosition=='fixed'){
                Css+='.'+this.ClassPrefix+'{ position: fixed;top: 0;left: 0;right: 0;bottom: 0;margin: auto;}';
            }
            Css+='.'+Class.Play+'{float: left; width: 30px;height: 30px;background: url("img/playico.png")0 0 no-repeat;cursor: pointer;margin-top: 15px;}';
            Css+='.'+Class.Pause+'{float: left;width: 30px;height: 30px;background: url("img/pauseico.png")0 0 no-repeat;cursor: pointer;margin-top: 15px;}';
            Css+='.'+Class.BarBox+'{float: left;width: 345px;height: 5px;background: white;margin:28px 20px 0 20px;cursor: pointer;border-radius: 3px;overflow: hidden; }';
            Css+='.'+Class.LoadBar+'{float: left;width: 0%;height: 5px;background: #58C1E4;border-radius: 3px;}';
            Css+='.'+Class.TimeBox+'{width: 90px;float: left;line-height: 60px;font-size: 12px;color: white;margin-right: 45px;}';
            Css+='.'+Class.TimeBox+'>span:nth-child(2){margin: 0 10px;}';
            Css+='.'+Class.Volume+'{float: left;height: 100%;box-sizing: border-box;}';
            Css+='.'+Class.VolumeMute+'{float: left;width: 30px;height: 22px;background: url("img/voicenoico.png")0 0 no-repeat;cursor: pointer;margin-top: 19px;}';
            Css+='.'+Class.VolumeAdjust+'{float: left;width: 30px;height: 22px;background: url("img/voiceico.png")0 0 no-repeat;cursor: pointer;margin-top: 19px;}';
            Css+='.'+Class.VolumeBarBox+'{float: left;width: 145px;height: 5px;background: white;margin:28px 0 0 10px;cursor: pointer;border-radius: 3px;overflow: hidden; }';
            Css+='.'+Class.VolumeLoadBar+'{float: left;width: 50%;height: 5px;background: #58C1E4;border-radius: 3px;}';
            //样式
            this.CreatPreFixCss=document.createElement('style');
            this.CreatPreFixCss.innerHTML=Css;
            document.getElementsByTagName('head')[0].append(this.CreatPreFixCss);
        },
        //创建Html
        CreatHtml:function (params) {
            var Class=this.ClassNameReset(params);
            this.ClassPrefix=params.ClassPrefix;
            this.ele=document.querySelector(params.ele)
            this.file=this.ele.getAttribute('src');
            if(this.CheckAudioFile(params)){
                //截取ele类名字符串
                this.IdName=params.ele;
                if(this.IdName.indexOf('.')!=-1){
                    this.IdName=this.IdName.split('.')[1];
                }else if(this.IdName.indexOf('#')!=-1){
                    this.IdName=this.IdName.split('#')[1];
                }else {

                }
                var $Html='';
                $Html+='<audio src="'+this.file+'" id="'+this.IdName+'" controls style="display: none;"></audio>';
                $Html+='<div class="'+Class.PlayBtn+' '+Class.Pause+'" data-status="pause"></div>';
                $Html+='<div class="'+Class.BarBox+'">';
                $Html+='<p class="'+Class.LoadBar+'"></p>';
                $Html+='</div>';
                $Html+='<div class="'+Class.TimeBox+'">';
                $Html+='<span class="'+Class.DurationTime+'">00:00</span>';
                $Html+='<span>/</span>';
                $Html+='<span class="'+Class.TotalTime+'"> ... </span>';
                $Html+='</div>';
                $Html+='<div class="'+Class.VolumeAdjust+' '+Class.VolumeBtn+'" data-status="normal" title="Volume"></div>';
                $Html+='<div class="'+Class.VolumeBarBox+'">';
                $Html+='<p class="'+Class.VolumeLoadBar+'"></p>';
                $Html+='</div>';
                //音乐播放器主题架构
                this.CreatPreFixDiv=document.createElement('div');
                this.CreatPreFixDiv.className=this.ClassPrefix;
                this.CreatPreFixDiv.innerHTML=$Html;
                //替换当前DOM节点html
                this.ele.parentNode.replaceChild(this.CreatPreFixDiv,this.ele);
                this.DefultConfig(params);//初始化设置
            };
        },
        //兼容IE获取类名
        CompatGetClass:function (parent,classStr,tagName) {
            function hasClass(tagStr,classStr){
                var arr=tagStr.className.split(/\s+/ ); //这个正则表达式是因为class可以有多个,判断是否包含
                for (var i=0;i<arr.length;i++){
                    if (arr[i]==classStr){
                        return true ;
                    }
                }
                return false ;
            }
            if (parent.getElementsByClassName) {
                return parent.getElementsByClassName(classStr)
            }else {
                var nodes = parent.getElementsByTagName(tagName),ret = [];
                for(var i = 0; i < nodes.length; i++) {
                    if(hasClass(nodes[i],classStr)){
                        ret.push(nodes[i])
                    }
                }
                return ret;
            }
        },
        //初始设置
        DefultConfig:function (params) {
            var that=this;
            var Class=this.ClassNameReset(params);//获取类名对象
            this.ele=document.querySelector(params.ele);//播放器
            this.OutParent=this.ele.parentNode;//播放器父元素
            this.Pause=this.CompatGetClass(this.OutParent,Class.Pause,'div')[0];//暂停
            this.Play=this.CompatGetClass(this.OutParent,Class.Play,'div')[0];//播放
            this.PlayBtn=this.CompatGetClass(this.OutParent,Class.PlayBtn,'div')[0];//播放暂停按钮
            this.BarBox=this.CompatGetClass(this.OutParent,Class.BarBox,'div')[0];//时间进度条父元素
            this.LoadBar=this.CompatGetClass(this.OutParent,Class.LoadBar,'p')[0];//时间进度条
            this.TimeBox=this.CompatGetClass(this.OutParent,Class.TimeBox,'div')[0];//时间父元素
            this.DurationTime=this.CompatGetClass(this.OutParent,Class.DurationTime,'span')[0];//当前播放时间
            this.TotalTime=this.CompatGetClass(this.OutParent,Class.TotalTime,'span')[0];//音频总时间
            this.Volume=this.CompatGetClass(this.OutParent,Class.Volume,'div')[0];//音量总时间
            this.VolumeBarBox=this.CompatGetClass(this.OutParent,Class.VolumeBarBox,'div')[0];//音量进度条父元素
            this.VolumeLoadBar=this.CompatGetClass(this.OutParent,Class.VolumeLoadBar,'p')[0];//音量进度条
            this.VolumeMute=this.CompatGetClass(this.OutParent,Class.VolumeMute,'div')[0];//静音
            this.VolumeAdjust=this.CompatGetClass(this.OutParent,Class.VolumeAdjust,'div')[0];//普通音量
            this.VolumeBtn=this.CompatGetClass(this.OutParent,Class.VolumeBtn,'div')[0];//普通音量
            this.Loaded(params);
        },
        //初始化播放器
        Loaded:function (params) {
            var that=this;
            //数据已加载
            this.ele.addEventListener('loadeddata',function () {
                //首先初始化音频的总时间
                that.TotalTime.innerHTML=that.TimeReset(this.duration);
                //点击事件
                that.ClickEvent(params);
            });
            //监听播放
            this.ele.addEventListener( 'timeupdate', function()
            {
                //当前播放时间
                that.DurationTime.innerHTML=(that.TimeReset(this.currentTime))
                //当前时间进度条改变
                that.LoadBar.style.width=(this.currentTime/this.duration)*100+'%';
            });
        },
        //调节进度
        UpDataTime:function (e,params) {
            this.theRealEvent	= e;//鼠标信息
            this.duration=this.ele.duration;//总时间
            this.ClassPosition=params.ClassPrefixPosition//不同布局方式计算方式不同
            if(this.ClassPosition=='fixed'){
                //计算当前鼠标点击的位置是相对于音频是什么播放时间
                this.clickTime=Math.round( (this.duration * ( this.theRealEvent.pageX - (this.BarBox.offsetLeft+this.OutParent.offsetLeft) ) )/(this.BarBox.clientWidth));
            }else {
                //计算当前鼠标点击的位置是相对于音频是什么播放时间
                this.clickTime=Math.round( (this.duration * ( this.theRealEvent.pageX - (this.BarBox.offsetLeft) ) )/(this.BarBox.clientWidth));
            }
            //改变当前播放位置
            this.ele.currentTime =this.clickTime;
            //改变进度时间
            this.DurationTime.innerHTML=this.TimeReset(this.clickTime);
            //改变进度条长度
            this.LoadBar.style.width=(this.clickTime/this.duration)*100+'%';
        },
        //调节音量
        UpDataVolum:function (e,params) {
            var Class=this.ClassNameReset(params);
            this.theRealEvent	= e;//鼠标信息
            this.volume=100;//总音量
            //计算当前鼠标点击的位置是相对于音频是什么播放音量  volum取值0-1
            this.ClassPosition=params.ClassPrefixPosition
            if(this.ClassPosition=='fixed'){
                this.clickvolume=Math.round( (this.volume * ( this.theRealEvent.pageX - (this.VolumeBarBox.offsetLeft+this.OutParent.offsetLeft) ) )/(this.VolumeBarBox.clientWidth))/100;
            }else {
                this.clickvolume=Math.round( (this.volume * ( this.theRealEvent.pageX - (this.VolumeBarBox.offsetLeft) ) )/(this.VolumeBarBox.clientWidth))/100;
            }
            if(this.clickvolume<=0){
                this.VolumeBtn.className=Class.VolumeMute+' '+Class.VolumeBtn;//重置音量按钮
            }else {
                this.VolumeBtn.className=Class.VolumeAdjust+' '+Class.VolumeBtn;//重置音量按钮
            }
            //改变当前播放音量
            this.ele.volume =this.clickvolume;
            //改变进度条长度
            this.VolumeLoadBar.style.width=(this.clickvolume*100/this.volume)*100+'%';
        },
        //点击事件
        ClickEvent:function (params) {
            var that=this;
            //获取类名对象
            var Class=this.ClassNameReset(params);
            //进度调节事件
            this.BarBox.addEventListener('click',function (e) {
                that.UpDataTime(e,params);
            });
            //音量调节事件
            this.VolumeBarBox.addEventListener('click',function (e) {
                that.UpDataVolum(e,params);

            });
            //播放事件
            this.PlayBtn.addEventListener('click',function () {
                var Status=this.getAttribute('data-status');
                if(Status=='playing'){
                    this.className=Class.Pause+' '+Class.PlayBtn;
                    this.setAttribute('data-status','pause');
                    that.ele.pause();
                }else {
                    this.className=Class.Play+' '+Class.PlayBtn;
                    this.setAttribute('data-status','playing');
                    that.ele.play();
                }
            });
            //静音播放事件
            this.VolumeBtn.addEventListener('click',function () {
                var Status=this.getAttribute('data-status');
                if(Status=='normal'){
                    this.className=Class.VolumeMute+' '+Class.VolumeBtn;
                    this.setAttribute('data-status','mute');
                    //静音
                    that.ele.volume=0;
                    //改变进度条长度
                    that.VolumeLoadBar.style.width=0;
                }else {
                    this.className=Class.VolumeAdjust+' '+Class.VolumeBtn;
                    this.setAttribute('data-status','normal');
                    //默认50%音量
                    that.ele.volume=0.5;
                    //改变进度条长度
                    that.VolumeLoadBar.style.width=50+'%';
                }
            });

        },
        //时间格式重置
        TimeReset:function (value) {
            var theTime = parseInt(value);// 秒
            var theTime1 = 0;// 分
            var theTime2 = 0;// 小时
            var Result;//最终时间
            //判断对象是否为空
            function isEmptyObject(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            }
            if(!isEmptyObject(value)){
                Result='00:00';
            }else {
                if(theTime > 60) {
                    theTime1 = parseInt(theTime/60);
                    theTime = parseInt(theTime%60);
                    if(theTime1 > 60) {
                        theTime2 = parseInt(theTime1/60);
                        theTime1 = parseInt(theTime1%60);
                    }
                }
                if(parseInt(theTime)<=9){
                    var Sec = "0"+parseInt(theTime);
                }else {
                    var Sec =parseInt(theTime);
                }
                if(parseInt(theTime1)<=9){
                    var Min = "0"+parseInt(theTime1);
                }else {
                    var Min =parseInt(theTime1);
                }
                if(parseInt(theTime2)<=9){
                    var Hour = "0"+parseInt(theTime2);
                }else {
                    var Hour =parseInt(theTime2);
                }
                if(Hour=='00'||Hour==0){
                    Result=Min+':'+Sec;
                }else {
                    Result=Hour+':'+Min+':'+Sec;
                }
            }
            return Result;
        }
    }
    return InitPlayer;
})()