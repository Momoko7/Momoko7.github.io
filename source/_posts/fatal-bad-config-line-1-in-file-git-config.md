---
title: '解决 fatal: bad config line 1 in file .git/config'
toc: true
date: 2018-05-13 18:47:23
tags:
        - git
        - 博客
        - hexo
---
> 电脑蓝屏重启之后 hexo -d 报错：fatal: bad config line 1 in file .git/config

<!--more-->

## 出现问题
![截图](/assets/blogImg/180513-1.png)

## 解决方案
出现这个问题 是因为`.git/config`文件里的内容被篡改了
在这里....
![截图](/assets/blogImg/180513-2.png)
我的文件打开是这样的：
![截图](/assets/blogImg/180513-3.png)
导致我一直以为是打开方式不对...  但其实这就是内容...
一般被篡改的是remote和merge两行  改成对的就行了：

    remote = https://github.com/username/username.github.io
    merge = refs/heads/master
    
介于我的这个奇葩文件 当然是要该全部内容啦
整个文件内容(别忘了把用户名改成自己的)：
```
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[branch "master"]
	remote = git@github.com:Momoko7/Momoko7.github.io.git
	merge = refs/heads/master
```

写改好了记得clean之后再提交
    
    $ hexo clean



   

