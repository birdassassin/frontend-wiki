#### connect简介

**前方高能预警，有耐心才能看完文章！！**

react-redux仅有2个API，Provider和connect，Provider提供的是一个顶层容器的作用，实现store的上下文传递。

connect方法比较复杂，虽然代码只有368行，但是为redux中常用的功能实现了和react连接的建立。

**一个基础的connect方法如下：**

    connect(mapStateToProps, mapDispatchToProps, mergeProps, options = &#123;&#125;) 

#### 为什么我们需要react-redux？

熟悉redux的人可能知道，redux是数据存储和管理的工具，但是想要在react中使用redux，并不能直接将store、action和react组件建立连接，所以就需要react-redux来结合react和redux。

react-redux文件体积非常小，你完全不需要担心给你的项目带来太多的垃圾代码。

#### 从何处开始解析react-redux源码？

1、在JavaScript中，读懂别人的代码文件，你首先应该看的是函数的入口。

2、找到函数入口，然后看有哪些参数。

3、看看导入了哪些额外的插件，每个插件的作用大概预测一下。

4、进入函数体进行解读。在react插件中解读函数有一个好处，就是react插件大部分都是采用了react组件的写法，你可以在react插件中看到很多react组件的影子。而不是像jQuery那样到处都是扩展性的方法，每个方法都有自己的设计模式，没有统一的规律可循。

#### react-redux使用场景

下面这个官方例子展示了mapStateToProps和mapDispatchToProps的使用方法。

    import * as todoActionCreators from './todoActionCreators'
    import * as counterActionCreators from './counterActionCreators'
    import &#123; bindActionCreators &#125; from 'redux'
    
    function mapStateToProps(state) &#123;
      return &#123; todos: state.todos &#125;
    &#125;
    
    function mapDispatchToProps(dispatch) &#123;
      return &#123;
        todoActions: bindActionCreators(todoActionCreators, dispatch),
        counterActions: bindActionCreators(counterActionCreators, dispatch)
      &#125;
    &#125;
    
    export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)


mergeProps的用法：
    import * as actionCreators from './actionCreators'
    
    function mapStateToProps(state) &#123;
      return &#123; todos: state.todos &#125;
    &#125;
    
    function mergeProps(stateProps, dispatchProps, ownProps) &#123;
      return Object.assign(&#123;&#125;, ownProps, &#123;
        todos: stateProps.todos[ownProps.userId],
        addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
      &#125;)
    &#125;
    
    export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)

#### connect源码解析

**源码有点长，你可以选择性的查看：**

