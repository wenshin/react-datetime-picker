# react-datetime-picker
A independent and powerful date time picker for React

# Features

* date time, date, time picker
* no dependencies
* auto detect format. support year, month, date, time mode
* time period


# install

`npm install react-nice-datetime —save`

# Usage

### normal usage

```
import DateTimePicker from 'react-nice-datetime';

<DateTimePicker
  value='1970-01-01'
  limit={min: moment().format('YYYY-MM-DD'), max: moment().format('YYYY-MM-DD')}
/>
```

### Props

**value**: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
支持符合 moment 日期格式的字符串以及 moment 对象。

**format**: PropTypes.string
符合 moment 的时间格式化字符串，可以是 'YYYY年M月DD日'等比较特殊的格式
支持一下几种选择器 YYYY，YYYY-MM， YYYY-MM-DD， YYYY-MM-DD HH，YYYY-MM-DD HH:mm，YYYY-MM-DD HH:mm:ss


**position**: PropTypes.string,
选择器和输入框对齐的位置
值为['top-right', 'top-left','bottom-right', 'bottom-left']

**disabled**: PropTypes.bool,

**onChange**: PropTypes.func.isRequired,

**startOf**: PropTypes.bool,
**endOf**: PropTypes.bool, 如果为 true 会调用 moment().endOf() 来获取当前时间格式的低一级单位的最大值
如格式 YYYY-MM-DD 的日期，得到的 moment 对象实际值为 YYYY-MM-DD 23:59:59
注意：用来在触发日期变更前进行修改日期，startOf 和 endOf 只能二选其一，两个都提供，则只使用 endOf

**limit**: PropTypes.object, 形如 {min, max} 的对象

**className**: PropTypes.string,

**style**: PropTypes.object,

**clearable**: PropTypes.bool，true 表示可以清空日期，默认 true

**inputIconClass**: PropTypes.string
输入框右侧图标样式，例如 'fa fa-calendar'


# ChangeLog

**2017-01-10 v1.0.4**
    * fix weekends highlight bug
    * fix limit not active bug

**2016-11-17 v1.0.3**
    * use a new path for webpack
    * add default period styles

**2016-11-16 v1.0.1**
    * add Period component

**2016-11-07 v1.0.0**
    * first version
