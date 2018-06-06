---
title: 笔记-Linux常用命令
toc: true
date: 2018-05-05 22:54:44
tags:
    - Linux
    - 笔记
---
## Linux常用命令 (2018-06-06)更新

<!--more-->
用一个 记一个

# 一、关于nginx的停止与重启
## 停止
### 从容停止
1.查看进程号

    [...]# ps -ef|grep nginx
    root     17972     1  0 16:49 ?        00:00:00 nginx: master process nginx
    nginx    17978 17972  0 16:50 ?        00:00:00 nginx: worker process
    root     17981 11611  0 16:50 pts/0    00:00:00 grep nginx

2.杀死进程

    [...]# kill -OUIT 17972

### 快速停止
1.查看进程号
    
    [...]# ps -ef|grep nginx
    root     17972     1  0 16:49 ?        00:00:00 nginx: master process nginx
    nginx    17978 17972  0 16:50 ?        00:00:00 nginx: worker process
    root     17981 11611  0 16:50 pts/0    00:00:00 grep nginx
2.杀死进程

    [...]# kill -TERM 2132
or

    [...]# kill -INT 2132

### 强制停止
    [...]# pkill -9 nginx


## 重启
    [...]# nginx -s reload

# 二、centOS6.5关闭防火墙
关闭防火墙的步骤
1.关闭命令

    [...]# service iptables stop 
2.永久关闭防火墙

    [...]# chkconfig iptables off
    
3.查看防火墙状态

    [...]# service iptables status
    
## centos的关机与重启
1.shutdown -h now    #立即关机
2.shutdown -h 10     #十分钟后关机
3.shutdown -h 10:10  #十点十分关机
4.shutdown -r now    #立即重启
5.shutdown -r 10     #十分钟后重启
6.shutdown -r 10:10  #十点十分重启
5.rebut              #重启
5.halt               #关机
