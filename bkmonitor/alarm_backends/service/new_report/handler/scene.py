# -*- coding: utf-8 -*-
"""
Tencent is pleased to support the open source community by making 蓝鲸智云 - 监控平台 (BlueKing - Monitor) available.
Copyright (C) 2017-2021 THL A29 Limited, a Tencent company. All rights reserved.
Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://opensource.org/licenses/MIT
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
"""
from alarm_backends.service.new_report.handler.base import BaseReportHandler


class SceneReportHandler(BaseReportHandler):
    """
    观测场景订阅管理器
    """

    def get_render_params(self) -> dict:
        """
        获取渲染参数
        """
        pass

    def render(self, render_params: dict) -> dict:
        """
        渲染订阅
        """
        pass