```
import { Component, createElement } from 'react'
import storeShape from '../utils/storeShape'
import shallowEqual from '../utils/shallowEqual'
import wrapActionCreators from '../utils/wrapActionCreators'
import warning from '../utils/warning'
import isPlainObject from 'lodash/isPlainObject'
import hoistStatics from 'hoist-non-react-statics'
import invariant from 'invariant'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })
const defaultMergeProps = (stateProps, dispatchProps, parentProps) => ({
  ...parentProps,
  ...stateProps,
  ...dispatchProps
})

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

let errorObject = { value: null }
function tryCatch(fn, ctx) {
  try {
    return fn.apply(ctx)
  } catch (e) {
    errorObject.value = e
    return errorObject
  }
}

// Helps track hot reloading.
let nextVersion = 0

export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  const finalMergeProps = mergeProps || defaultMergeProps
  const { pure = true, withRef = false } = options
  const checkMergedEquals = pure && finalMergeProps !== defaultMergeProps

  // Helps track hot reloading.
  const version = nextVersion++

  return function wrapWithConnect(WrappedComponent) {
    const connectDisplayName = `Connect(${getDisplayName(WrappedComponent)})`

    function checkStateShape(props, methodName) {
      if (!isPlainObject(props)) {
        warning(
          `${methodName}() in ${connectDisplayName} must return a plain object. ` +
          `Instead received ${props}.`
        )
      }
    }

    function computeMergedProps(stateProps, dispatchProps, parentProps) {
      const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)
      if (process.env.NODE_ENV !== 'production') {
        checkStateShape(mergedProps, 'mergeProps')
      }
      return mergedProps
    }

    class Connect extends Component {
      shouldComponentUpdate() {
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      }

      constructor(props, context) {
        super(props, context)
        this.version = version
        this.store = props.store || context.store

        invariant(this.store,
          `Could not find "store" in either the context or ` +
          `props of "${connectDisplayName}". ` +
          `Either wrap the root component in a <Provider>, ` +
          `or explicitly pass "store" as a prop to "${connectDisplayName}".`
        )

        const storeState = this.store.getState()
        this.state = { storeState }
        this.clearCache()
      }

      computeStateProps(store, props) {
        if (!this.finalMapStateToProps) {
          return this.configureFinalMapState(store, props)
        }

        const state = store.getState()
        const stateProps = this.doStatePropsDependOnOwnProps ?
          this.finalMapStateToProps(state, props) :
          this.finalMapStateToProps(state)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(stateProps, 'mapStateToProps')
        }
        return stateProps
      }

      configureFinalMapState(store, props) {
        const mappedState = mapState(store.getState(), props)
        const isFactory = typeof mappedState === 'function'

        this.finalMapStateToProps = isFactory ? mappedState : mapState
        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1

        if (isFactory) {
          return this.computeStateProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedState, 'mapStateToProps')
        }
        return mappedState
      }

      computeDispatchProps(store, props) {
        if (!this.finalMapDispatchToProps) {
          return this.configureFinalMapDispatch(store, props)
        }

        const { dispatch } = store
        const dispatchProps = this.doDispatchPropsDependOnOwnProps ?
          this.finalMapDispatchToProps(dispatch, props) :
          this.finalMapDispatchToProps(dispatch)

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(dispatchProps, 'mapDispatchToProps')
        }
        return dispatchProps
      }

      configureFinalMapDispatch(store, props) {
        const mappedDispatch = mapDispatch(store.dispatch, props)
        const isFactory = typeof mappedDispatch === 'function'

        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch
        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1

        if (isFactory) {
          return this.computeDispatchProps(store, props)
        }

        if (process.env.NODE_ENV !== 'production') {
          checkStateShape(mappedDispatch, 'mapDispatchToProps')
        }
        return mappedDispatch
      }

      updateStatePropsIfNeeded() {
        const nextStateProps = this.computeStateProps(this.store, this.props)
        if (this.stateProps && shallowEqual(nextStateProps, this.stateProps)) {
          return false
        }

        this.stateProps = nextStateProps
        return true
      }

      updateDispatchPropsIfNeeded() {
        const nextDispatchProps = this.computeDispatchProps(this.store, this.props)
        if (this.dispatchProps && shallowEqual(nextDispatchProps, this.dispatchProps)) {
          return false
        }

        this.dispatchProps = nextDispatchProps
        return true
      }

      updateMergedPropsIfNeeded() {
        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
        if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) {
          return false
        }

        this.mergedProps = nextMergedProps
        return true
      }

      isSubscribed() {
        return typeof this.unsubscribe === 'function'
      }

      trySubscribe() {
        if (shouldSubscribe && !this.unsubscribe) {
          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
          this.handleChange()
        }
      }

      tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe()
          this.unsubscribe = null
        }
      }

      componentDidMount() {
        this.trySubscribe()
      }

      componentWillReceiveProps(nextProps) {
        if (!pure || !shallowEqual(nextProps, this.props)) {
          this.haveOwnPropsChanged = true
        }
      }

      componentWillUnmount() {
        this.tryUnsubscribe()
        this.clearCache()
      }

      clearCache() {
        this.dispatchProps = null
        this.stateProps = null
        this.mergedProps = null
        this.haveOwnPropsChanged = true
        this.hasStoreStateChanged = true
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null
        this.renderedElement = null
        this.finalMapDispatchToProps = null
        this.finalMapStateToProps = null
      }

      handleChange() {
        if (!this.unsubscribe) {
          return
        }

        const storeState = this.store.getState()
        const prevStoreState = this.state.storeState
        if (pure && prevStoreState === storeState) {
          return
        }

        if (pure && !this.doStatePropsDependOnOwnProps) {
          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)
          if (!haveStatePropsChanged) {
            return
          }
          if (haveStatePropsChanged === errorObject) {
            this.statePropsPrecalculationError = errorObject.value
          }
          this.haveStatePropsBeenPrecalculated = true
        }

        this.hasStoreStateChanged = true
        this.setState({ storeState })
      }

      getWrappedInstance() {
        invariant(withRef,
          `To access the wrapped instance, you need to specify ` +
          `{ withRef: true } as the fourth argument of the connect() call.`
        )

        return this.refs.wrappedInstance
      }

      render() {
        const {
          haveOwnPropsChanged,
          hasStoreStateChanged,
          haveStatePropsBeenPrecalculated,
          statePropsPrecalculationError,
          renderedElement
        } = this

        this.haveOwnPropsChanged = false
        this.hasStoreStateChanged = false
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null

        if (statePropsPrecalculationError) {
          throw statePropsPrecalculationError
        }

        let shouldUpdateStateProps = true
        let shouldUpdateDispatchProps = true
        if (pure && renderedElement) {
          shouldUpdateStateProps = hasStoreStateChanged || (
            haveOwnPropsChanged && this.doStatePropsDependOnOwnProps
          )
          shouldUpdateDispatchProps =
            haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps
        }

        let haveStatePropsChanged = false
        let haveDispatchPropsChanged = false
        if (haveStatePropsBeenPrecalculated) {
          haveStatePropsChanged = true
        } else if (shouldUpdateStateProps) {
          haveStatePropsChanged = this.updateStatePropsIfNeeded()
        }
        if (shouldUpdateDispatchProps) {
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
        }

        let haveMergedPropsChanged = true
        if (
          haveStatePropsChanged ||
          haveDispatchPropsChanged ||
          haveOwnPropsChanged
        ) {
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
        } else {
          haveMergedPropsChanged = false
        }

        if (!haveMergedPropsChanged && renderedElement) {
          return renderedElement
        }

        if (withRef) {
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }

        return this.renderedElement
      }
    }

    Connect.displayName = connectDisplayName
    Connect.WrappedComponent = WrappedComponent
    Connect.contextTypes = {
      store: storeShape
    }
    Connect.propTypes = {
      store: storeShape
    }

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        if (this.version === version) {
          return
        }

        // We are hot reloading!
        this.version = version
        this.trySubscribe()
        this.clearCache()
      }
    }

    return hoistStatics(Connect, WrappedComponent)
  }
}

```


