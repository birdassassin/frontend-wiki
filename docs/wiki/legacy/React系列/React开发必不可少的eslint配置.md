#### 项目需要安装的插件

```
&amp;amp;quot;babel-eslint&amp;amp;quot;: &amp;amp;quot;^8.0.3&amp;amp;quot;,
&amp;amp;quot;eslint&amp;amp;quot;: &amp;amp;quot;^4.13.1&amp;amp;quot;,
&amp;amp;quot;eslint-plugin-react&amp;amp;quot;: &amp;amp;quot;^7.5.1&amp;amp;quot;,
```

```
module.exports = {
    &amp;amp;quot;env&amp;amp;quot;: {
        &amp;amp;quot;browser&amp;amp;quot;: true,
        &amp;amp;quot;commonjs&amp;amp;quot;: true,
        &amp;amp;quot;es6&amp;amp;quot;: true
    },
    &amp;amp;quot;extends&amp;amp;quot;: &amp;amp;quot;eslint:recommended&amp;amp;quot;,
    &amp;amp;quot;globals&amp;amp;quot;: {
        &amp;amp;quot;$&amp;amp;quot;: true,
        &amp;amp;quot;process&amp;amp;quot;: true,
        &amp;amp;quot;__dirname&amp;amp;quot;: true
    },
    &amp;amp;quot;parser&amp;amp;quot;: &amp;amp;quot;babel-eslint&amp;amp;quot;,
    &amp;amp;quot;parserOptions&amp;amp;quot;: {
        &amp;amp;quot;ecmaFeatures&amp;amp;quot;: {
            &amp;amp;quot;experimentalObjectRestSpread&amp;amp;quot;: true,
            &amp;amp;quot;jsx&amp;amp;quot;: true
        },
        &amp;amp;quot;sourceType&amp;amp;quot;: &amp;amp;quot;module&amp;amp;quot;,
        &amp;amp;quot;ecmaVersion&amp;amp;quot;: 7
    },
    &amp;amp;quot;plugins&amp;amp;quot;: [
        &amp;amp;quot;react&amp;amp;quot;
    ],
    &amp;amp;quot;rules&amp;amp;quot;: {
        &amp;amp;quot;quotes&amp;amp;quot;: [2, &amp;amp;quot;single&amp;amp;quot;], //单引号
        &amp;amp;quot;no-console&amp;amp;quot;: 0, //不禁用console
        &amp;amp;quot;no-debugger&amp;amp;quot;: 2, //禁用debugger
        &amp;amp;quot;no-var&amp;amp;quot;: 0, //对var警告
        &amp;amp;quot;semi&amp;amp;quot;: 0, //不强制使用分号
        &amp;amp;quot;no-irregular-whitespace&amp;amp;quot;: 0, //不规则的空白不允许
        &amp;amp;quot;no-trailing-spaces&amp;amp;quot;: 1, //一行结束后面有空格就发出警告
        &amp;amp;quot;eol-last&amp;amp;quot;: 0, //文件以单一的换行符结束
        &amp;amp;quot;no-unused-vars&amp;amp;quot;: [2, {&amp;amp;quot;vars&amp;amp;quot;: &amp;amp;quot;all&amp;amp;quot;, &amp;amp;quot;args&amp;amp;quot;: &amp;amp;quot;after-used&amp;amp;quot;}], //不能有声明后未被使用的变量或参数
        &amp;amp;quot;no-underscore-dangle&amp;amp;quot;: 0, //标识符不能以_开头或结尾
        &amp;amp;quot;no-alert&amp;amp;quot;: 2, //禁止使用alert confirm prompt
        &amp;amp;quot;no-lone-blocks&amp;amp;quot;: 0, //禁止不必要的嵌套块
        &amp;amp;quot;no-class-assign&amp;amp;quot;: 2, //禁止给类赋值
        &amp;amp;quot;no-cond-assign&amp;amp;quot;: 2, //禁止在条件表达式中使用赋值语句
        &amp;amp;quot;no-const-assign&amp;amp;quot;: 2, //禁止修改const声明的变量
        &amp;amp;quot;no-delete-var&amp;amp;quot;: 2, //不能对var声明的变量使用delete操作符
        &amp;amp;quot;no-dupe-keys&amp;amp;quot;: 2, //在创建对象字面量时不允许键重复
        &amp;amp;quot;no-duplicate-case&amp;amp;quot;: 2, //switch中的case标签不能重复
        &amp;amp;quot;no-dupe-args&amp;amp;quot;: 2, //函数参数不能重复
        &amp;amp;quot;no-empty&amp;amp;quot;: 2, //块语句中的内容不能为空
        &amp;amp;quot;no-func-assign&amp;amp;quot;: 2, //禁止重复的函数声明
        &amp;amp;quot;no-invalid-this&amp;amp;quot;: 0, //禁止无效的this，只能用在构造器，类，对象字面量
        &amp;amp;quot;no-redeclare&amp;amp;quot;: 2, //禁止重复声明变量
        &amp;amp;quot;no-spaced-func&amp;amp;quot;: 2, //函数调用时 函数名与()之间不能有空格
        &amp;amp;quot;no-this-before-super&amp;amp;quot;: 0, //在调用super()之前不能使用this或super
        &amp;amp;quot;no-undef&amp;amp;quot;: 2, //不能有未定义的变量
        &amp;amp;quot;no-use-before-define&amp;amp;quot;: 2, //未定义前不能使用
        &amp;amp;quot;camelcase&amp;amp;quot;: 0, //强制驼峰法命名
        &amp;amp;quot;jsx-quotes&amp;amp;quot;: [2, &amp;amp;quot;prefer-double&amp;amp;quot;], //强制在JSX属性（jsx-quotes）中一致使用双引号
        &amp;amp;quot;react/display-name&amp;amp;quot;: 0, //防止在React组件定义中丢失displayName
        &amp;amp;quot;react/forbid-prop-types&amp;amp;quot;: [2, {&amp;amp;quot;forbid&amp;amp;quot;: [&amp;amp;quot;any&amp;amp;quot;]}], //禁止某些propTypes
        &amp;amp;quot;react/jsx-boolean-value&amp;amp;quot;: 2, //在JSX中强制布尔属性符号
        &amp;amp;quot;react/jsx-closing-bracket-location&amp;amp;quot;: 1, //在JSX中验证右括号位置
        &amp;amp;quot;react/jsx-curly-spacing&amp;amp;quot;: [2, {&amp;amp;quot;when&amp;amp;quot;: &amp;amp;quot;never&amp;amp;quot;, &amp;amp;quot;children&amp;amp;quot;: true}], //在JSX属性和表达式中加强或禁止大括号内的空格。
        &amp;amp;quot;react/jsx-indent-props&amp;amp;quot;: [2, 4], //验证JSX中的props缩进
        &amp;amp;quot;react/jsx-key&amp;amp;quot;: 2, //在数组或迭代器中验证JSX具有key属性
        &amp;amp;quot;react/jsx-max-props-per-line&amp;amp;quot;: [1, {&amp;amp;quot;maximum&amp;amp;quot;: 1}], // 限制JSX中单行上的props的最大数量
        &amp;amp;quot;react/jsx-no-bind&amp;amp;quot;: 0, //JSX中不允许使用箭头函数和bind
        &amp;amp;quot;react/jsx-no-duplicate-props&amp;amp;quot;: 2, //防止在JSX中重复的props
        &amp;amp;quot;react/jsx-no-literals&amp;amp;quot;: 0, //防止使用未包装的JSX字符串
        &amp;amp;quot;react/jsx-no-undef&amp;amp;quot;: 1, //在JSX中禁止未声明的变量
        &amp;amp;quot;react/jsx-pascal-case&amp;amp;quot;: 0, //为用户定义的JSX组件强制使用PascalCase
        &amp;amp;quot;react/jsx-sort-props&amp;amp;quot;: 2, //强化props按字母排序
        &amp;amp;quot;react/jsx-uses-react&amp;amp;quot;: 1, //防止反应被错误地标记为未使用
        &amp;amp;quot;react/jsx-uses-vars&amp;amp;quot;: 2, //防止在JSX中使用的变量被错误地标记为未使用
        &amp;amp;quot;react/no-danger&amp;amp;quot;: 0, //防止使用危险的JSX属性
        &amp;amp;quot;react/no-did-mount-set-state&amp;amp;quot;: 0, //防止在componentDidMount中使用setState
        &amp;amp;quot;react/no-did-update-set-state&amp;amp;quot;: 1, //防止在componentDidUpdate中使用setState
        &amp;amp;quot;react/no-direct-mutation-state&amp;amp;quot;: 2, //防止this.state的直接变异
        &amp;amp;quot;react/no-multi-comp&amp;amp;quot;: 2, //防止每个文件有多个组件定义
        &amp;amp;quot;react/no-set-state&amp;amp;quot;: 0, //防止使用setState
        &amp;amp;quot;react/no-unknown-property&amp;amp;quot;: 2, //防止使用未知的DOM属性
        &amp;amp;quot;react/prefer-es6-class&amp;amp;quot;: 2, //为React组件强制执行ES5或ES6类
        &amp;amp;quot;react/prop-types&amp;amp;quot;: 0, //防止在React组件定义中丢失props验证
        &amp;amp;quot;react/react-in-jsx-scope&amp;amp;quot;: 2, //使用JSX时防止丢失React
        &amp;amp;quot;react/self-closing-comp&amp;amp;quot;: 0, //防止没有children的组件的额外结束标签
        &amp;amp;quot;react/sort-comp&amp;amp;quot;: 2, //强制组件方法顺序
        &amp;amp;quot;no-extra-boolean-cast&amp;amp;quot;: 0, //禁止不必要的bool转换
        &amp;amp;quot;react/no-array-index-key&amp;amp;quot;: 0, //防止在数组中遍历中使用数组key做索引
        &amp;amp;quot;react/no-deprecated&amp;amp;quot;: 1, //不使用弃用的方法
        &amp;amp;quot;react/jsx-equals-spacing&amp;amp;quot;: 2, //在JSX属性中强制或禁止等号周围的空格
        &amp;amp;quot;no-unreachable&amp;amp;quot;: 1, //不能有无法执行的代码
        &amp;amp;quot;comma-dangle&amp;amp;quot;: 2, //对象字面量项尾不能有逗号
        &amp;amp;quot;no-mixed-spaces-and-tabs&amp;amp;quot;: 0, //禁止混用tab和空格
        &amp;amp;quot;prefer-arrow-callback&amp;amp;quot;: 0, //比较喜欢箭头回调
        &amp;amp;quot;arrow-parens&amp;amp;quot;: 0, //箭头函数用小括号括起来
        &amp;amp;quot;arrow-spacing&amp;amp;quot;: 0 //=&amp;amp;gt;的前/后括号
    },
    &amp;amp;quot;settings&amp;amp;quot;: {
        &amp;amp;quot;import/ignore&amp;amp;quot;: [
            &amp;amp;quot;node_modules&amp;amp;quot;
        ]
    }
};
```
