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

import { computed, defineComponent, onMounted, provide, reactive, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Dialog } from 'bkui-vue';

import { getDefautTimezone } from '../../../monitor-pc/i18n/dayjs';
import { ISelectMenuOption } from '../../components/select-menu/select-menu';
import { DEFAULT_TIME_RANGE, handleTransformToTimestamp } from '../../components/time-range/utils';
import ProfilingQueryImage from '../../static/img/profiling-query.png';
import ProfilingUploadQueryImage from '../../static/img/profiling-upload-query.png';
import { monitorDrag } from '../../utils/drag-directive';

import EmptyCard from './components/empty-card';
import HandleBtn from './components/handle-btn';
// import FavoriteList from './components/favorite-list';
import PageHeader from './components/page-header';
import ProfilingDetail from './components/profiling-detail';
import ProfilingRetrievalView from './components/profiling-retrieval-view';
import RetrievalSearch from './components/retrieval-search';
import UploadRetrievalView from './components/upload-retrieval-view';
import { MenuEnum, ToolsFormData } from './typings/page-header';
import {
  DetailType,
  FileDetail,
  PanelType,
  RetrievalFormData,
  SearchState,
  SearchType,
  ServicesDetail
} from './typings';

import './profiling.scss';

export default defineComponent({
  name: 'ProfilingPage',
  directives: { monitorDrag },
  setup() {
    const { t } = useI18n();
    /** 顶部工具栏数据 */
    const toolsFormData = ref<ToolsFormData>({
      timeRange: DEFAULT_TIME_RANGE,
      timezone: getDefautTimezone(),
      refreshInterval: -1
    });
    provide<Ref<ToolsFormData>>('toolsFormData', toolsFormData);

    /** 查询数据状态 */
    const searchState = reactive<SearchState>({
      isShow: true,
      autoQueryTimer: null,
      autoQuery: true,
      loading: false,
      formData: {
        type: SearchType.Profiling,
        isComparison: false,
        server: {
          app_name: '',
          service_name: ''
        },
        where: [],
        comparisonWhere: []
      }
    });
    const canQuery = computed(() => {
      if (searchState.formData.type === SearchType.Profiling) {
        // 持续检索必须选择应用/服务后才能查询
        return !!(searchState.formData.server.app_name && searchState.formData.server.service_name);
      }
      return true;
    });
    provide<RetrievalFormData>('formData', searchState.formData);
    const isEmpty = ref(true);
    const dataType = ref('cpu');

    /** 查询参数 */
    const queryParams = ref(getParams());

    /* 当前选择的文件 */
    const curFileInfo = ref(null);

    /**
     * 检索面板和收藏面板显示状态切换
     * @param type 面板类型
     * @param status 显示状态
     */
    function handleShowTypeChange(type: PanelType, status: boolean) {
      if (type === 'search') {
        searchState.isShow = status;
      }
    }
    /**
     * 顶部左侧工具栏数据改变
     * @param val 工具栏数据
     */
    function handleToolFormDataChange(val: ToolsFormData) {
      toolsFormData.value = val;
      handleQuery();
    }

    /** 是否全屏 */
    const isFull = ref(false);
    function handleMenuSelect(menu: ISelectMenuOption) {
      if (menu.id === MenuEnum.FullScreen) {
        isFull.value = true;
      }
    }

    function handleDataTypeChange(v: string) {
      dataType.value = v;
      handleQuery();
    }

    /**
     * 查询表单数据改变
     * @param val 表单数据
     */
    function handleSearchFormDataChange(val: SearchState['formData']) {
      searchState.formData = val;
      handleQuery();
    }
    /** 切换自动查询 */
    function handleAutoQueryChange(val: boolean) {
      searchState.autoQuery = val;
      startAutoQueryTimer();
    }
    /** 启动自动查询定时器 */
    function startAutoQueryTimer() {
      window.clearInterval(searchState.autoQueryTimer);
      /**
       * 以下情况不能自动查询
       * 1. 没有开启自动查询
       * 2. 没有设置自动查询间隔
       */
      if (toolsFormData.value.refreshInterval === -1 || !searchState.autoQuery) return;
      searchState.autoQueryTimer = window.setInterval(() => {
        handleQuery();
      }, toolsFormData.value.refreshInterval);
    }

    /** 清除查询条件 */
    function handleQueryClear() {
      searchState.formData.isComparison = false;
      searchState.formData.where = [];
      searchState.formData.comparisonWhere = [];
      searchState.formData.server = {
        app_name: '',
        service_name: ''
      };
      isEmpty.value = true;
    }
    /** 获取接口请求参数 */
    function getParams() {
      const [start, end] = handleTransformToTimestamp(toolsFormData.value.timeRange);
      const { server, isComparison, where, comparisonWhere, type } = searchState.formData;
      return {
        start: start * 1000 * 1000,
        end: end * 1000 * 1000,
        ...server,
        is_compared: isComparison,
        filter_label: where.reduce((pre, cur) => {
          if (cur.key && cur.value) pre[cur.key] = cur.value;
          return pre;
        }, {}),
        diff_filter_label: comparisonWhere.reduce((pre, cur) => {
          if (cur.key && cur.value && type !== SearchType.Upload) pre[cur.key] = cur.value;
          return pre;
        }, {}),
        profile_type: dataType.value,
        profile_id: searchState.formData.type === SearchType.Upload ? curFileInfo.value?.profile_id : undefined
      };
    }

    /** 查询功能 */
    function handleQuery() {
      if (searchState.formData.type === SearchType.Profiling) {
        isEmpty.value = !canQuery.value;
      }
      if (!canQuery.value || searchState.loading) return;
      queryParams.value = getParams();
    }

    // ----------------------详情-------------------------
    const detailShow = ref(false);
    const detailType = ref<DetailType>(DetailType.Application);
    const detailData = ref<ServicesDetail | FileDetail>(null);
    /** 展示服务详情 */
    function handleShowDetail(type: DetailType, detail: FileDetail) {
      detailShow.value = true;
      detailType.value = type;
      detailData.value = detail;
    }

    onMounted(() => {
      searchState.autoQuery && startAutoQueryTimer();
    });

    /**
     * @description 当前选择profiling文件
     * @param fileInfo
     */
    function handleSelectFile(fileInfo) {
      curFileInfo.value = fileInfo;
      handleQuery();
    }

    return {
      t,
      isEmpty,
      dataType,
      searchState,
      canQuery,
      toolsFormData,
      detailShow,
      detailType,
      detailData,
      queryParams,
      isFull,
      startAutoQueryTimer,
      handleToolFormDataChange,
      handleShowTypeChange,
      handleAutoQueryChange,
      handleQuery,
      handleQueryClear,
      handleSearchFormDataChange,
      handleDataTypeChange,
      handleShowDetail,
      handleSelectFile,
      handleMenuSelect
    };
  },

  render() {
    const renderView = () => {
      if (this.searchState.formData.type === SearchType.Upload) {
        return (
          <UploadRetrievalView
            formData={this.searchState.formData}
            queryParams={this.queryParams}
            dataType={this.dataType}
            onSelectFile={fileInfo => this.handleSelectFile(fileInfo)}
            onShowFileDetail={detail => this.handleShowDetail(DetailType.UploadFile, detail)}
            onDataTypeChange={this.handleDataTypeChange}
          />
        );
      }

      if (this.isEmpty)
        return (
          <div class='empty-wrap'>
            <div onClick={() => (this.searchState.formData.type = SearchType.Profiling)}>
              <EmptyCard
                title={this.$t('持续 Profiling')}
                desc={this.$t('直接进行 精准查询，定位到 Trace 详情')}
              >
                {{
                  img: () => (
                    <img
                      class='empty-image'
                      src={ProfilingQueryImage}
                    />
                  )
                }}
              </EmptyCard>
            </div>
            <div onClick={() => (this.searchState.formData.type = SearchType.Upload)}>
              <EmptyCard
                title={this.$t('上传 Profiling')}
                desc={this.$t('可以切换到 范围查询，根据条件筛选 Trace')}
              >
                {{
                  img: () => (
                    <img
                      class='empty-image'
                      src={ProfilingUploadQueryImage}
                    />
                  )
                }}
              </EmptyCard>
            </div>
          </div>
        );

      return (
        <ProfilingRetrievalView
          dataType={this.dataType}
          queryParams={this.queryParams}
          onUpdate:dataType={this.handleDataTypeChange}
        />
      );
    };

    return (
      <div class='profiling-page'>
        <div class='page-header'>
          <PageHeader
            v-model={this.toolsFormData}
            isShowSearch={this.searchState.isShow}
            onShowTypeChange={this.handleShowTypeChange}
            onChange={this.handleToolFormDataChange}
            onRefreshIntervalChange={this.startAutoQueryTimer}
            onMenuSelect={this.handleMenuSelect}
          ></PageHeader>
        </div>
        <div class='page-content'>
          {/* {this.favoriteState.isShow && (
            <div
              class='favorite-list-wrap'
              v-monitor-drag={{
                minWidth: 200,
                maxWidth: 500,
                defaultWidth: 240,
                autoHidden: true,
                theme: 'simple',
                isShow: this.favoriteState.isShow,
                onHidden: () => this.handleShowTypeChange(PanelType.Favorite, false)
              }}
            >
              <FavoriteList></FavoriteList>
            </div>
          )} */}
          <div
            class='search-form-wrap'
            v-monitor-drag={{
              minWidth: 200,
              maxWidth: 800,
              defaultWidth: 400,
              autoHidden: true,
              theme: 'simple',
              isShow: this.searchState.isShow,
              onWidthChange: () => {},
              onHidden: () => this.handleShowTypeChange(PanelType.Search, false)
            }}
          >
            <RetrievalSearch
              formData={this.searchState.formData}
              dataType={this.dataType}
              onChange={this.handleSearchFormDataChange}
              onShowDetail={detail => this.handleShowDetail(DetailType.Application, detail)}
            >
              {{
                query: () => (
                  <HandleBtn
                    autoQuery={this.searchState.autoQuery}
                    canQuery={this.canQuery}
                    loading={this.searchState.loading}
                    onChangeAutoQuery={this.handleAutoQueryChange}
                    onQuery={this.handleQuery}
                    onClear={this.handleQueryClear}
                  ></HandleBtn>
                )
              }}
            </RetrievalSearch>
          </div>
          <div class='view-wrap'>{renderView()}</div>
        </div>

        <ProfilingDetail
          show={this.detailShow}
          detailType={this.detailType}
          detailData={this.detailData}
          onShowChange={val => (this.detailShow = val)}
        ></ProfilingDetail>

        {this.isFull && (
          <Dialog
            is-show={this.isFull}
            title={this.t('查看大图')}
            zIndex={8004}
            fullscreen
            header-align='center'
            draggable={false}
            ext-cls='full-dialog'
            onClosed={() => (this.isFull = false)}
          >
            <div class='view-wrap'>{renderView()}</div>
          </Dialog>
        )}
      </div>
    );
  }
});