我们按照上面介绍的解析步骤来一步步有序的分析源码。

**1、查看函数入口，以及需要传入的参数。**

如果只是看这样一个函数体，我们无法得知每个参数到底是什么？有什么作用？但是，我们可以先结合使用的demo初步了解各个参数的作用。

    export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = &#123;&#125;) &#123;&#125;
    
**mapStateToProps**：传入所有state，返回指定的state数据。

    function mapStateToProps(state) &#123;
          return &#123; todos: state.todos &#125;
        &#125;

**mapDispatchToProps**：传入dispatch，返回使用bindActionCreators()绑定的action方法。我们不再这里讨论bindActionCreators的用法，这个知识将会放到redux解析的文章中。

    function mapDispatchToProps(dispatch) &#123;
      return bindActionCreators(Object.assign(&#123;&#125;, todoActionCreators, counterActionCreators), dispatch)
    &#125;

**mergeProps**：mergeProps如果不指定，则默认返回 Object.assign({}, ownProps, stateProps, dispatchProps)，顾名思义，mergeProps是合并的意思，将state合并后传递给组件。

    function mergeProps(stateProps, dispatchProps, ownProps) &#123;
      return Object.assign(&#123;&#125;, ownProps, &#123;
        todos: stateProps.todos[ownProps.userId],
        addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
      &#125;)
    &#125;

**options**：通过配置项可以更加详细的定义connect的行为，通常只需要执行默认值。

**2、查看导入了哪些插件**

    import &#123; Component, createElement &#125; from 'react'
    import storeShape from '../utils/storeShape'
    import shallowEqual from '../utils/shallowEqual'
    import wrapActionCreators from '../utils/wrapActionCreators'
    import warning from '../utils/warning'
    import isPlainObject from 'lodash/isPlainObject'
    import hoistStatics from 'hoist-non-react-statics'
    import invariant from 'invariant'
    
**react**：使用到了react组件，那么我们可以猜测connect和Provider类似，需要创建一个Connect组件。

**storeShape**：通过了redux常用API的类型验证。

    import PropTypes from 'prop-types'
    export default PropTypes.shape(&#123;
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    &#125;)

**shallowEqual**：这个文件的作用是传入2个对象，首先比较对象是否一致，如果一致，则返回true，如果不一致，则获取2个对象的key数组，判断2个对象key数组的长度是否相等，如果不相等，返回false，如果相等，最后用for循环遍历A对象的key，如果当前的遍历值不存在于B的key中或者A对象的当前key的value不等于B对象的当前key的value，则返回false，如果不属于上面的任何情况，则返回true。（如果认为我这段讲的迷迷糊糊，你也可以自己理解下面的代码。）

    export default function shallowEqual(objA, objB) &#123;
      if (objA === objB) &#123;
        return true
      &#125;
      const keysA = Object.keys(objA)
      const keysB = Object.keys(objB)
      if (keysA.length !== keysB.length) &#123;
        return false
      &#125;
      // 测试A对象的key和B对象的key不一致
      const hasOwn = Object.prototype.hasOwnProperty
      for (let i = 0; i < keysA.length; i++) &#123;
        if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) &#123;
          return false
        &#125;
      &#125;
      return true
    &#125;

hasOwn的作用是判断对象里面是否包含某个属性。这段代码的实际用途是判断下一个props和当前的props是否一致。

    shallowEqual(nextStateProps, this.stateProps)

**wrapActionCreators**：实现了bindActionCreators方法绑定action到组件的操作。

    import &#123; bindActionCreators &#125; from 'redux'
    
    export default function wrapActionCreators(actionCreators) &#123;
      return dispatch => bindActionCreators(actionCreators, dispatch)
    &#125;

函数使用方法

    wrapActionCreators(mapDispatchToProps)

**warning**：在控制台打印warning信息

    export default function warning(message) &#123;
      if (typeof console !== 'undefined' && typeof console.error === 'function') &#123;
        console.error(message)
      &#125;
      try &#123;
        throw new Error(message)
      &#125; catch (e) &#123;&#125;
    &#125;

**lodash/isPlainObject**：检查传入的值是不是纯对象，如果是，返回true，否则返回false。方法详情查看 [lodash之isPlainObject][1]

    function isPlainObject(value) &#123;
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) &#123;
        return false;
      &#125;
      var proto = getPrototype(value);
      if (proto === null) &#123;
        return true;
      &#125;
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    &#125;

**hoist-non-react-statics**：这段代码有点神奇，**REACT_STATICS**是一堆react的常用方法，**KNOWN_STATICS**是函数的一些属性。

    var REACT_STATICS = &#123;
        childContextTypes: true,
        contextTypes: true,
        defaultProps: true,
        displayName: true,
        getDefaultProps: true,
        mixins: true,
        propTypes: true,
        type: true
    &#125;;
    var KNOWN_STATICS = &#123;
        name: true,
        length: true,
        prototype: true,
        caller: true,
        arguments: true,
        arity: true
    &#125;;
    var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
    
    module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) &#123;
        if (typeof sourceComponent !== 'string') &#123; // don't hoist over string (html) components
            var keys = Object.getOwnPropertyNames(sourceComponent);
            if (isGetOwnPropertySymbolsAvailable) &#123;
                keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
            &#125;
    
            for (var i = 0; i < keys.length; ++i) &#123;
                if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) &#123;
                    try &#123;
                        targetComponent[keys[i]] = sourceComponent[keys[i]];
                    &#125; catch (error) &#123;
    
                    &#125;
                &#125;
            &#125;
        &#125;
    
        return targetComponent;
    &#125;;

