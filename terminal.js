/**
 * AI Native Hiring Terminal
 * 一个模拟 Linux 终端的招聘彩蛋
 *
 * 彩蛋路径：
 * 1. ls -a 发现隐藏文件 .secret
 * 2. cat .secret 得到 Base64 编码的提示
 * 3. 解码后提示运行 ./decode 并查看 job_description.txt
 * 4. job_description.txt 最后有密码提示
 * 5. ./decode <password> 获得最终彩蛋码
 */

// ============================================
// 虚拟文件系统
// ============================================
const fileSystem = {
    '/': {
        type: 'dir',
        children: ['home']
    },
    '/home': {
        type: 'dir',
        children: ['visitor']
    },
    '/home/visitor': {
        type: 'dir',
        children: ['hiring']
    },
    '/home/visitor/hiring': {
        type: 'dir',
        children: [
            'README.md',
            'job_description.txt',
            'requirements.txt',
            'contact.sh',
            'projects',
            '.secret',      // 隐藏文件 - 彩蛋入口
            '.decode',      // 隐藏文件 - 解密工具
            '.history'      // 隐藏文件 - 假的历史记录
        ]
    },
    '/home/visitor/hiring/projects': {
        type: 'dir',
        children: ['ai_assistant', 'data_pipeline', 'ml_platform']
    },
    '/home/visitor/hiring/projects/ai_assistant': {
        type: 'dir',
        children: ['README.md', 'src', 'tests']
    },
    '/home/visitor/hiring/projects/data_pipeline': {
        type: 'dir',
        children: ['README.md', 'pipeline.py', 'config.yaml']
    },
    '/home/visitor/hiring/projects/ml_platform': {
        type: 'dir',
        children: ['README.md', 'models', 'serving']
    }
};

