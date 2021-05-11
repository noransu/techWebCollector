# TechWebCollector

**基于 Vue3.x Typescript Tailwindcss开发的一款chrome插件。** 

您只需 **选择** 该项目打包好的dist目录，将其添加到chrome的拓展程序中，就可以方便地使用一些常用的技术网址。

---
## 功能特性 | Features 

- [x] 支持将近100个常用的技术网址（对，我写死的 - -
- [x] 可通过input**筛选、过滤**想要的网址
- [x] 可缓存6个最近筛选过的常用网址
- [x] 支持读取自己的书签（降维到一维
- [x] 支持快捷键调用

## 如何使用 | How to use 

1. 点击chrome浏览器右上角（自定义与控制chrome）在如下的页面中选择更多工具 。

   ![](https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.57x6k8yaj400.png)

  <br>

2. 选择拓展程序 。

   ![](https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.792zuqj3gog0.png)

  <br>

3. 将开发者模式打开并点击加载已解压的拓展程序，加载该项目中dist目录。

![](https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.3xxpg98enw80.png)

  <br>

4. 普通使用。

   - 分为一级目录以及二级目录。

   - 点击对应目录下的项目可以在当前的浏览器跳转到对应的网页（跟普通的书签没有区别 - -

     ![](https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/use.1e4gtm55o0rk.gif)

  <br>

5. 筛选。

   - 点击输入框进入筛选，可匹配所有最后一层的链接。

   - 点击过滤后的链接将会被视为常用链接保存起来，最多可保存6个常用链接
   
    ![](https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/filter.71m39lqglak0.gif)

  <br>

## 热键映射 | Keymap

- 默认的调起插件热键是  `Alt + O`( windows系统: `Alt + O`，默认的热键为: `Ctrl + E`)
- 在调起插件的情况下按下热键`Alt + F`( windows系统: `Alt + F`，默认的热键为: `Ctrl + Shift + F`)
- 如果它与你的其他软件的热键冲突，你可以自己修改它：(在浏览器中键入该地址进行修改：chrome://extensions/shortcuts)

## 注意 | Cautions

- clone下来之后只需要加载**dist**文件夹就可以了，不需要在添加拓展那里添加整个项目
- 因为chrome的安全策略，所以新开空白页面时无法调用插件中的一些方法，所以在最新的版本中已经进行了相关处理，即只有非空白页面才能使用。
- 本人是Mac操作系统，所有的热键仅在mac系统上进行过相应的操作，不能保证热键在其他系统生效，如果确实没有生效，欢迎大家通过提issue或者私信告知。

## 贡献 | Contribution

欢迎各种形式的贡献
