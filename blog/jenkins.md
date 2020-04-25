# 持续部署jenkins 
 ![nodeJS](/Jenkins/jenkinsList.png)
### 一、安装jenkins 安装步骤请看[jenkens官网](https://jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/#fork-sample-repository)
   1、安装JDK
   
      yum install -y java
   2、 安装jenkins
   
       1 wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
       2 rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key
       3 yum install -y jenkins
   如果不能安装就到官网下载jenkis的rmp包，官网地址（http://pkg.jenkins-ci.org/redhat-stable/）
   
       1 wget http://pkg.jenkins-ci.org/redhat-stable/jenkins-2.7.3-1.1.noarch.rpm
       2 rpm -ivh jenkins-2.7.3-1.1.noarch.rpm
       
   配置jenkis的端口
   
    vi /etc/sysconfig/jenkins
   
   找到修改端口号：
  
   JENKINS_PORT="8080"  此端口不冲突可以不修改 
   
   3、启动jenkins
   
    service jenkins start/stop/restart
    
  :::tip
   安装成功后Jenkins将作为一个守护进程随系统启动 
   
   系统会创建一个“jenkins”用户来允许这个服务，如果改变服务所有者，同时需要修改/var/log/jenkins, /var/lib/jenkins, 和/var/cache/jenkins的所有者 
   
   启动的时候将从/etc/sysconfig/jenkins获取配置参数 
   
   默认情况下，Jenkins运行在8080端口，在浏览器中直接访问该端进行服务配置 
   
   Jenkins的RPM仓库配置被加到/etc/yum.repos.d/jenkins.repo 
  :::
   
   4、打开jenkins 
   
   在浏览器中访问 
   首次进入会要求输入初始密码如下图， 
   初始密码在：/var/lib/jenkins/secrets/initialAdminPassword 
   66ccf7466b1d4bfdaefbc1113470a4e2
    
### 二、 jenkins相关插件的安装
    
##### 1、安装nodeJS插件 用于项目打包

   打开 *系统管理* -- *插件管理* -- 点击 *Available* -- 搜索 NodeJS Plugin  然后勾选安装
   
   打开 *系统管理* --*全局工具配置*   拉到底部 配置  node 版本，如图：
   
   ![nodeJS](/Jenkins/nodeJS.jpg)
      
  ::: warning
   node 使用13.1.0 版本 如需其他版本自行安装
  :::
##### 2、 配置远程链接
       
   打开 *系统管理* -- *系统设置*  找到 “Publish over SSH” 项 ，我这里远程服务器用的是ssh登录，通过ppk密钥进行连接，所以我的配置如图，如果是帐号密码登录的Passphrase填写密码Username填写用户名，path to key 为空就可以了。
   
   ![nodeJS](/Jenkins/ssh1.png)
   
  ::: tip
   获取私钥key值 cat XXX.pem
  :::
   点击 Test Configuration 按钮测试连接是否成功
   
   ![nodeJS](/public/Jenkins/ssh2.png)
   

::: tip
 前端配置项:  
 开发： web-dev  
 测试： web-ft  
 项目根目录： /usr/local/nginx 
:::

### 三、 配置自动部署任务

##### 1、新建任务：点击 *新建* --填写任务名称，选择*构建一个自由风格的软件项目*然后保存，如图：

![nodeJS](/Jenkins/newJob1.png)

##### 2、配置git，进入任务配置，选择源码管理 ，我这里是git下载项目，所以选择 git ，因为是开源的，所以没有填写账号密码，如图

![nodeJS](/Jenkins/newJob2.png)

##### 3、设置构建环境，选择 Provide Node & npm bin/ folder to PATH  然后选择之前安装插件时候配置的node版本，如图

![nodeJS](/Jenkins/newJob3.png)

##### 4、配置项目自动化打包，选择 增加构建步骤 ---Excute shell  这个是运行相关的sh命令

```js{4}
   echo $PATH // 进入项目目录
   npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver 
   npm install 
   npm run build 
   cd dist 
   rm -rf build.tar.gz  // 删除上次打包的压缩文件
   tar -zcvf build.tar.gz *  // 把生成的项目打包成build 方便传输到远程服务器
   cd ../ 
```

![nodeJS](/Jenkins/newJob4.png)

##### 5、把打包好的项目文件发布到远程服务器

 选择 *Add build step*  --- *Send build artifacts over SSH* 
 
 ![nodeJS](/Jenkins/newJob5.png)
 
 ::: tip  
 Name：第三步创建的远程服务器名称   
 Source files：本地需要传输过去的文件路径  
 Remove prefix：过滤掉的目录名  
 Remote directory：远程服务器的保存路径  
 Exec command：传输完成后在远程服务器执行的sh命令  
 :::

![nodeJS](/Jenkins/newJob6.png)

```js{4}
    cd /usr/local/nginx/cms // 进入前端项目目录
    tar -zxvf build.tar.gz -C dms // 将build压缩包文件解压到dms目录
    rm -rf build.tar.gz // 删除压缩包
```

##### 6、保存并构建&持续部署

![nodeJS](/public/Jenkins/newJob7.png)

##### 7、 注意是事项

::: danger
1、访问403 目录权限不够 在服务器上执行 chmod -R 755 /usr/local/nginx/cms

2、 nodeJS插件安装不上可以下载node的.hpi文件 之后安装或重启
:::

![nodeJS](/Jenkins/newJob8.png)