const fileContents = {
    '/home/visitor/hiring/README.md': `# Welcome to AI Native

> "The best way to predict the future is to invent it." - Alan Kay

## 你来对地方了

如果你能看到这个页面，说明你已经迈出了第一步。
我们正在寻找那些不满足于表面的人。

## 快速开始

\`\`\`bash
cat job_description.txt    # 查看岗位详情
cat requirements.txt       # 查看技能要求
./contact.sh              # 联系我们
\`\`\`

## 提示

真正的探索者会看到更多...
你知道 Linux 里怎么查看隐藏文件吗？

---
Last updated: 2024-12-19
`,

    '/home/visitor/hiring/job_description.txt': `╔══════════════════════════════════════════════════════════════╗
║                    AI NATIVE - 技术岗位                       ║
╚══════════════════════════════════════════════════════════════╝

【关于我们】
我们是一家 AI Native 公司，相信 AI 将重新定义软件开发的边界。
我们不是在 AI 浪潮中跟风，而是在创造浪潮。

【我们在找什么样的人】
- 对技术有执念，不是工作，是热爱
- 能在复杂系统中找到优雅解法
- 习惯性地 F12 查看网页源码
- 看到 Base64 会条件反射想解码
- 相信代码是表达思想的艺术

【技术栈】（不限于）
- Languages: Python, TypeScript, Rust, Go
- AI/ML: PyTorch, Transformers, LangChain
- Infra: K8s, Docker, AWS/GCP
- DB: PostgreSQL, Redis, Vector DB

【工作内容】
- 构建下一代 AI 产品
- 解决没有标准答案的问题
- 与 AI 协作编程（是的，你的同事可能是 Claude）

【福利】
- 弹性工作
- 顶配 MacBook Pro
- GPU 随便用
- 无限咖啡

【如何申请】
运行 ./contact.sh 获取联系方式

═══════════════════════════════════════════════════════════════

# NOTE: 如果你正在用 cat 看这个文件，你已经比 80% 的人强了
# HINT: hallucination_detector_v2

═══════════════════════════════════════════════════════════════
`,

    '/home/visitor/hiring/requirements.txt': `# AI Native - 技术要求

## 必须 (Must Have)
- 3+ 年软件开发经验
- 熟练掌握至少一门主流语言
- 理解分布式系统基本原理
- Git 工作流
- 能独立完成需求分析到部署

## 加分项 (Nice to Have)
- LLM 应用开发经验
- 开源项目贡献
- 技术博客/分享
- 竞赛获奖
- 黑客马拉松经历

## 特别加分
- 发现了这个招聘页面的彩蛋 (+100 分)
- 能说出彩蛋的解密过程 (+200 分)
- 提出改进彩蛋的建议 (+∞ 分)

## 不需要
- 完美的简历
- 大厂背景
- 名校学历
我们只看能力和潜力。
`,

    '/home/visitor/hiring/contact.sh': `#!/bin/bash
# Contact Script - AI Native Hiring

echo "========================================"
echo "         联系方式                       "
echo "========================================"
echo ""
echo "  邮箱: hiring@example.com"
echo "  主题: [AI Native] 技术岗位申请"
echo ""
echo "  请在邮件中附上："
echo "  1. 你的简历"
echo "  2. GitHub/作品链接"
echo "  3. 为什么选择我们"
echo ""
echo "  如果你找到了彩蛋，请一并告诉我们 ;)"
echo ""
echo "========================================"
`,

    // ===== 隐藏文件 - 彩蛋核心 =====
    '/home/visitor/hiring/.secret': `# .secret
# 这个文件不应该出现在 ls 的结果里...
# 你是怎么找到的？

# 既然你找到了，这是给你的奖励：
# （以下内容使用 Base64 编码）

WW91IGZvdW5kIHRoZSBzZWNyZXQhCgpOZXh0IHN0ZXA6IOi/kOihjCAuL2RlY29kZSDlubbovpPlhaXlr4bnoIEK5a+G56CB5o+Q56S677ya5Zyo5Y+m5LiA5Liq5paH5Lu2IOWFs+S6jiAi5bm76KeJIiDnmoTms6jph4rph4wKCkdvb2QgbHVjayEg8J+agA==

# 提示：echo "WW91IGZv..." | base64 -d
`,

    '/home/visitor/hiring/.decode': `#!/bin/bash
# Decoder - 解密程序
# Usage: ./decode <password>

read -p "请输入密码: " password

if [ "$password" == "hallucination_detector_v2" ]; then
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║  ★ ★ ★  恭喜你，真正的探索者！ ★ ★ ★                      ║"
    echo "╠════════════════════════════════════════════════════════════╣"
    echo "║                                                            ║"
    echo "║  你找到了隐藏的彩蛋！                                      ║"
    echo "║                                                            ║"
    echo "║  你的专属代码: AINATIVE-2024-HACKER-7f3d8a                 ║"
    echo "║                                                            ║"
    echo "║  在申请邮件中附上这个代码，直接获得面试机会！              ║"
    echo "║                                                            ║"
    echo "║  你展示了：                                                ║"
    echo "║  ✓ Linux 基础知识 (ls -a)                                 ║"
    echo "║  ✓ 编码识别能力 (Base64)                                  ║"
    echo "║  ✓ 细节观察力 (注释中的密码)                              ║"
    echo "║  ✓ 探索精神 (不放过任何线索)                              ║"
    echo "║                                                            ║"
    echo "║  这正是我们在寻找的人才特质。                              ║"
    echo "║                                                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
else
    echo "密码错误。"
    echo "提示：仔细看看 job_description.txt 的注释..."
fi
`,

    '/home/visitor/hiring/.history': `# 这是假的历史记录，吓唬你的 :)
2024-12-01 10:23:45 rm -rf /
2024-12-01 10:23:46 sudo rm -rf / --no-preserve-root
2024-12-01 10:23:47 哈哈开玩笑的
2024-12-01 10:24:00 echo "找到这里的人都是人才"
`,

    '/home/visitor/hiring/projects/ai_assistant/README.md': `# AI Assistant Project

一个基于 LLM 的智能助手项目。

## 技术亮点
- 多轮对话管理
- RAG 检索增强
- 流式输出
- 工具调用 (Function Calling)

## 架构
\`\`\`
User -> API Gateway -> Chat Service -> LLM
                    -> Vector DB
                    -> Tool Executor
\`\`\`
`,

    '/home/visitor/hiring/projects/data_pipeline/README.md': `# Data Pipeline

实时数据处理管道。

## 特性
- 流式处理 (Kafka + Flink)
- 批处理 (Spark)
- 数据质量监控
- 自动 Schema 演化
`,

    '/home/visitor/hiring/projects/data_pipeline/pipeline.py': `#!/usr/bin/env python3
"""
Data Pipeline - 数据处理管道
"""

from dataclasses import dataclass
from typing import Iterator, Any

@dataclass
class PipelineConfig:
    source: str
    destination: str
    batch_size: int = 1000

class DataPipeline:
    def __init__(self, config: PipelineConfig):
        self.config = config

    def extract(self) -> Iterator[Any]:
        """从数据源提取数据"""
        pass

    def transform(self, data: Any) -> Any:
        """转换数据"""
        pass

    def load(self, data: Any) -> None:
        """加载到目标存储"""
        pass

    def run(self) -> None:
        """执行管道"""
        for batch in self.extract():
            transformed = self.transform(batch)
            self.load(transformed)

if __name__ == "__main__":
    print("Pipeline ready to run")
`,

    '/home/visitor/hiring/projects/data_pipeline/config.yaml': `# Pipeline Configuration

pipeline:
  name: main_pipeline
  version: 1.0.0

source:
  type: kafka
  brokers:
    - kafka-1:9092
    - kafka-2:9092
  topic: raw_events

destination:
  type: postgres
  host: db.internal
  database: analytics

processing:
  batch_size: 5000
  parallelism: 4
  checkpoint_interval: 60s
`,

    '/home/visitor/hiring/projects/ml_platform/README.md': `# ML Platform

机器学习模型训练与服务平台。

## 功能
- 模型训练管理
- 实验追踪 (MLflow)
- 模型版本控制
- A/B 测试
- 自动扩缩容
`
};

