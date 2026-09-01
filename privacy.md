---
title: 隐私
template: page
page_class: page--prose page--privacy
aria_label: 留痕隐私说明
description: "留痕是本地优先的应用：数据只在本机，AI 完全可选，出站前披露确认，日志三不记录。"
i18n_key: page.privacy
aria_i18n_key: privacy
---

<p><em data-i18n="content.privacy.intro">留痕是一款本地优先的应用。这条页面用最直白的话说明你的数据去了哪里。</em></p>

<p><em class="prose-subheading" data-i18n="content.privacy.local.title">数据只在本机</em><br><span data-i18n="content.privacy.local.body">所有记录以 JSON 形式保存在手机本机应用目录中，没有账号体系、没有云同步、没有遥测上报。卸载应用，数据随应用目录一起消失，不会被送往任何服务器。</span></p>

<p><em class="prose-subheading" data-i18n="content.privacy.ai.title">AI 完全可选</em><br><span data-i18n="content.privacy.ai.body">默认状态下，留痕不会发出任何网络请求（更新检查除外）。只有当你在工作室主动勾选证据并请求生成时，才会调用你自己配置的 OpenAI 兼容接口。</span></p>

<p><em class="prose-subheading" data-i18n="content.privacy.outbound.title">出站披露</em><br><span data-i18n="content.privacy.outbound.body">每次真实调用前，应用会展示一张出站披露单：发送给谁、发送哪些字段。确认后才会发送，且只包含你选中的最小字段。API Key 保存在系统隔离存储（Android Keystore + EncryptedSharedPreferences），页面不回显。</span></p>

<p><em class="prose-subheading" data-i18n="content.privacy.logs.title">日志三不记录</em><br><span data-i18n="content.privacy.logs.body">日志不记录 API Key、不记录记录正文、不记录提示词全文。</span></p>

<p><em class="prose-subheading" data-i18n="content.privacy.update.title">更新检查</em><br><span data-i18n="content.privacy.update.body">应用会连接版本清单（latest.json）检查更新：关于页手动检查、启动自动检查（可关闭）。这是唯一的默认网络行为，仅获取版本号与下载地址，不上传任何本机数据。</span></p>
