/**
 * AI Native Hiring Terminal v3.0 - Fun Edition
 * 更简单、更有趣的招聘彩蛋
 *
 * 特色：钢琴音效、粒子动画、霓虹效果
 */

// ============================================
// 钢琴音效系统
// ============================================
const Piano = {
    ctx: null,
    notes: {
        'a': 261.63, 's': 293.66, 'd': 329.63, 'f': 349.23,
        'g': 392.00, 'h': 440.00, 'j': 493.88, 'k': 523.25,
        'l': 587.33, ';': 659.25
    },

    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },

    play(note) {
        if (!this.ctx) this.init();
        const freq = this.notes[note];
        if (!freq) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);

        // 创建视觉反馈
        createNoteParticle(note);
    },

    // 播放旋律
    playMelody(melody, tempo = 200) {
        melody.forEach((note, i) => {
            setTimeout(() => this.play(note), i * tempo);
        });
    }
};

// ============================================
// 粒子系统
// ============================================
let particles = [];
let particleCanvas, particleCtx;

function initParticles() {
    particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'particle-canvas';
    particleCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1001;';
    document.body.appendChild(particleCanvas);
    particleCtx = particleCanvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateParticles();
}

function resizeCanvas() {
    if (particleCanvas) {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    }
}

function createNoteParticle(note) {
    const colors = ['#ff0080', '#00ff80', '#0080ff', '#ff8000', '#8000ff', '#00ffff'];
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight - 100;

    // 减少粒子数量以提高性能
    for (let i = 0; i < 8; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 10,
            vy: -Math.random() * 15 - 5,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            note: note.toUpperCase()
        });
    }
}

function createSuccessExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const colors = ['#00ff00', '#00ff80', '#80ff00', '#ffff00', '#00ffff'];

    // 减少粒子数量以提高性能
    for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 / 50) * i;
        const speed = Math.random() * 12 + 4;
        particles.push({
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1
        });
    }

    // 播放胜利旋律
    Piano.playMelody(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'], 100);
}

function createFirework(x, y) {
    const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#00ffff', '#0077ff', '#ff00ff'];

    // 减少粒子数量以提高性能
    for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 / 30) * i;
        const speed = Math.random() * 7 + 3;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1
        });
    }
}

function animateParticles() {
    if (!particleCtx) return;

    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3; // 重力
        p.alpha -= 0.02;

        if (p.alpha <= 0) return false;

        particleCtx.save();
        particleCtx.globalAlpha = p.alpha;
        particleCtx.fillStyle = p.color;
        particleCtx.shadowBlur = 10;
        particleCtx.shadowColor = p.color;
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particleCtx.fill();

        if (p.note) {
            particleCtx.fillStyle = '#fff';
            particleCtx.font = 'bold 16px monospace';
            particleCtx.fillText(p.note, p.x - 5, p.y + 5);
        }

        particleCtx.restore();

        return true;
    });

    requestAnimationFrame(animateParticles);
}

// ============================================
// 霓虹文字效果
// ============================================
function createNeonText(text, container) {
    const neon = document.createElement('div');
    neon.className = 'neon-text';
    neon.innerHTML = text;
    container.appendChild(neon);

    setTimeout(() => neon.remove(), 3000);
}