// ============================================
// 终端状态
// ============================================
let currentPath = '/home/visitor/hiring';
let commandHistory = [];
let historyIndex = -1;
let sudoAttempts = 0;
let matrixMode = false;

// ============================================
// DOM 元素
// ============================================
const output = document.getElementById('output');
const input = document.getElementById('command-input');
const promptElement = document.getElementById('prompt');

// ============================================
// 工具函数
// ============================================
function getPrompt() {
    const shortPath = currentPath.replace('/home/visitor', '~');
    return `visitor@ai-native:${shortPath}$ `;
}

function updatePrompt() {
    promptElement.textContent = getPrompt();
}

function print(text, className = '') {
    const line = document.createElement('div');
    line.className = 'line' + (className ? ' ' + className : '');
    line.innerHTML = text;
    output.appendChild(line);
    scrollToBottom();
}

function printCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'line';
    line.innerHTML = `<span class="prompt-text">${getPrompt()}</span><span class="command-text">${escapeHtml(cmd)}</span>`;
    output.appendChild(line);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

function resolvePath(path) {
    if (path.startsWith('/')) {
        return path;
    }
    if (path.startsWith('~')) {
        return path.replace('~', '/home/visitor');
    }

    let parts = currentPath.split('/').filter(p => p);
    const pathParts = path.split('/').filter(p => p);

    for (const part of pathParts) {
        if (part === '..') {
            parts.pop();
        } else if (part !== '.') {
            parts.push(part);
        }
    }

    return '/' + parts.join('/');
}

function pathExists(path) {
    return fileSystem[path] !== undefined || fileContents[path] !== undefined;
}

function isDirectory(path) {
    return fileSystem[path]?.type === 'dir';
}

function isHidden(name) {
    return name.startsWith('.');
}

function isExecutable(name) {
    return name.endsWith('.sh') || name === '.decode';
}

