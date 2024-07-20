#### 一、研究Pic_Go的插件机制

0、installPlugin下载插件
1、sendToMain向主进程发送installPlugin事件, 并将插件名作为参数
2、主进程接收这个事件, 安装这个插件picgo.pluginHandler.install([fullName])
3、安装成功返回

```json
{ "success": true, "body": ["picgo-plugin-autobackup"] }
```

4、注册shortKey
registerPluginShortKey
获取plugin
let plugin = picgo.pluginLoader.getPlugin(pluginName)

```json
{
  register: [Function: register],
  config: [Function: pluginConfig],
  guiMenu: [Function: guiMenu],
  beforeUploadPlugins: 'autobackup',
  afterUploadPlugins: 'autobackup'
}
```

如果有commands属性就注册

5、安装bilibili插件会发生什么事情

6、生命周期的概念

#### 二、创建存放目录

用户目录/.应用名/plugins/plugins1
用户目录/.应用名/plugins/plugins2

#### 三、可拓展的Workbench

1、Activity Bar, Side Bar, Panel, Editor Group, Status Bar

2、工作区、每个拓展都有setting.json

3、command命令系统、extension拓展配置

4、 配置

5、储存, 分级别

6、交互
git也是一个extension
statusBarItem

7、vscode.window
createStatusBarItem、createStatusBarItem、showQuickPick、showInformationMessage、
还有terminal、editor、editor
还有樹狀選單、webview、output、
Variable、Event、Function
需要插件类的元件——TreeView、WebView

8、事件发射器

9、OUTPUT 输出插件信息

10、webview
静态资源加载规则

11、Color Theme
