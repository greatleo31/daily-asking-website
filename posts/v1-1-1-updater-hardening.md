---
title: v1.1.1 · 更新机制与密钥加固
description: 应用内更新机制上线：手动与自动检查、强制更新、SHA-256 校验；API Key 迁移到系统隔离存储。
template: updates
aria_label: 留痕更新手记
from: 留痕团队
to: 您
date: Thu, 13 Aug 2026 10:00:00 +0800
subject: v1.1.1 · 更新机制与密钥加固
---

两天后，v1.1.1 发布。这个版本专注两件事：让你能安心地保持更新，以及让你的 Key 更安全。

## 应用内更新
- 关于页可手动检查更新，应用启动时也会自动检查（可关闭）；
- 可开启「自动更新」；标记为强制的版本不可跳过；
- 更新走 latest.json 清单协议，下载后做 SHA-256 校验再安装。

## API Key 加固
BYOK 的 API Key 从普通存储迁移到 flutter_secure_storage（Android Keystore + EncryptedSharedPreferences），旧明文 Key 在启动时自动迁移，设置页不再回显完整 Key。

## 工程配套
发布脚本 bump-version.sh 与 generate-latest-json.sh 一并开源，版本号单一来源化（lib/core/version.dart）。