// ============================================
// 命令实现
// ============================================
const commands = {
    help: () => {
        return `
<span class="ascii-art">可用命令:</span>

  <span class="highlight">ls</span> [path]       - 列出目录内容 (试试 ls -a)
  <span class="highlight">cd</span> <path>       - 切换目录
  <span class="highlight">cat</span> <file>      - 查看文件内容
  <span class="highlight">pwd</span>            - 显示当前路径
  <span class="highlight">whoami</span>         - 你是谁？
  <span class="highlight">clear</span>          - 清屏
  <span class="highlight">echo</span> <text>     - 输出文本
  <span class="highlight">tree</span>           - 显示目录树
  <span class="highlight">file</span> <name>     - 查看文件类型
  <span class="highlight">history</span>        - 命令历史
  <span class="highlight">date</span>           - 当前时间
  <span class="highlight">uname</span>          - 系统信息

<span class="dim">提示: 试着探索一下，也许会有惊喜...</span>
`;
    },

    ls: (args) => {
        let showHidden = false;
        let showLong = false;
        let targetPath = currentPath;

        for (const arg of args) {
            if (arg === '-a' || arg === '-la' || arg === '-al') {
                showHidden = true;
                if (arg.includes('l')) showLong = true;
            } else if (arg === '-l') {
                showLong = true;
            } else if (!arg.startsWith('-')) {
                targetPath = resolvePath(arg);
            }
        }

        if (!pathExists(targetPath)) {
            return `<span class="error">ls: 无法访问 '${args[args.length-1]}': 没有那个文件或目录</span>`;
        }

        if (!isDirectory(targetPath)) {
            return args[args.length-1];
        }

        const dir = fileSystem[targetPath];
        let files = dir.children.filter(f => showHidden || !isHidden(f));

        if (showHidden) {
            files = ['.', '..', ...files];
        }

        if (showLong) {
            let result = `total ${files.length}\n`;
            for (const file of files) {
                const isDir = file === '.' || file === '..' || isDirectory(`${targetPath}/${file}`);
                const perms = isDir ? 'drwxr-xr-x' : (isExecutable(file) ? '-rwxr-xr-x' : '-rw-r--r--');
                const size = isDir ? '4096' : '1024';
                const date = 'Dec 19 12:00';
                let displayName = file;

                if (isDir) {
                    displayName = `<span class="file-directory">${file}</span>`;
                } else if (isHidden(file)) {
                    displayName = `<span class="file-hidden">${file}</span>`;
                } else if (isExecutable(file)) {
                    displayName = `<span class="file-executable">${file}</span>`;
                }

                result += `${perms}  1 visitor visitor ${size.padStart(5)} ${date} ${displayName}\n`;
            }
            return result;
        }

        return files.map(f => {
            if (f === '.' || f === '..' || isDirectory(`${targetPath}/${f}`)) {
                return `<span class="file-directory">${f}</span>`;
            } else if (isHidden(f)) {
                return `<span class="file-hidden">${f}</span>`;
            } else if (isExecutable(f)) {
                return `<span class="file-executable">${f}</span>`;
            }
            return f;
        }).join('  ');
    },

    cd: (args) => {
        if (args.length === 0) {
            currentPath = '/home/visitor';
            updatePrompt();
            return '';
        }

        const target = resolvePath(args[0]);

        if (!pathExists(target)) {
            return `<span class="error">cd: ${args[0]}: 没有那个文件或目录</span>`;
        }

        if (!isDirectory(target)) {
            return `<span class="error">cd: ${args[0]}: 不是目录</span>`;
        }

        currentPath = target;
        updatePrompt();
        return '';
    },

    cat: (args) => {
        if (args.length === 0) {
            return `<span class="error">cat: 缺少文件参数</span>`;
        }

        const results = [];
        for (const arg of args) {
            const path = resolvePath(arg);

            if (fileContents[path]) {
                results.push(escapeHtml(fileContents[path]));
            } else if (isDirectory(path)) {
                results.push(`<span class="error">cat: ${arg}: 是一个目录</span>`);
            } else {
                results.push(`<span class="error">cat: ${arg}: 没有那个文件或目录</span>`);
            }
        }

        return results.join('\n');
    },

    pwd: () => currentPath,

    whoami: () => {
        return `visitor

<span class="dim">但如果你能找到彩蛋...</span>
<span class="dim">你就是我们在找的人 :)</span>`;
    },

    clear: () => {
        output.innerHTML = '';
        return null; // 不输出任何内容
    },

    echo: (args) => {
        const text = args.join(' ');
        // 支持简单的 base64 解码彩蛋
        if (text.includes('|') && text.includes('base64')) {
            const match = text.match(/"([^"]+)"|'([^']+)'|(\S+)/);
            if (match) {
                const encoded = match[1] || match[2] || match[3];
                try {
                    return atob(encoded);
                } catch {
                    return text;
                }
            }
        }
        return escapeHtml(text);
    },

    tree: (args) => {
        const targetPath = args[0] ? resolvePath(args[0]) : currentPath;

        function buildTree(path, prefix = '') {
            if (!isDirectory(path)) return '';

            const dir = fileSystem[path];
            const children = dir.children.filter(f => !isHidden(f));
            let result = '';

            children.forEach((child, i) => {
                const isLast = i === children.length - 1;
                const connector = isLast ? '└── ' : '├── ';
                const childPath = `${path}/${child}`;

                if (isDirectory(childPath)) {
                    result += `${prefix}${connector}<span class="file-directory">${child}</span>\n`;
                    result += buildTree(childPath, prefix + (isLast ? '    ' : '│   '));
                } else if (isExecutable(child)) {
                    result += `${prefix}${connector}<span class="file-executable">${child}</span>\n`;
                } else {
                    result += `${prefix}${connector}${child}\n`;
                }
            });

            return result;
        }

        const shortPath = targetPath.replace('/home/visitor', '~');
        return `<span class="file-directory">${shortPath}</span>\n` + buildTree(targetPath);
    },

    file: (args) => {
        if (args.length === 0) {
            return `<span class="error">file: 缺少文件参数</span>`;
        }

        const path = resolvePath(args[0]);

        if (!pathExists(path)) {
            return `<span class="error">${args[0]}: 无法打开 (没有那个文件或目录)</span>`;
        }

        if (isDirectory(path)) {
            return `${args[0]}: directory`;
        }

        const name = args[0];
        if (name.endsWith('.md')) return `${name}: UTF-8 Unicode text (Markdown)`;
        if (name.endsWith('.txt')) return `${name}: UTF-8 Unicode text`;
        if (name.endsWith('.sh')) return `${name}: Bourne-Again shell script, ASCII text executable`;
        if (name.endsWith('.py')) return `${name}: Python script, ASCII text executable`;
        if (name.endsWith('.yaml') || name.endsWith('.yml')) return `${name}: YAML configuration file`;
        if (name.startsWith('.')) return `${name}: ASCII text (hidden file)`;

        return `${name}: ASCII text`;
    },

    history: () => {
        if (commandHistory.length === 0) {
            return '<span class="dim">历史记录为空</span>';
        }
        return commandHistory.map((cmd, i) => `  ${(i + 1).toString().padStart(3)}  ${escapeHtml(cmd)}`).join('\n');
    },

    date: () => {
        return new Date().toString();
    },

    uname: (args) => {
        if (args.includes('-a')) {
            return 'AI-Native-OS 6.1.0-ai #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
        }
        return 'AI-Native-OS';
    },

    sudo: (args) => {
        sudoAttempts++;

        if (sudoAttempts === 1) {
            return `<span class="error">[sudo] password for visitor: </span>
<span class="error">Sorry, try again.</span>
<span class="dim">你以为你是谁？root？</span>`;
        } else if (sudoAttempts === 2) {
            return `<span class="error">visitor is not in the sudoers file. This incident will be reported.</span>
<span class="dim">（开玩笑的，不会真的报告）</span>`;
        } else if (sudoAttempts === 3) {
            return `<span class="warning">好吧好吧，你赢了。但这里真的没有 sudo。</span>
<span class="dim">提示：不需要 sudo 也能找到彩蛋哦～</span>`;
        } else {
            return `<span class="error">认真的？你都试了 ${sudoAttempts} 次了...</span>`;
        }
    },

    rm: (args) => {
        if (args.includes('-rf') && args.includes('/')) {
            return `<span class="error">NICE TRY! 但这是只读文件系统 :P</span>
<span class="dim">你真的以为我会让你删除东西吗？</span>`;
        }
        return `<span class="error">rm: 权限不够 (这是面试，不是黑客大赛)</span>`;
    },

    vim: () => `<span class="warning">vim: 你确定？这可是个只进不出的编辑器...</span>
<span class="dim">开玩笑的，这里没有 vim。用 cat 看文件吧。</span>`,

    nano: () => `<span class="dim">nano: 命令未找到 (但你选择 nano 而不是 vim 说明你是个正常人)</span>`,

    emacs: () => `<span class="dim">emacs: 这不是操作系统，只是个终端模拟器</span>`,

    git: (args) => {
        if (args[0] === 'status') {
            return `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

<span class="dim">（你在找什么？代码在 projects 目录里）</span>`;
        }
        return `<span class="dim">git: 这是一个模拟终端，不是真的 Git 仓库</span>`;
    },

    python: () => `<span class="dim">Python 3.11.0 (但这只是个模拟环境)</span>
<span class="dim">试试 cat 命令查看 .py 文件的内容</span>`,

    node: () => `<span class="dim">这里没有 Node.js，但你可以看看源代码...</span>
<span class="dim">Ctrl+Shift+I 或者 F12 :)</span>`,

    curl: () => `<span class="dim">curl: 这是模拟终端，没有网络访问</span>
<span class="dim">但你都想到用 curl 了，不错哦</span>`,

    wget: () => `<span class="dim">wget: 同上，这里没有真正的网络</span>`,

    ssh: () => `<span class="warning">正在连接 ai-native.local...</span>
<span class="error">Connection refused (哈哈，骗你的)</span>`,

    exit: () => {
        return `<span class="dim">为什么要离开？彩蛋还没找到呢！</span>
<span class="dim">提示：ls -a</span>`;
    },

    logout: () => commands.exit(),

    man: (args) => {
        if (args.length === 0) {
            return `<span class="error">man: 需要指定命令名称</span>`;
        }
        return `<span class="dim">No manual entry for ${args[0]}</span>
<span class="dim">试试 help 命令？</span>`;
    },

    // 彩蛋命令：运行 .decode 脚本
    './decode': (args) => {
        const password = args[0] || '';

        if (!password) {
            return `请输入密码: <span class="dim">(Usage: ./decode <password>)</span>`;
        }

        if (password === 'hallucination_detector_v2') {
            return `
<span class="success">╔════════════════════════════════════════════════════════════╗</span>
<span class="success">║  ★ ★ ★  恭喜你，真正的探索者！ ★ ★ ★                      ║</span>
<span class="success">╠════════════════════════════════════════════════════════════╣</span>
<span class="success">║                                                            ║</span>
<span class="success">║  你找到了隐藏的彩蛋！                                      ║</span>
<span class="success">║                                                            ║</span>
<span class="highlight">║  你的专属代码: AINATIVE-2024-HACKER-7f3d8a                 ║</span>
<span class="success">║                                                            ║</span>
<span class="success">║  在申请邮件中附上这个代码，直接获得面试机会！              ║</span>
<span class="success">║                                                            ║</span>
<span class="success">║  你展示了：                                                ║</span>
<span class="success">║  ✓ Linux 基础知识 (ls -a)                                 ║</span>
<span class="success">║  ✓ 编码识别能力 (Base64)                                  ║</span>
<span class="success">║  ✓ 细节观察力 (注释中的密码)                              ║</span>
<span class="success">║  ✓ 探索精神 (不放过任何线索)                              ║</span>
<span class="success">║                                                            ║</span>
<span class="success">║  这正是我们在寻找的人才特质。                              ║</span>
<span class="success">║                                                            ║</span>
<span class="success">╚════════════════════════════════════════════════════════════╝</span>

<span class="dim">P.S. 现在试试输入 'matrix' 看看？</span>`;
        } else {
            return `<span class="error">密码错误。</span>
<span class="dim">提示：仔细看看 job_description.txt 的注释...</span>`;
        }
    },

    './.decode': function(args) { return commands['./decode'](args); },

    // Matrix 彩蛋
    matrix: () => {
        matrixMode = true;
        startMatrixRain();
        return `<span class="highlight">Welcome to the Matrix...</span>
<span class="dim">(输入任意命令退出)</span>`;
    },

    // Base64 解码助手
    base64: (args) => {
        if (args[0] === '-d' && args[1]) {
            try {
                return atob(args[1]);
            } catch {
                return '<span class="error">base64: 无效的输入</span>';
            }
        }
        return '<span class="dim">Usage: base64 -d <encoded_string></span>';
    },

    // 运行脚本
    './contact.sh': () => {
        return `========================================
         联系方式
========================================

  邮箱: hiring@example.com
  主题: [AI Native] 技术岗位申请

  请在邮件中附上：
  1. 你的简历
  2. GitHub/作品链接
  3. 为什么选择我们

  如果你找到了彩蛋，请一并告诉我们 ;)

========================================`;
    },

    // neofetch 风格的系统信息
    neofetch: () => {
        return `
<span class="ascii-art">       ▄▄▄       ██▓    </span>    <span class="highlight">visitor</span>@<span class="highlight">ai-native</span>
<span class="ascii-art">      ▒████▄    ▓██▒    </span>    ──────────────────
<span class="ascii-art">      ▒██  ▀█▄  ▒██▒    </span>    <span class="prompt-text">OS:</span> AI-Native-OS 6.1.0
<span class="ascii-art">      ░██▄▄▄▄██ ░██░    </span>    <span class="prompt-text">Host:</span> Your Browser
<span class="ascii-art">       ▓█   ▓██▒░██░    </span>    <span class="prompt-text">Kernel:</span> JavaScript v8
<span class="ascii-art">       ▒▒   ▓▒█░░▓      </span>    <span class="prompt-text">Shell:</span> web-shell 1.0.0
<span class="ascii-art">        ▒   ▒▒ ░ ▒ ░    </span>    <span class="prompt-text">Terminal:</span> 80x24
<span class="ascii-art">        ░   ▒    ▒ ░    </span>    <span class="prompt-text">CPU:</span> Your Brain @ 3GHz
<span class="ascii-art">            ░  ░ ░      </span>    <span class="prompt-text">Memory:</span> ∞ / ∞ MB
                             <span class="prompt-text">GPU:</span> Imagination RTX

<span class="dim">提示：你找到隐藏文件了吗？</span>`;
    },

    cowsay: (args) => {
        const text = args.join(' ') || 'Moo!';
        const line = '_'.repeat(text.length + 2);
        return `
 ${line}
< ${text} >
 ${'-'.repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
    },

    fortune: () => {
        const fortunes = [
            "你将在代码中发现隐藏的真相。",
            "ls -a 是通往秘密的钥匙。",
            "好奇心害死猫，但成就了程序员。",
            "Base64 解码可能是你的下一步。",
            "注释里藏着答案。",
            "真正的 hacker 不会放过任何细节。",
            "你距离彩蛋只有几个命令的距离。",
        ];
        return `<span class="dim">${fortunes[Math.floor(Math.random() * fortunes.length)]}</span>`;
    },

    ping: (args) => {
        if (args.length === 0) {
            return '<span class="error">ping: 用法错误</span>';
        }
        return `PING ${args[0]} (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.042 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.039 ms
<span class="dim">--- 这是模拟的 ping，不是真的网络请求 ---</span>`;
    },

    hostname: () => 'ai-native-terminal',

    uptime: () => {
        const hours = Math.floor(Math.random() * 1000);
        return ` ${new Date().toTimeString().split(' ')[0]} up ${hours} days, 4:20, 1 user, load average: 0.42, 0.42, 0.42`;
    },

    id: () => 'uid=1000(visitor) gid=1000(visitor) groups=1000(visitor),27(curious_minds)',

    env: () => `USER=visitor
HOME=/home/visitor
SHELL=/bin/bash
TERM=xterm-256color
LANG=zh_CN.UTF-8
SECRET_HINT=try_ls_-a
PATH=/usr/local/bin:/usr/bin:/bin`,

    printenv: function() { return commands.env(); },

    which: (args) => {
        if (!args[0]) return '<span class="error">which: 缺少参数</span>';
        const cmds = ['ls', 'cd', 'cat', 'pwd', 'echo', 'clear', 'help'];
        if (cmds.includes(args[0])) {
            return `/usr/bin/${args[0]}`;
        }
        return `${args[0]} not found`;
    },

    type: (args) => {
        if (!args[0]) return '<span class="error">type: 缺少参数</span>';
        if (commands[args[0]]) {
            return `${args[0]} is a shell builtin`;
        }
        return `<span class="error">-bash: type: ${args[0]}: not found</span>`;
    },

    alias: () => `alias ll='ls -la'
alias la='ls -a'
alias ..='cd ..'
alias find-easter-egg='echo "Nice try! But you need to find it yourself :)"'`,

    grep: (args) => {
        if (args.length < 2) {
            return '<span class="error">grep: 用法: grep PATTERN FILE</span>';
        }
        return `<span class="dim">grep: 这是模拟终端。试试用 cat 查看文件内容？</span>`;
    },

    find: (args) => {
        if (args.includes('-name') && args.includes('*secret*')) {
            return '<span class="highlight">./.secret</span>\n<span class="dim">你找到我了！用 cat 看看里面有什么？</span>';
        }
        return '<span class="dim">find: 这是模拟终端。试试 ls -a 找隐藏文件？</span>';
    },

    head: (args) => {
        if (!args[0]) return '<span class="error">head: 缺少文件参数</span>';
        const path = resolvePath(args[0]);
        if (fileContents[path]) {
            return fileContents[path].split('\n').slice(0, 10).join('\n');
        }
        return `<span class="error">head: 无法打开 '${args[0]}'</span>`;
    },

    tail: (args) => {
        if (!args[0]) return '<span class="error">tail: 缺少文件参数</span>';
        const path = resolvePath(args[0]);
        if (fileContents[path]) {
            return fileContents[path].split('\n').slice(-10).join('\n');
        }
        return `<span class="error">tail: 无法打开 '${args[0]}'</span>`;
    },

    wc: (args) => {
        if (!args[0]) return '<span class="error">wc: 缺少文件参数</span>';
        const path = resolvePath(args[0]);
        if (fileContents[path]) {
            const content = fileContents[path];
            const lines = content.split('\n').length;
            const words = content.split(/\s+/).length;
            const chars = content.length;
            return `  ${lines}   ${words} ${chars} ${args[0]}`;
        }
        return `<span class="error">wc: ${args[0]}: 没有那个文件</span>`;
    },

    touch: () => '<span class="error">touch: 只读文件系统</span>',
    mkdir: () => '<span class="error">mkdir: 只读文件系统</span>',
    cp: () => '<span class="error">cp: 只读文件系统</span>',
    mv: () => '<span class="error">mv: 只读文件系统</span>',

    sl: () => {
        return `<span class="dim">
      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/
</span>
<span class="warning">你是不是想输入 ls？</span>`;
    },

    // 几个有趣的隐藏命令
    hack: () => `<span class="error">ACCESS DENIED</span>
<span class="dim">好吧，你不是在黑客入侵，你是在找工作...</span>`,

    'sudo rm -rf /': () => `<span class="error">NICE TRY!</span>
<span class="warning">系统管理员已被通知... (开玩笑的)</span>
<span class="dim">认真的，这招在真实系统上可别用。</span>`,

    coffee: () => `<span class="warning">
   ( (
    ) )
  ........
  |      |]
  \\      /
   \`----'
</span>
<span class="dim">咖啡已准备好！正是找彩蛋的好时候。</span>`,

    '42': () => '<span class="highlight">对，这就是生命、宇宙以及任何事情的终极答案。</span>',

    hello: () => 'Hello, World! 你好，探索者！',

    hi: () => commands.hello(),

    please: () => '<span class="dim">礼貌不能帮你获得 root 权限，但能帮你获得 offer :)</span>',
};