我们首先从函数入口解读，入口传入了3个参数，**targetComponent**, **sourceComponent**, **customStatics**，首先判断sourceComponent的类型不是一个字符串，然后使用getOwnPropertyNames获取sourceComponent对象的key，返回值是key组成的数组keys。接着判断isGetOwnPropertySymbolsAvailable（肯定是true），如果为true，执行下面的语句：

    keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));

getOwnPropertySymbols和getOwnPropertyNames作用类似，但是**getOwnPropertyNames只是返回字符串类型的key**，而**getOwnPropertySymbols可以返回Symbol类型的key**。然后我们再把2种情况下的key拼接到一个数组里面返回新的keys。

然后执行for语句，遍历keys，如果不包含REACT_STATICS中的react的静态方法，同时不包含KNOWN_STATICS中的属性，同时不存在customStatics（传入函数的第三个参数不存在）或者存在但没有sourceComponent的key，就执行：

    //将sourceComponent的方法写入targetComponent中
    targetComponent[keys[i]] = sourceComponent[keys[i]];

最后返回targetComponent：

    return targetComponent

该方法在connect中的实际作用是：将WrappedComponent内的react静态方法绑定到Connect组件上。

    hoistStatics(Connect, WrappedComponent)

**invariant**：我们看到invariant传入了好几个参数，第一个if语句表示如果不是生产环境，并且format没有定义，就抛出异常。第二个if表示如果condition未定义，同时format未定义，就抛出error，如果condition不存在但format存在，抛出另外的错误。（总结就是一个错误检查机制）

    var NODE_ENV = process.env.NODE_ENV;
    
    var invariant = function(condition, format, a, b, c, d, e, f) &#123;
      if (NODE_ENV !== 'production') &#123;
        if (format === undefined) &#123;
          throw new Error('invariant requires an error message argument');
        &#125;
      &#125;
    
      if (!condition) &#123;
        var error;
        if (format === undefined) &#123;
          error = new Error(
            'Minified exception occurred; use the non-minified dev environment ' +
            'for the full error message and additional helpful warnings.'
          );
        &#125; else &#123;
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(
            format.replace(/%s/g, function() &#123; return args[argIndex++]; &#125;)
          );
          error.name = 'Invariant Violation';
        &#125;
    
        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
      &#125;

    &#125;;
    
    module.exports = invariant;

该方法实际用途：检查store是否存在

    invariant(this.store,
              `Could not find "store" in either the context or ` +
              `props of "$&#123;connectDisplayName&#125;". ` +
              `Either wrap the root component in a &lt;Provider&gt;, ` +
              `or explicitly pass "store" as a prop to "$&#123;connectDisplayName&#125;".`
            )

**3、定义几个参数默认值常量**

当你没有给组件绑定state和dispatch的时候，就执行默认的配置。

**defaultMapStateToProps**：传入state，返回空对象

**defaultMapDispatchToProps**： 传入dispatch，返回dispatch对象

**defaultMergeProps**：传入stateProps, dispatchProps, parentProps，返回当前传入的对象。

    const defaultMapStateToProps = state => (&#123;&#125;)
    const defaultMapDispatchToProps = dispatch => (&#123; dispatch &#125;)
    const defaultMergeProps = (stateProps, dispatchProps, parentProps) => (&#123;
      ...parentProps,
      ...stateProps,
      ...dispatchProps
    &#125;)

**4、getDisplayName方法**

返回当前传入的组件名
    function getDisplayName(WrappedComponent) &#123;
      return WrappedComponent.displayName || WrappedComponent.name || 'Component'
    &#125;

**5、tryCatch方法**
给fn函数指定上下文。
    let errorObject = &#123; value: null &#125;
    function tryCatch(fn, ctx) &#123;
      try &#123;
        return fn.apply(ctx)
      &#125; catch (e) &#123;
        errorObject.value = e
        return errorObject
      &#125;
    &#125;

使用场景：在connect内调用tryCatch给updateStatePropsIfNeeded方法指定当前的上下文

    tryCatch(this.updateStatePropsIfNeeded, this)

如果你不明白上面的代码，可以看下面比较简单的例子：

    let b = &#123;
      a: 1,
      e: function() &#123;
        console.log(this.a)
      &#125;,
      c: function() &#123;
        tryCatch(this.e, this)
      &#125;
    &#125;
    
    b.c() // 1

**6、connect函数解析思路**
connect函数是核心，我们需要大概了解函数做的事情，才能更好的读懂源码。
既然是函数，那就有返回值，connect()返回值是Connect组件（请注意大小写的区别）。

通俗点理解，使用connect可以把state和dispatch绑定到react组件，使得组件可以访问到redux的数据。
常看到下面这种写法：

    export default connect(mapStateToProps)(TodoApp)
    
我把connect的核心实现简化提取出来，是下面这种形式：WrappedComponent参数对应的就是TodoApp。函数最终返回的是将state和dispatch绑定到Connect之后的新组件。

    funtion connect(mapStateToProps) &#123;
        return function wrapWithConnect(WrappedComponent) &#123;
            class Connect extends Component &#123;
            
            &#125;
            return hoistStatics(Connect, WrappedComponent)
        &#125;
    &#125;

**7、Connect组件执行**

既然已经知道connect函数返回的是Connect组件，而Connect组件继承于react，我们就可以按照react的生命周期来阅读代码。

**Connect组件方法组成：**方法虽然很多，但是我们只需要紧跟react生命周期函数去了解代码，而其他方法都是在生命周期函数中调用的。

    class Connect extends Component &#123;
          shouldComponentUpdate() &#123;&#125;
          constructor(props, context) &#123;&#125;    
          computeStateProps(store, props) &#123;&#125;    
          configureFinalMapState(store, props) &#123;&#125;    
          computeDispatchProps(store, props) &#123;&#125;    
          configureFinalMapDispatch(store, props) &#123;&#125;    
          updateStatePropsIfNeeded() &#123;&#125;
          updateDispatchPropsIfNeeded() &#123;&#125;    
          updateMergedPropsIfNeeded() &#123;&#125;    
          isSubscribed() &#123;&#125;    
          trySubscribe() &#123;&#125;    
          tryUnsubscribe() &#123;&#125;    
          componentDidMount() &#123;&#125;    
          componentWillReceiveProps(nextProps) &#123;&#125;    
          componentWillUnmount() &#123;&#125;    
          clearCache() &#123;&#125;    
          handleChange() &#123;&#125;    
          getWrappedInstance() &#123;&#125;
          render() &#123;&#125;
    &#125;

简单了解react生命周期的函数执行顺序：

**初次渲染**：render => componentDidMount

**当state更新时**：componentWillReceiveProps => shouldComponentUpdate => render

**render：**进入Connect组件执行的时候，先进入render方法。

    render() &#123;
            const &#123;haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement&#125; = this
    
            this.haveOwnPropsChanged = false
            this.hasStoreStateChanged = false
            this.haveStatePropsBeenPrecalculated = false
            this.statePropsPrecalculationError = null
    
            if (statePropsPrecalculationError) &#123;
              throw statePropsPrecalculationError
            &#125;
    
            let shouldUpdateStateProps = true
            let shouldUpdateDispatchProps = true
            if (pure && renderedElement) &#123;
              shouldUpdateStateProps = hasStoreStateChanged || (
                haveOwnPropsChanged && this.doStatePropsDependOnOwnProps
              )
              shouldUpdateDispatchProps =
                haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps
            &#125;
    
            let haveStatePropsChanged = false
            let haveDispatchPropsChanged = false
            if (haveStatePropsBeenPrecalculated) &#123;
              haveStatePropsChanged = true
            &#125; else if (shouldUpdateStateProps) &#123;
              haveStatePropsChanged = this.updateStatePropsIfNeeded()
            &#125;
            if (shouldUpdateDispatchProps) &#123;
              haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
            &#125;
    
            let haveMergedPropsChanged = true
            if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) &#123;
              haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
            &#125; else &#123;
              haveMergedPropsChanged = false
            &#125;
    
            if (!haveMergedPropsChanged && renderedElement) &#123;
              return renderedElement
            &#125;
    
            if (withRef) &#123;
              this.renderedElement = createElement(WrappedComponent, &#123;
                ...this.mergedProps,
                ref: 'wrappedInstance'
              &#125;)
            &#125; else &#123;
              this.renderedElement = createElement(WrappedComponent,
                this.mergedProps
              )
            &#125;

**a、首先定义了5个成员变量，在Connect组件内部的任意函数位置可以访问到this定义的成员变量。**
    const &#123;haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement&#125; = this
    
    //上面的代码等于下面的写法，this指当前的组件对象。
    
    //判断新传入的props和当前的是否相等，是bool值
    var haveOwnPropsChanged = this.haveOwnPropsChanged; 
    //当state更新时，改变hasStoreStateChanged的状态，是bool值
    var hasStoreStateChanged = this.hasStoreStateChanged;
    //表示state和props已经提前计算改变，也是bool值
    var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
    //如果state和props更新时出现错误，则抛出statePropsPrecalculationError异常
    var statePropsPrecalculationError = this.statePropsPrecalculationError;
    //将要渲染的react组件
    var renderedElement = this.renderedElement;

**b、给成员变量设置默认值。**默认值要么是false，要么是null。

    this.haveOwnPropsChanged = false
    this.hasStoreStateChanged = false
    this.haveStatePropsBeenPrecalculated = false
    this.statePropsPrecalculationError = null

**c、抛出异常**：初次渲染时，statePropsPrecalculationError为null，不会抛出异常，当执行state和props更新出现异常时，会抛出错误。

    if (statePropsPrecalculationError) &#123;
          throw statePropsPrecalculationError
    &#125;
我们追踪到statePropsPrecalculationError的赋值是在handleChange()里面执行的，受到haveStatePropsChanged的结果影响。当haveStatePropsChanged出现错误时，就把报错内容赋值给statePropsPrecalculationError。

    if (haveStatePropsChanged === errorObject) &#123;
          this.statePropsPrecalculationError = errorObject.value
    &#125;
**d、定义shouldUpdateStateProps和shouldUpdateDispatchProps**：默认为true前者表示默认允许更新state和props，后者表示默认允许更新dispatch。
pure：options的配置项，初始值为true。
shouldUpdateStateProps：我们看到 || 符号，只要左右2边满足一个为true，则返回true，如果2个都是false，则返回false。
shouldUpdateDispatchProps：同时满足haveOwnPropsChanged、doDispatchPropsDependOnOwnProps为true，则返回true，否则返回false。

        let shouldUpdateStateProps = true
        let shouldUpdateDispatchProps = true
        if (pure && renderedElement) &#123;
            shouldUpdateStateProps = hasStoreStateChanged ||
     (haveOwnPropsChanged && this.doStatePropsDependOnOwnProps)
            shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps
         &#125;

**e、上面几个步骤都是定义state和props的各种状态的变量，目的是为了判断render方法返回怎样的renderedElement。**

    //如果haveMergedPropsChanged为false，并且renderedElement不为null，则返回renderedElement
    //这段代码在初次渲染是不会执行，只有在更新state和props的时候执行
    if (!haveMergedPropsChanged && renderedElement) &#123;
        return renderedElement
    &#125;
    
    //haveMergedPropsChanged由updateMergedPropsIfNeeded方法的返回值控制，如果mergedProps等于nextMergedProps，返回false，不相等则返回true，表示应该更新state和props
    updateMergedPropsIfNeeded() &#123;
        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
        if (this.mergedProps && checkMergedEquals && shallowEqual(nextMergedProps, this.mergedProps)) &#123;
          return false
        &#125;

        this.mergedProps = nextMergedProps
        return true
      &#125;

初次进入组件最先渲染的返回值是下面这段：

```
    if (withRef) {
          this.renderedElement = createElement(WrappedComponent, {
            ...this.mergedProps,
            ref: 'wrappedInstance'
          })
        } else {
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        }
```

**connect渲染结果**：在你绑定的组件外层包裹了Connect组件，看下面的图你应该能更加清晰的了解connect做的事情。

![clipboard.png](https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVQXkk)


**componentWillReceiveProps**：组件接收到新的state。如果pure为false，并且nextProps和this.props不相等，则设置this.haveOwnPropsChanged为true。

    componentWillReceiveProps(nextProps) &#123;
            if (!pure || !shallowEqual(nextProps, this.props)) &#123;
              this.haveOwnPropsChanged = true
            &#125;
          &#125;

**shouldComponentUpdate()**：判断组件是否允许更新。

    shouldComponentUpdate() &#123;
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
          &#125;

**componentDidMount()：**组件初次渲染完成，执行订阅更新

    componentDidMount() &#123;
            this.trySubscribe()
          &#125;

**componentWillUnmount()：**组件卸载时恢复状态。

        componentWillUnmount() &#123;
            this.tryUnsubscribe()
            this.clearCache()
          &#125;
    
          clearCache() &#123;
            this.dispatchProps = null
            this.stateProps = null
            this.mergedProps = null
            this.haveOwnPropsChanged = true
            this.hasStoreStateChanged = true
            this.haveStatePropsBeenPrecalculated = false
            this.statePropsPrecalculationError = null
            this.renderedElement = null
            this.finalMapDispatchToProps = null
            this.finalMapStateToProps = null
          &#125;

**8、总结**
如果看到这里，你还没有理清思路，那么可以看完总结再回过头去理解源码。

connect方法做的事情是将state和dispatch绑定到Connect组件的参数上，然后Connect组件将你当前的App组件封装起来，使得App组件可以通过props获取到父组件Connect传递的state和props。

这也就是为什么你可以在自己写的组件上面直接通过this.props访问到state和action。有的人是通过store去读取state和dispatch action，也是一样的道理。

从connect方法的实现，我们看到了非常多react组件的影子，生命周期，props传递，context上下文。

**对比Provider组件：**

Provider是顶层组件的作用，将store作为上下文提供给全局共享，而Connect组件是局部组件，将某个react组件包装起来，传递指定的state和props给该组件访问。


  [1]: http://lodashjs.com/docs/#_isplainobjectvalue






