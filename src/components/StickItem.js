import React, { Component } from 'react'
import styles from '@/stylus/stick'
class StickItem extends Component {
  render () {
    return (
      <div className={styles['stick-item'] + ' ' + this.props.className}>
        <div className={styles['stick-icon']}><span>置顶</span></div>
        <p>[公告] 网利社区全新升级了，欢迎大家勇跃勇跃勇跃勇跃...</p>
      </div>
    )
  }
}
export default StickItem