import React, { Component } from 'react'
import { Tabs, ListView, RefreshControl } from 'antd-mobile'

import TopicItem from '@/components/TopicItem'
import Loading from '@/components/loading/TopicLoadMore'

import { connect } from 'react-redux'
import * as actions from '@/actions/topic'

import styles from '@/stylus/topic-container'

const TabPane = Tabs.TabPane
function callback (key) {
  console.log('onChange', key)
}
function handleTabClick (key) {
  console.log('onTabClick', key)
}

function MyBody (props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  )
}
class Topic extends Component {
  constructor () {
    super()
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this.state = {
      refreshing: false
    }
    this.onEndReached = this.onEndReached.bind(this)
  }
  componentWillMount () {
    const { typeid, dispatch } = this.props
    dispatch(actions.fetchTopicList({method: 'getBbsThreadAllList', id: typeid, page: 1}))
  }
  componentDidMount () {
    console.log(styles['list-view'], 'list-view')
    // var that = this
    // window.mui.init({
    //   pullRefresh: {
    //     container: '.' + styles['list-view'], // 下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    //     down: {
    //       style: 'circle', // 必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
    //       color: '#2BD009', // 可选，默认“#2BD009” 下拉刷新控件颜色
    //       height: 50, // 可选,默认50.触发下拉刷新拖动距离,
    //       auto: false, // 可选,默认false.首次加载自动上拉刷新一次
    //       callback: function () {
    //         setTimeout(() => {
    //           window.mui('.' + styles['list-view']).pullRefresh().pulldown = false
    //         }, 1000)
    //       } // 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //     }
    //   }
    // })
    // window.mui.init({
    //   pullRefresh: {
    //     container: '.' + styles['list-view'], // 待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    //     up: {
    //       height: 50, // 可选.默认50.触发上拉加载拖动距离
    //       auto: true, // 可选,默认false.自动上拉加载一次
    //       contentrefresh: '正在加载...', // 可选，正在加载状态时，上拉加载控件上显示的标题内容
    //       contentnomore: '没有更多数据了', // 可选，请求完毕若没有更多数据时显示的提醒内容；
    //       callback: function () {
    //         setTimeout(() => {
    //           window.mui('.' + styles['list-view']).pullRefresh().pullup = false
    //         }, 1000)
    //       } // 必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //     }
    //   }
    // })
  }
  onEndReached () {
    console.log('end')
    const { typeid, dispatch, page, total, lastPage } = this.props
    console.log(this.props)
    if (page < lastPage) {
      dispatch(actions.fetchTopicList({method: 'getBbsThreadAllList', id: typeid, page: page + 1}))
    }
  }
  onRefresh () {
    console.log('onRefresh')
  }
  render () {
    const { topicList, typeid } = this.props

    const ds = this.dataSource.cloneWithRows(topicList[typeid])

    return (
      <div className={styles['topic-container'] + ' home-topic-container mt-32'}>
        <Tabs className="topic-container-tabs-bar" defaultActiveKey="1" onChange={callback} swipeable={false} animated={false} onTabClick={handleTabClick}>
          <TabPane tab="全部" key="1" >
            <div className={styles['list-view']}>
              {
                topicList[typeid] && topicList[typeid].map(function (item, index) {
                  console.log(item, 'item')
                  return (
                    (<TopicItem key={index} {...item} className="mb-18" />)
                  )
                })
                /*
                  <ListView
                    dataSource={ds}
                    useBodyScroll={true}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                      <Loading />
                    </div>)}
                    renderRow={ (rowData) => {
                      return (<TopicItem {...rowData} className="mb-18" />)
                    } }
                    initialListSize={4}
                    pageSize={4}
                    onEndReachedThreshold={0}
                    onEndReached={this.onEndReached}
                    />
                */}
            </div>
          </TabPane>
          <TabPane tab="精华" key="2">
            <TopicItem className="mb-18"/>
            <TopicItem className="mb-18"/>
            <TopicItem className="mb-18"/>
            <TopicItem className="mb-18"/>
          </TabPane>
          <TabPane tab="最热" key="3">
            <TopicItem className="mb-18"/>
          </TabPane>
          <TabPane tab="最新" key="4">
            <TopicItem className="mb-18"/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
function mapStateToProps ({topic}) {
  // const
  return topic
}
export default connect(mapStateToProps)(Topic)
