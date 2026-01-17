// 学习笔记管理系统 - 主JavaScript文件

// 当页面加载完成时运行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    initApp();
});

// 初始化应用
function initApp() {
    console.log('正在初始化应用...');
    
    // 1. 加载保存的笔记
    loadNotes();
    
    // 2. 绑定所有按钮的点击事件
    setupEventListeners();
    
    // 3. 更新统计信息
    updateStats();
    
    console.log('应用初始化完成！');
}

// 笔记数据 - 存储所有笔记
let notes = [
    {
        id: 1,
        title: "Git基础命令",
        content: "## Git常用命令\n\n### 1. 初始化仓库\n```bash\ngit init\n```\n\n### 2. 查看状态\n```bash\ngit status\n```\n\n### 3. 添加文件\n```bash\ngit add .\n```\n\n### 4. 提交更改\n```bash\ngit commit -m '提交说明'\n```\n\n### 5. 推送代码\n```bash\ngit push origin main\n```",
        tags: ["Git", "版本控制", "开发工具"],
        category: "技术学习",
        date: "2024-01-15",
        updated: "今天"
    },
    {
        id: 2,
        title: "HTML基础标签",
        content: "## HTML常用标签\n\n### 结构标签\n- `<html>`：根标签\n- `<head>`：头部信息\n- `<body>`：页面内容\n\n### 内容标签\n- `<h1>~<h6>`：标题\n- `<p>`：段落\n- `<div>`：容器\n- `<span>`：行内容器\n\n### 表单标签\n- `<input>`：输入框\n- `<button>`：按钮\n- `<textarea>`：多行文本",
        tags: ["HTML", "前端", "基础"],
        category: "技术学习", 
        date: "2024-01-14",
        updated: "昨天"
    },
    {
        id: 3,
        title: "CSS选择器",
        content: "## CSS选择器类型\n\n### 1. 元素选择器\n```css\np {\n    color: red;\n}\n```\n\n### 2. 类选择器\n```css\n.class-name {\n    color: blue;\n}\n```\n\n### 3. ID选择器\n```css\n#id-name {\n    color: green;\n}\n```\n\n### 4. 后代选择器\n```css\ndiv p {\n    color: purple;\n}\n```",
        tags: ["CSS", "前端", "样式"],
        category: "技术学习",
        date: "2024-01-13",
        updated: "前天"
    },
    {
        id: 4,
        title: "JavaScript基础",
        content: "## JavaScript基础知识\n\n### 变量声明\n```javascript\nlet name = '张三';\nconst age = 25;\nvar score = 100;\n```\n\n### 函数定义\n```javascript\nfunction greet(name) {\n    return 'Hello, ' + name;\n}\n\n// 箭头函数\nconst add = (a, b) => a + b;\n```\n\n### 条件语句\n```javascript\nif (age >= 18) {\n    console.log('成年人');\n} else {\n    console.log('未成年人');\n}\n```",
        tags: ["JavaScript", "编程", "基础"],
        category: "技术学习",
        date: "2024-01-12",
        updated: "3天前"
    }
];

// 绑定所有事件
function setupEventListeners() {
    console.log('正在绑定事件...');
    
    // 新建笔记按钮
    const newNoteBtn = document.querySelector('.btn-new-note');
    if (newNoteBtn) {
        newNoteBtn.addEventListener('click', showEditor);
        console.log('新建笔记按钮已绑定');
    }
    
    // 搜索功能
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchNotes(this.value);
        });
        console.log('搜索功能已绑定');
    }
    
    // 标签点击事件
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterByTag(this.textContent);
        });
    });
    console.log('标签功能已绑定');
}

