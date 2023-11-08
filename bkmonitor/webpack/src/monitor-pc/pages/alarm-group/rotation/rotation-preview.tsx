/*
 * Tencent is pleased to support the open source community by making
 * 蓝鲸智云PaaS平台 (BlueKing PaaS) available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * 蓝鲸智云PaaS平台 (BlueKing PaaS) is licensed under the MIT License.
 *
 * License for 蓝鲸智云PaaS平台 (BlueKing PaaS):
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator';
import { Component as tsc } from 'vue-tsx-support';
import { Sideslider, Switcher } from 'bk-magic-vue';

import { dutyDataConversion, getCalendarOfNum, IDutyData } from './utils';

import './rotation-preview.scss';

interface IProps {
  value?: any;
  onStartTimeChange?: (v: string) => void;
}

@Component
export default class RotationPreview extends tsc<IProps> {
  @Prop({ type: Array, default: () => [] }) value: any[];

  @Ref('previewContent') previewContentRef: HTMLDivElement;
  @Ref('userTip') userTipRef: HTMLDivElement;
  showNoData = true;
  isExpan = true;
  // 预览数据
  dutyData: IDutyData = {
    dates: getCalendarOfNum(),
    data: [],
    freeTimes: [],
    overlapTimes: []
  };

  popoverInstance = null;
  popover = {
    users: '',
    time: ''
  };

  containerWidth = 1000;

  observer = null;

  showDetail = false;

  created() {
    this.dutyData = dutyDataConversion(this.dutyData);
  }
  mounted() {
    this.observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const { width } = entry.contentRect;
        this.containerWidth = width;
      });
    });
    this.observer.observe(this.previewContentRef);
  }

  @Watch('value')
  handleWatchValue(value) {
    this.dutyData = dutyDataConversion({
      ...this.dutyData,
      data: value
    });
  }
  /**
   * @description 展开预览
   */
  handleExpan() {
    this.isExpan = !this.isExpan;
  }
  /**
   * @description 用户组tip
   * @param e
   * @param data
   */
  async handleMouseenter(e: Event, data) {
    this.popover.time = data.time;
    this.popover.users = data.users;
    this.popoverInstance?.hide(100);
    this.popoverInstance?.destroy();
    this.popoverInstance = null;
    await this.$nextTick();
    this.popoverInstance = this.$bkPopover(e.target, {
      content: this.userTipRef,
      placement: 'top',
      width: this.popover.time.length > 30 ? 215 : 160,
      boundary: 'window',
      theme: 'light',
      arrow: true,
      interactive: true
    });
    this.popoverInstance?.show(100);
  }
  @Emit('startTimeChange')
  handleStartTimeChange() {
    const startTime = `${this.dutyData.dates[0].year}-${this.dutyData.dates[0].month}-${this.dutyData.dates[0].day} 00:00:00`;
    return startTime;
  }
  /**
   * @description 上一个周期
   */
  handlePreChange() {
    const preDayDate = this.dutyData.dates[0];
    const preDay =
      new Date(`${preDayDate.year}-${preDayDate.month}-${preDayDate.day}`).getTime() - 8 * 24 * 60 * 60 * 1000;
    this.dutyData = dutyDataConversion({
      ...this.dutyData,
      dates: getCalendarOfNum(7, preDay)
    });
    this.handleStartTimeChange();
  }
  /**
   * @description 下一个周期
   */
  handleNextChange() {
    const preDayDate = this.dutyData.dates[6];
    const preDay = new Date(`${preDayDate.year}-${preDayDate.month}-${preDayDate.day}`).getTime();
    this.dutyData = dutyDataConversion({
      ...this.dutyData,
      dates: getCalendarOfNum(7, preDay)
    });
    this.handleStartTimeChange();
  }
  /**
   * @description 显示排班明细和轮值历史
   * @param v
   */
  handleShowDetail(v: boolean) {
    console.log(v);
    this.showDetail = v;
  }

  render() {
    return (
      <div class='alarm-group-rotation-preview-component'>
        <div
          class='header-wrap'
          onClick={this.handleExpan}
        >
          <span class={['icon-monitor icon-mc-triangle-down', { expan: this.isExpan }]}></span>
          <span class='ml-8'>{this.$t('排班预览')}</span>
          <span
            onClick={(e: Event) => {
              e.stopPropagation();
            }}
          >
            <Switcher
              class='ml-24'
              v-model={this.showNoData}
              theme='primary'
              size='small'
            ></Switcher>
          </span>
          <span class='ml-6'>{this.$t('显示未排班')}</span>
          <span
            class='text-btn mr-24 ml-auto'
            onClick={(e: Event) => {
              e.stopPropagation();
              this.handleShowDetail(true);
            }}
          >
            <span class='icon-monitor icon-mc-detail mr-6'></span>
            <span>{this.$t('排班明细')}</span>
          </span>
          <span
            class='text-btn'
            onClick={(e: Event) => {
              e.stopPropagation();
              this.handleShowDetail(true);
            }}
          >
            <span class='icon-monitor icon-lishijilu mr-6'></span>
            <span>{this.$t('轮值历史')}</span>
          </span>
        </div>
        <div class={['preview-content', { expan: this.isExpan }]}>
          <div class='preview-content-left'>
            <div class='left-header'>{this.$t('轮值规则')}</div>
            <div class='left-content'>
              {this.dutyData.data.map((item, index) => (
                <div
                  class='left-content-item'
                  key={index}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div
            class='preview-content-right'
            ref='previewContent'
          >
            <div class='right-header'>
              {this.dutyData.dates.map((item, index) => (
                <div
                  class='right-header-item'
                  key={index}
                >{`${item.month}-${item.day}`}</div>
              ))}
              <div
                class='pre-btn'
                onClick={this.handlePreChange}
              >
                <span class='icon-monitor icon-arrow-left'></span>
              </div>
              <div
                class='next-btn'
                onClick={this.handleNextChange}
              >
                <span class='icon-monitor icon-arrow-right'></span>
              </div>
            </div>
            <div class='right-content'>
              {this.dutyData.data.map((row, rowIndex) => (
                <div
                  class='row-content'
                  key={rowIndex}
                >
                  {this.dutyData.dates.map((_col, colIndex) => (
                    <div
                      class='col-content'
                      key={`${rowIndex}_${colIndex}`}
                    ></div>
                  ))}
                  {row.data
                    .filter(duty => duty.range[1] - duty.range[0] !== 0)
                    .map((duty, dutyIndex) => (
                      <div
                        class='user-item'
                        key={dutyIndex}
                        style={{
                          width: `${
                            (duty?.isStartBorder ? -1 : 0) + this.containerWidth * (duty.range[1] - duty.range[0])
                          }px`,
                          left: `${(duty?.isStartBorder ? 1 : 0) + this.containerWidth * duty.range[0]}px`
                        }}
                        onMouseenter={(event: Event) => this.handleMouseenter(event, duty.other)}
                      >
                        <div
                          class='user-header'
                          style={{ background: duty.color }}
                        ></div>
                        <div
                          class='user-content'
                          style={{ color: duty.color }}
                        >
                          <span>{duty.users.map(u => u.id).join(',')}</span>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
              {this.showNoData &&
                this.dutyData.freeTimes.map((item, index) => (
                  <div
                    key={`free_${index}`}
                    class='free-col'
                    style={{
                      width: `${this.containerWidth * (item.range[1] - item.range[0])}px`,
                      left: `${this.containerWidth * item.range[0]}px`
                    }}
                    onMouseenter={(event: Event) => this.handleMouseenter(event, { time: item.timeStr })}
                  ></div>
                ))}
              {this.dutyData.overlapTimes.map((item, index) => (
                <div
                  key={`overlap_${index}`}
                  class='overlap-col'
                  style={{
                    top: `${(item.verticalRange[0] + 1) * 64 - 21}px`,
                    height: `${(item.verticalRange[1] - item.verticalRange[0] + 1) * 64 - 86}px`,
                    width: `${this.containerWidth * (item.range.range[1] - item.range.range[0])}px`,
                    left: `${this.containerWidth * item.range.range[0]}px`
                  }}
                  onMouseenter={(event: Event) =>
                    this.handleMouseenter(event, {
                      time: item.range.timeStr,
                      users: this.$t('时间段冲突，优先执行节假日排班')
                    })
                  }
                ></div>
              ))}
            </div>
          </div>
        </div>
        <Sideslider
          isShow={this.showDetail}
          width={640}
          transfer={true}
          extCls={'rotation-preview-side'}
          quickClose={true}
          before-close={() => this.handleShowDetail(false)}
        >
          <div slot='content'>
            <div class='content-item'>
              <span class='item-left'>2022-04-30 22:35 ～ 2023-4-30 23:59</span>
              <span class='item-right'>张三、李四、王武、王六、白七、小小、巴拉巴拉、小王、小李、小白、小黄</span>
            </div>
            <div class='content-item'>
              <span class='item-left'>2022-04-30 22:35 ～ 2023-4-30 23:59</span>
              <span class='item-right'>张三、李四、王武、王六、白七、小小、巴拉巴拉、小王、小李、小白、小黄</span>
            </div>
            <div class='content-item'>
              <span class='item-left'>2022-04-30 22:35 ～ 2023-4-30 23:59</span>
              <span class='item-right'>张三、李四、王武、王六、白七、小小、巴拉巴拉、小王、小李、小白、小黄</span>
            </div>
            <div class='content-item'>
              <span class='item-left'>2022-04-30 22:35 ～ 2023-4-30 23:59</span>
              <span class='item-right'>张三、李四、王武、王六、白七</span>
            </div>
            <div class='content-item'>
              <span class='item-left'>2022-04-30 22:35 ～ 2023-4-30 23:59</span>
              <span class='item-right'>张三、李四、王武、王六、白七、小小、巴拉巴拉、小王、小李、小白、小黄</span>
            </div>
          </div>
        </Sideslider>
        <div style={{ display: 'none' }}>
          <div
            class='duty-preview-component-user-item-tip'
            ref='userTip'
          >
            <div class='time'>{this.popover.time}</div>
            <div class='users'>{this.popover.users}</div>
          </div>
        </div>
      </div>
    );
  }
}