// ============================================
// 简化的文件系统
// ============================================
const files = {
    'README.md': `# 🎮 欢迎来到 AI Native！

我们正在寻找有趣的灵魂。

## 🎹 试试这些命令：

  piano      - 弹钢琴！(按 A S D F G H J K L)
  firework   - 放烟花！
  disco      - 蹦迪模式！
  secret     - 查看彩蛋提示
  job        - 查看岗位信息
  apply      - 如何申请

## 💡 小提示

输入 'secret' 看看有什么惊喜...
`,

    'job': `
╔═══════════════════════════════════════════════════════╗
║           🚀 AI NATIVE - 我们在招人！                  ║
╚═══════════════════════════════════════════════════════╝

【我们是谁】
一家相信 AI 将改变一切的公司。
你的同事可能是 Claude。

【我们要什么样的人】
• 对技术有热情
• 喜欢探索新事物
• 能找到这个页面的彩蛋 :)

【技术栈】
Python / TypeScript / AI / LLM

【福利】
🖥️ 顶配 MacBook Pro
☕ 无限咖啡
🎮 弹性工作
💰 有竞争力的薪资
`,

    'secret': `
🎯 彩蛋提示：

这个页面藏着一个秘密代码。
找到它，直接获得面试机会！

提示：
1. 试试输入 'magic'
2. 或者...用键盘弹一首歌？
   (按顺序弹: A S D F G H J K)

找到彩蛋后，发邮件告诉我们！
`,

    'apply': `
📧 如何申请：

邮箱: team@indievolve.com
主题: [求职] 我找到了彩蛋！

附上：
1. 你的简历
2. GitHub 链接
3. 你找到的彩蛋代码

我们会优先查看找到彩蛋的简历！
`
};

// ============================================
// 终端核心
// ============================================
let commandHistory = [];
let historyIndex = -1;
let discoMode = false;
let discoInterval = null;
let pianoMode = false;
let easterEggFound = false;

const output = document.getElementById('output');
const input = document.getElementById('command-input');

