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
export default {
  // 规范： 驼峰、术语
  // 菜单
  'route-首页': 'Home',
  'route-仪表盘': 'Dashboards',
  'route-数据探索': 'Explore',
  'route-观测场景': 'Observations',
  'route-告警事件': 'Alarms',
  'route-指标检索': 'Metrics',
  'route-日志检索': 'Logs',
  'route-事件检索': 'Events',
  'route-Trace检索': 'Traces',
  'route-综合拨测': 'Synthetics',
  'route-APM': 'APM',
  'route-Kubernetes': 'Kubernetes',
  'route-主机监控': 'Hosts',
  'route-自定义场景': 'Customs',
  'route-常用': 'Starred',
  'route-全局设置': 'Global Settings',
  'route-自监控': 'Self-state',
  'route-所有告警': 'All Alarms',
  'route-处理记录': 'Handling Records',
  'route-迁移工具': 'Migration Tool',
  'route-日历服务': 'Calendar Services',
  'route-仪表盘设置': 'Dashboard Settings',
  'route-配置': 'Management',
  'route-告警': 'Alarms',
  'route-告警策略': 'Alert Rules',
  'route-告警屏蔽': 'Silences',
  'route-告警组': 'Alarm Team',
  'route-告警处理': 'Alarm Handling',
  'route-处理套餐': 'Alarm Solutions',
  'route-插件': 'Plugins',
  'route-指标插件': 'Metric Plugins',
  'route-告警源': 'Alarm Sources',
  'route-数据采集': 'Data Collection',
  'route-自定义指标': 'Custom Metrics',
  'route-自定义事件': 'Custom Events',
  'route-共享': 'Sharing',
  'route-导入导出': 'Import / Export',
  'route-邮件订阅': 'Subscriptions',
  'route-节点': 'Probes',
  'route-拨测节点': 'Probes',
  'route-事件中心': 'Alarms',
  'route-监控配置': 'Configuration',
  'route-插件管理': 'Plugins',
  'route-采集配置': 'Collections',
  'route-采集': 'Collections',
  'route-策略配置': 'Rule Configuration',
  'route-策略': 'Alert Rules',
  'route-屏蔽': 'Mute',
  'route-服务分类': 'Service Classification',
  'route-分类': 'Service Classification',
  'route-导入/导出': 'Import / Export',
  'route-自定义上报': 'Custom Report',
  'route-系统管理': 'Administration',
  'route-权限': 'Permissions',
  'route-权限设置': 'Permissions',
  'route-系统设置': 'Global Setting',
  'route-全局配置': 'Global Setting',
  'route-导入配置': 'Import Configuration',
  'route-导出配置': 'Export Configuration',
  'route-导入历史': 'Import History',
  'route-迁移仪表盘': 'Migration Dashboard',
  'route-分析定位': 'Analysis',
  'route-集成': 'Integrations',
  'route-告警分派': 'Alarm Routing',
  'route-空间管理': 'Space Management',
  'route-平台设置': 'Platform Settings',
  'route-默认仪表盘': 'Dashboard Home',
  'route-发送历史': 'Send History',
  'route-AI设置': 'AI Settings',
  'route-配置规则': 'Configuration Rules',
  'route-指标管理': 'Metrics Manage',
  'route-配置应用': 'Configuration Application',
  'route-应用监控': 'Application Monitoring',
  'route-轮值': 'Rotation',
  'route-管理': 'Management',
  // 面包屑 标题定位
  'route-新建策略': 'New Alert Rules',
  'route-新建拨测任务': 'New Check',
  'route-新建插件': 'New Plugin',
  'route-新建告警组': 'New Alarm Team',
  'route-新建屏蔽': 'New Mute',
  'route-新建配置': 'New Configuration',
  'route-新建自定义事件': 'New Custom Event',
  'route-新建策略配置': 'New Alert Rule',
  'route-新建拨测节点': 'New Probe Node',
  'route-新建订阅': 'New Subscription',
  'route-新建自定义指标': 'New Custom Metrics',
  'route-编辑拨测任务': 'Edit Check',
  'route-编辑': 'Edit',
  'route-编辑插件': 'Edit Plugin',
  'route-编辑配置': 'Edit Configuration',
  'route-编辑屏蔽': 'Edit Mute',
  'route-编辑策略配置': 'Edit Alert Rule',
  'route-编辑拨测节点': 'Edit Probe Node',
  'route-策略详情': 'Rule Details',
  'route-主机详情': 'Host Details',
  'route-插件详情': 'Plugin Details',
  'route-告警详情': 'Alarm Details',
  'route-执行详情': 'Execution Details',
  'route-自定义详情': 'Custom Details',
  'route-任务详情': 'Task Details',
  'route-视图详情': 'View Details',
  'route-增删监控目标': 'Change Scope',
  'route-配置升级': 'Upgrade',
  'route-增删目标': 'Targets',
  'route-无权限': 'No Permission',
  'route-链路管理': 'Link Management',
  'route-加载中...': 'Loading...',
  'route-数据源管理': 'DataSource Management',
  'route-编辑轮值': 'Edit Rotation',
  'route-新增轮值': 'Add Rotation',

  // 功能页面标题

  'route-统一添加策略目标': 'Add Targets',
  'route-设置指标&维度': 'Set Metrics & Dimensions',
  'route-功能开关': 'Function Switch',
  'route-启用采集配置': 'Enable Collection',
  'route-可视化': 'Visualize',
  'route-任务': 'Checks',
  'route-拨测任务': 'Checks',

  // 专有名词缩写
  ESB: 'ESB',
  'short-管控平台': 'GSE',
  蓝鲸: 'BK',
  软件及服务: 'SaaS',
  'short-配置平台': 'CMDB',
  'short-容器管理平台': 'BCS',
  业务: 'Business',
  集群: 'Set',
  模块: 'Module',
  作业执行方案: 'Job',
  定时任务: 'Cron',
  动态分组: 'Dynamic',

  // 专有平台名称
  用户管理: 'User Management',
  权限中心: 'Identity and Access Management',
  管控平台: 'Global Service Engine',
  配置平台: 'Configuration System',
  作业平台: 'Job System',
  流程服务: 'Process Service Management',
  'PaaS3.0-开发者中心': 'PaaS Developer Center 3.0',
  'PaaS3.0-桌面': 'DeskTop',
  'PaaS3.0-APIGateway': 'APIGateway',
  'PaaS2.0-开发者中心': 'PaaS Developer Center 2.0',
  'PaaS2.0-桌面': 'DeskTop',
  标准运维: 'Standard OPS',
  节点管理: 'NodeMan',
  'GSEKit（进程配置管理）': 'GSEKit',
  监控平台: 'BKMonitor',
  日志平台: 'BKLog',
  容器管理平台: 'BlueKing Container Service',
  'CI-制品库': 'BlueKing Repository',
  'CI-流水线': 'BlueKing Continuous Integration',
  'CI-编译加速': 'BlueKing Build Booster',
  'CI-代码检查': 'BlueKing Code-Check Center',
  DB管理平台: 'Database Management',
  审计中心: 'Audit Center',
  开发框架: 'Development Framework',
  '服务配置平台（BSCP）': 'BlueKing Service Configuration Platform',
  图表平台: 'BKVision',
  LessCode: 'LessCode',
  计算平台: 'BK-Base',
  AIOps: 'AIOps',
  运营管理: 'BK Operation Management',
  海垒: 'Hybrid Cloud Management System',
  'route-外部授权列表': 'Authorization List',
  'Kafka 集群': 'Kafka Set',
  'Transfer 集群': 'Transfer Set',
  'influxdb 集群': 'influxdb Set',
  'ES 集群': 'ES Set',
  资源注册: 'Resource registration',
  编辑集群: 'Edit cluster',
  新增集群: 'Add cluster'
};