// 显示所有笔记
function displayNotes(notesToShow = notes) {
    console.log('正在显示笔记，数量：', notesToShow.length);
    
    const notesGrid = document.getElementById('notesGrid');
    if (!notesGrid) {
        console.error('找不到笔记网格元素');
        return;
    }
    
    // 清空现有内容
    notesGrid.innerHTML = '';
    
    // 如果没有笔记
    if (notesToShow.length === 0) {
        notesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">没有找到笔记</h3>
                <p style="color: #999;">尝试搜索其他关键词或创建新笔记</p >
            </div>
        `;
        return;
    }
    
    // 生成笔记卡片
    notesToShow.forEach(note => {
        const noteCard = createNoteCard(note);
        notesGrid.appendChild(noteCard);
    });
    
    console.log('笔记显示完成');
}

// 创建单个笔记卡片
function createNoteCard(note) {
    console.log('正在创建笔记卡片：', note.title);
    
    // 创建卡片元素
    const card = document.createElement('div');
    card.className = 'note-card';
    card.dataset.id = note.id;
    
    // 创建标签HTML
    const tagsHTML = note.tags.map(tag => 
        `<span class="note-tag">${tag}</span>`
    ).join('');
    
    // 设置卡片内容
    card.innerHTML = `
        <div class="note-header">
            <h3 class="note-title">${note.title}</h3>
            <div class="note-date">${note.updated}</div>
        </div>
        <div class="note-content">
            ${formatContentPreview(note.content)}
        </div>
        <div class="note-footer">
            <div class="note-tags">${tagsHTML}</div>
            <span class="note-category">${note.category}</span>
        </div>
    `;
    
    // 添加点击事件
    card.addEventListener('click', function() {
        openNote(note.id);
    });
    
    return card;
}

// 格式化内容预览（简化Markdown）
function formatContentPreview(content) {
    console.log('正在格式化内容预览');
    
    // 移除Markdown标记
    let preview = content
        .replace(/^#+\s+/gm, '')      // 移除标题
        .replace(/`(.*?)`/g, '$1')    // 移除行内代码
        .replace(/```[\s\S]*?```/g, '') // 移除代码块
        .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体
        .replace(/\*(.*?)\*/g, '$1')    // 移除斜体
        
    // 限制长度
    if (preview.length > 200) {
        preview = preview.substring(0, 200) + '...';
    }
    
    // 换行转换
    preview = preview.replace(/\n/g, '<br>');
    
    return preview;
}

// 打开笔记详细内容
function openNote(noteId) {
    console.log('正在打开笔记：', noteId);
    
    const note = notes.find(n => n.id === noteId);
    if (!note) {
        console.error('找不到笔记：', noteId);
        return;
    }
    
    // 显示编辑器并填充内容
    showEditor();
    
    // 填充编辑器
    document.getElementById('editor-title').value = note.title;
    document.getElementById('editor-content').value = note.content;
    
    // 标记当前编辑的笔记
    document.querySelector('.editor-container').dataset.editingNote = noteId;
    
    alert('正在打开笔记：' + note.title + '\n\n这个功能正在开发中...');
}

// 显示编辑器
function showEditor() {
    console.log('正在显示编辑器');
    
    const editor = document.querySelector('.editor-container');
    if (editor) {
        editor.style.display = 'block';
        
        // 滚动到编辑器
        editor.scrollIntoView({ behavior: 'smooth' });
        
        // 如果没有在编辑现有笔记，清空编辑器
        if (!editor.dataset.editingNote) {
            document.getElementById('editor-title').value = '';
            document.getElementById('editor-content').value = '';
        }
    }
}

// 隐藏编辑器
function hideEditor() {
    console.log('正在隐藏编辑器');
    
    const editor = document.querySelector('.editor-container');
    if (editor) {
        editor.style.display = 'none';
        editor.dataset.editingNote = '';
    }
}

// 保存笔记
function saveNote() {
    console.log('正在保存笔记...');
    
    const title = document.getElementById('editor-title').value.trim();
    const content = document.getElementById('editor-content').value.trim();
    const editor = document.querySelector('.editor-container');
    const noteId = editor.dataset.editingNote;
    
    // 验证输入
    if (!title) {
        alert('请输入笔记标题！');
        return;
    }
    
    if (!content) {
        alert('请输入笔记内容！');
        return;
    }
    
    if (noteId) {
        // 更新现有笔记
        const index = notes.findIndex(n => n.id === parseInt(noteId));
        if (index !== -1) {
            notes[index].title = title;
            notes[index].content = content;
            notes[index].updated = '刚刚';
            console.log('笔记已更新：', title);
        }
    } else {
        // 创建新笔记
        const newNote = {
            id: Date.now(), // 使用时间戳作为ID
            title: title,
            content: content,
            tags: extractTags(content),
            category: '技术学习',
            date: new Date().toISOString().split('T')[0],
            updated: '刚刚'
        };
        
        notes.unshift(newNote); // 添加到开头
        console.log('新笔记已创建：', title);
    }
    
    // 保存到本地存储
    saveToLocalStorage();
    
    // 更新显示
    displayNotes();
    
    // 更新统计
    updateStats();
    
    // 隐藏编辑器
    hideEditor();
    
    // 显示成功消息
    showMessage('笔记保存成功！', 'success');
}

// 从内容提取标签
function extractTags(content) {
    console.log('正在提取标签...');
    
    const tags = [];
    const techKeywords = ['JavaScript', 'HTML', 'CSS', 'Git', 'Python', 'React', 'Vue', 'Node.js', '前端', '后端'];
    
    techKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
            tags.push(keyword);
        }
    });
    
    // 如果没找到标签，添加默认标签
    if (tags.length === 0) {
        tags.push('学习笔记');
    }
    
    console.log('提取到的标签：', tags);
    return tags.slice(0, 3); // 最多返回3个标签
}

// 搜索笔记
function searchNotes(keyword) {
    console.log('正在搜索：', keyword);
    
    if (!keyword.trim()) {
        // 如果搜索框为空，显示所有笔记
        displayNotes();
        return;
    }
    
    const searchTerm = keyword.toLowerCase();
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(searchTerm) ||
               note.content.toLowerCase().includes(searchTerm) ||
               note.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
               note.category.toLowerCase().includes(searchTerm);
    });
    
    console.log('找到笔记数量：', filteredNotes.length);
    displayNotes(filteredNotes);
}

// 按标签过滤
function filterByTag(tagName) {
    console.log('正在按标签过滤：', tagName);
    
    const filteredNotes = notes.filter(note => 
        note.tags.some(tag => tag === tagName)
    );
    
    displayNotes(filteredNotes);
    showMessage(`显示标签为"${tagName}"的笔记`, 'info');
}

// 更新统计信息
function updateStats() {
    console.log('正在更新统计信息...');
    
    const stats = {
        total: notes.length,
        today: notes.filter(n => n.updated === '刚刚' || n.updated === '今天').length,
        tags: [...new Set(notes.flatMap(n => n.tags))].length,
        categories: [...new Set(notes.map(n => n.category))].length
    };
    
    // 更新统计显示
    document.querySelectorAll('.stat-number').forEach(element => {
        const statType = element.parentElement.querySelector('.stat-label').textContent;
        
        switch(statType) {
            case '总笔记数':
                element.textContent = stats.total;
                break;
            case '今日更新':
                element.textContent = stats.today;
                break;
            case '标签数量':
                element.textContent = stats.tags;
                break;
            case '分类数量':
                element.textContent = stats.categories;
                break;
        }
    });
    
    console.log('统计信息已更新：', stats);
}

// 保存到本地存储
function saveToLocalStorage() {
    console.log('正在保存到本地存储...');
    
    try {
        localStorage.setItem('learnNotesData', JSON.stringify(notes));
        console.log('数据已保存到本地存储');
    } catch (error) {
        console.error('保存到本地存储失败：', error);
    }
}

// 从本地存储加载
function loadNotes() {
    console.log('正在从本地存储加载笔记...');
    
    try {
        const savedData = localStorage.getItem('learnNotesData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                notes = parsedData;
                console.log('从本地存储加载了', notes.length, '条笔记');
            }
        }
    } catch (error) {
        console.error('从本地存储加载失败：', error);
    }
    
    // 显示笔记
    displayNotes();
}

// 显示消息提示
function showMessage(message, type = 'info') {
    console.log('显示消息：', message);
    
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'success' ? '#48bb78' : 
                     type === 'error' ? '#e53e3e' : '#4299e1'};
        color: white;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // 3秒后移除
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageEl.parentNode) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

// 导出笔记
function exportNotes() {
    console.log('正在导出笔记...');
    
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = 'learn-notes-backup.json';
    downloadLink.click();
    
    showMessage('笔记导出成功！', 'success');
}

// 导入笔记
function importNotes(event) {
    console.log('正在导入笔记...');
    
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedNotes = JSON.parse(e.target.result);
            if (Array.isArray(importedNotes)) {
                notes = importedNotes;
                saveToLocalStorage();
                displayNotes();
                updateStats();
                showMessage('笔记导入成功！', 'success');
            } else {
                showMessage('文件格式不正确', 'error');
            }
        } catch (error) {
            showMessage('导入失败：' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}