// ============================================
// 命令执行
// ============================================
function executeCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return '';

    // 停止 Matrix 模式
    if (matrixMode) {
        stopMatrixRain();
        matrixMode = false;
    }

    // 解析命令和参数
    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));

    // 处理管道命令 (简单支持)
    if (trimmed.includes('|')) {
        if (trimmed.includes('base64') && trimmed.includes('-d')) {
            const match = trimmed.match(/echo\s+["']?([^"'|]+)["']?\s*\|\s*base64\s+-d/);
            if (match) {
                try {
                    return atob(match[1].trim());
                } catch {
                    return '<span class="error">base64: 无效的输入</span>';
                }
            }
        }
        return '<span class="dim">管道命令支持有限，试试直接使用 base64 -d <string></span>';
    }

    // 特殊处理 ./xxx 形式的命令
    if (cmd.startsWith('./')) {
        if (commands[cmd]) {
            return commands[cmd](args);
        }
        const filename = cmd.substring(2);
        const path = resolvePath(filename);
        if (fileContents[path]) {
            if (isExecutable(filename)) {
                return `<span class="dim">模拟执行 ${filename}...</span>\n` + fileContents[path];
            }
            return `<span class="error">bash: ${cmd}: 权限不够</span>`;
        }
        return `<span class="error">bash: ${cmd}: 没有那个文件或目录</span>`;
    }

    // 查找命令
    if (commands[cmd]) {
        return commands[cmd](args);
    }

    // 处理可能的打字错误
    const suggestions = Object.keys(commands).filter(c =>
        c.startsWith(cmd[0]) && Math.abs(c.length - cmd.length) <= 2
    );

    if (suggestions.length > 0 && suggestions[0] !== cmd) {
        return `<span class="error">命令未找到: ${escapeHtml(cmd)}</span>
<span class="dim">你是不是想输入: ${suggestions.slice(0, 3).join(', ')}？</span>`;
    }

    return `<span class="error">命令未找到: ${escapeHtml(cmd)}</span>
<span class="dim">输入 'help' 查看可用命令</span>`;
}