function print(html) {
    const div = document.createElement('div');
    div.className = 'line';
    div.innerHTML = html;
    output.appendChild(div);
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

function printTyping(text, speed = 30) {
    return new Promise(resolve => {
        const div = document.createElement('div');
        div.className = 'line typing-line';
        output.appendChild(div);

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                div.innerHTML += text[i] === '\n' ? '<br>' : text[i];
                i++;
                output.parentElement.scrollTop = output.parentElement.scrollHeight;
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

// ============================================
// 命令系统
// ============================================
const commands = {
    help: () => `
<span class="cmd">可用命令：</span>

  <span class="highlight">help</span>      - 显示帮助
  <span class="highlight">cat</span>       - 查看文件 (cat README.md)
  <span class="highlight">ls</span>        - 列出文件
  <span class="highlight">clear</span>     - 清屏

<span class="cmd">🎮 有趣的命令：</span>

  <span class="highlight">piano</span>     - 弹钢琴模式 🎹
  <span class="highlight">firework</span>  - 放烟花 🎆
  <span class="highlight">disco</span>     - 蹦迪模式 🕺
  <span class="highlight">magic</span>     - ???
  <span class="highlight">rain</span>      - 代码雨 🌧️
  <span class="highlight">nyan</span>      - 彩虹猫 🌈

<span class="dim">提示: 试试 'secret' 命令...</span>
`,

    ls: () => `
<span class="file">README.md</span>  <span class="file">job</span>  <span class="file">secret</span>  <span class="file">apply</span>
`,

    cat: (args) => {
        const file = args[0];
        if (!file) return '<span class="error">用法: cat <文件名></span>';
        if (files[file]) return files[file];
        return `<span class="error">文件不存在: ${file}</span>`;
    },

    clear: () => {
        output.innerHTML = '';
        return null;
    },

    piano: () => {
        pianoMode = true;
        Piano.init();
        return `
<span class="rainbow">🎹 钢琴模式已开启！</span>

用键盘弹奏：
<span class="piano-keys">
  A   S   D   F   G   H   J   K   L   ;
  Do  Re  Mi  Fa  Sol La  Si  Do  Re  Mi
</span>

<span class="dim">按 ESC 退出钢琴模式</span>
<span class="dim">试试弹: A S D F G H J K (一个音阶)</span>
`;
    },

    firework: () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFirework(
                    Math.random() * window.innerWidth,
                    Math.random() * (window.innerHeight / 2)
                );
                Piano.play(['a', 's', 'd', 'f', 'g'][i]);
            }, i * 300);
        }
        return '<span class="rainbow">🎆 烟花绽放！</span>';
    },

    disco: () => {
        if (discoMode) {
            discoMode = false;
            clearInterval(discoInterval);
            document.body.classList.remove('disco');
            return '<span class="dim">蹦迪模式关闭</span>';
        }

        discoMode = true;
        document.body.classList.add('disco');

        const colors = ['#ff0080', '#00ff80', '#0080ff', '#ff8000', '#8000ff'];
        let colorIndex = 0;

        discoInterval = setInterval(() => {
            document.documentElement.style.setProperty('--disco-color', colors[colorIndex]);
            colorIndex = (colorIndex + 1) % colors.length;
            createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, 500);

        // 播放节奏
        const beat = () => {
            if (!discoMode) return;
            Piano.play('a');
            setTimeout(() => Piano.play('d'), 250);
            setTimeout(() => Piano.play('g'), 500);
            setTimeout(() => Piano.play('d'), 750);
            setTimeout(beat, 1000);
        };
        beat();

        return `<span class="rainbow">🕺 蹦迪模式开启！再输入 disco 关闭</span>`;
    },

    magic: () => {
        if (!easterEggFound) {
            easterEggFound = true;
            createSuccessExplosion();

            return `
<span class="success neon-glow">
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎉🎉🎉 恭喜你找到了彩蛋！🎉🎉🎉                        ║
║                                                           ║
║   你的专属代码:                                           ║
║                                                           ║
║   ✨  AI-NATIVE-WINNER-2025  ✨                           ║
║                                                           ║
║   把这个代码发到 team@indievolve.com                      ║
║   直接获得面试机会！                                      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
</span>

<span class="dim">你展示了探索精神，这正是我们需要的！</span>
`;
        }
        return '<span class="rainbow">你已经找到彩蛋啦！代码是: AI-NATIVE-WINNER-2025</span>';
    },

    secret: () => files['secret'],
    job: () => files['job'],
    apply: () => files['apply'],

    rain: () => {
        startMatrixRain();
        return '<span class="highlight">🌧️ 代码雨来袭！按任意键停止</span>';
    },

    nyan: () => {
        Piano.playMelody(['a', 's', 'd', 's', 'a', 's', 'd', 'f', 'g', 'f', 'd', 's'], 150);

        return `<span class="rainbow">
█████████████████████████████
█████████████████████████████
████▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀████
███▀ ▄▀▀▀▄  ▄▀▀▀▄  ▄▀▀▀▄ ▀███
███ █ ▀ ▀ █▀ ▀ ▀ █▀ ▀ ▀ █ ███
███ █ ▀ ▀ █▀ ▀ ▀ █▀ ▀ ▀ █ ███
███▄ ▀▄▄▄▀  ▀▄▄▄▀  ▀▄▄▄▀ ▄███
████▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄████
█████████████████████████████
</span>
<span class="dim">喵～ 🐱🌈</span>`;
    },

    whoami: () => '<span class="highlight">一个正在寻找有趣工作的探索者</span>',

    sudo: () => '<span class="error">不需要 sudo，这里每个人都是 root 😎</span>',

    hack: () => {
        const texts = ['Accessing mainframe...', '...', 'Just kidding! 😄'];
        texts.forEach((t, i) => setTimeout(() => print(`<span class="highlight">${t}</span>`), i * 500));
        return '';
    },

    coffee: () => `<span class="highlight">
   ( (
    ) )
  .─────.
  |     |]
  \\     /
   \`───'
</span>
<span class="dim">☕ 咖啡时间！</span>`,

    love: () => {
        createSuccessExplosion();
        return '<span class="rainbow">❤️ Love is in the air! ❤️</span>';
    },

    hi: () => '<span class="highlight">你好！👋 试试 help 看看能做什么</span>',
    hello: () => commands.hi(),

    date: () => `<span class="dim">${new Date().toLocaleString()}</span>`,

    echo: (args) => args.join(' ') || '',

    exit: () => '<span class="dim">为什么要离开？彩蛋还没找到呢！试试 magic 命令？</span>',
};

// ============================================
// Matrix 雨效果
// ============================================
let matrixCanvas, matrixCtx, matrixInterval;

function startMatrixRain() {
    matrixCanvas = document.createElement('canvas');
    matrixCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:999;pointer-events:none;';
    document.body.appendChild(matrixCanvas);

    matrixCtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    matrixInterval = setInterval(() => {
        matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.fillStyle = '#0F0';
        matrixCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            matrixCtx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 33);

    document.addEventListener('keydown', stopMatrixRain, { once: true });
}

function stopMatrixRain() {
    if (matrixInterval) clearInterval(matrixInterval);
    if (matrixCanvas) matrixCanvas.remove();
}

// ============================================
// 命令执行
// ============================================
function executeCommand(cmd) {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (!command) return '';

    if (commands[command]) {
        return commands[command](args);
    }

    return `<span class="error">命令未找到: ${command}</span>
<span class="dim">输入 'help' 查看可用命令</span>`;
}

// ============================================
// 事件处理
// ============================================
input.addEventListener('keydown', (e) => {
    // 钢琴模式
    if (pianoMode && Piano.notes[e.key.toLowerCase()]) {
        Piano.play(e.key.toLowerCase());

        // 检测是否弹奏了完整音阶
        if (!easterEggFound) {
            checkMelody(e.key.toLowerCase());
        }
        return;
    }

    if (pianoMode && e.key === 'Escape') {
        pianoMode = false;
        print('<span class="dim">钢琴模式已关闭</span>');
        return;
    }

    if (e.key === 'Enter') {
        const cmd = input.value;
        print(`<span class="prompt">visitor@ai-native:~$</span> ${cmd}`);

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
        const partial = input.value.trim().toLowerCase();
        if (partial) {
            const matches = Object.keys(commands).filter(c => c.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0];
            }
        }
    }
});

// 点击聚焦
document.addEventListener('click', () => input.focus());

// 检测音阶彩蛋
let playedNotes = [];
function checkMelody(note) {
    playedNotes.push(note);
    if (playedNotes.length > 8) playedNotes.shift();

    const scale = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
    if (playedNotes.join('') === scale.join('')) {
        easterEggFound = true;
        createSuccessExplosion();
        print(`
<span class="success neon-glow">
╔═══════════════════════════════════════════════════════════╗
║   🎹 你弹出了完美的音阶！                                 ║
║                                                           ║
║   彩蛋代码: AI-NATIVE-WINNER-2025                         ║
║                                                           ║
║   你不仅会探索，还有音乐天赋！                            ║
║   发送到: team@indievolve.com                             ║
╚═══════════════════════════════════════════════════════════╝
</span>`);
    }
}

// ============================================
// 初始化
// ============================================
async function init() {
    initParticles();
    Piano.init();

    // 欢迎动画
    print(`<span class="ascii-art rainbow">
    _    ___   _   _       _   _
   / \\  |_ _| | \\ | | __ _| |_(_)_   _____
  / _ \\  | |  |  \\| |/ _\` | __| \\ \\ / / _ \\
 / ___ \\ | |  | |\\  | (_| | |_| |\\ V /  __/
/_/   \\_\\___| |_| \\_|\\__,_|\\__|_| \\_/ \\___|
</span>`);

    await new Promise(r => setTimeout(r, 500));

    print(`
<span class="highlight">🎮 欢迎来到 AI Native 招聘终端！</span>

<span class="dim">这不是普通的招聘页面...</span>
<span class="dim">这里藏着一些有趣的秘密等你发现！</span>

<span class="cmd">快速开始：</span>
  输入 <span class="highlight">help</span> 查看所有命令
  输入 <span class="highlight">piano</span> 弹钢琴 🎹
  输入 <span class="highlight">firework</span> 放烟花 🎆
  输入 <span class="highlight">secret</span> 查看彩蛋提示 💡

<span class="rainbow">找到彩蛋，获得面试机会！</span>
`);

    // 欢迎音效
    setTimeout(() => Piano.playMelody(['a', 'd', 'g'], 200), 500);

    input.focus();

    // 控制台彩蛋
    console.log('%c🎮 AI Native Hiring', 'font-size: 24px; font-weight: bold; color: #00ff00;');
    console.log('%c试试输入 magic 命令...', 'color: #888;');
}

init();