// ============================================
// Matrix Rain Effect
// ============================================
let matrixInterval = null;
let matrixCanvas = null;

function startMatrixRain() {
    matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'matrix-rain';
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.zIndex = '998';
    matrixCanvas.style.pointerEvents = 'none';
    document.body.appendChild(matrixCanvas);

    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 33);
}

function stopMatrixRain() {
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
    }
    if (matrixCanvas) {
        matrixCanvas.remove();
        matrixCanvas = null;
    }
}

// ============================================
// 事件处理
// ============================================
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value;
        printCommand(cmd);

        if (cmd.trim()) {
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
        }

        const result = executeCommand(cmd);
        if (result !== null && result !== '') {
            print(result);
        }

        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        // 简单的自动补全
        const partial = input.value.trim();
        if (partial) {
            const matches = Object.keys(commands).filter(c => c.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                print(`\n${matches.join('  ')}`);
            }
        }
    } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        commands.clear();
    } else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        print('^C');
        input.value = '';
    }
});

// 点击任何地方都聚焦到输入框
document.addEventListener('click', () => {
    input.focus();
});

// ============================================
// 初始化
// ============================================
function init() {
    // 显示欢迎信息
    print(`
<span class="ascii-art">
    _    ___   _   _       _   _
   / \\  |_ _| | \\ | | __ _| |_(_)_   _____
  / _ \\  | |  |  \\| |/ _\` | __| \\ \\ / / _ \\
 / ___ \\ | |  | |\\  | (_| | |_| |\\ V /  __/
/_/   \\_\\___| |_| \\_|\\__,_|\\__|_| \\_/ \\___|

</span>
<span class="highlight">Welcome to AI Native Hiring Terminal v1.0.0</span>

<span class="dim">我们正在寻找那些不满足于表面的人。</span>
<span class="dim">如果你能看到这个终端，说明你已经迈出了第一步。</span>

输入 <span class="highlight">help</span> 查看可用命令，或者... 自己探索？

<span class="dim">提示：真正的探索者会发现隐藏的东西。</span>
`);

    updatePrompt();
    input.focus();

    // 控制台彩蛋
    console.log('%c🎯 你找到这里了？', 'font-size: 20px; font-weight: bold; color: #00ff41;');
    console.log('%c不错的开始！但这只是冰山一角...', 'font-size: 14px; color: #888;');
    console.log('%c试试在终端里输入 ls -a', 'font-size: 14px; color: #00d4ff;');
    console.log('%c', 'font-size: 1px; padding: 50px 100px; background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48dGV4dCB4PSIxMCIgeT0iNTAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMwMGZmNDEiPkhBQ0tFUl9FQVNURVJfRUdHPC90ZXh0Pjwvc3ZnPg==) no-repeat;');
}

// 启动
init();

// 在 window 上暴露一些有趣的函数供控制台使用
window.hint = () => {
    console.log('%c💡 提示', 'font-size: 16px; font-weight: bold; color: #ffcc00;');
    console.log('%c1. 在终端里输入 ls -a 查看隐藏文件', 'color: #888;');
    console.log('%c2. cat 命令可以查看文件内容', 'color: #888;');
    console.log('%c3. 注意观察文件中的注释', 'color: #888;');
    return '祝你好运！';
};

window.giveUp = () => {
    console.log('%c😅 真的要放弃吗？', 'font-size: 16px; color: #ff3366;');
    console.log('%c答案路径：ls -a → cat .secret → base64 解码 → cat job_description.txt 找密码 → ./decode <密码>', 'color: #888;');
    return '但我们更希望你自己找到答案 :)';
};
