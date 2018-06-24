import {markdownTab} from 'common/markdownTab';

const WINDOW_SELECTION = window.getSelection();
const DOM_SELECTION = document.selection;

// 获取选择编辑的内容
function getSelectText() {
    // 用户选择的文本
    let userSelection;
    // 输出文本
    let text;

    //现代浏览器
    if (WINDOW_SELECTION) {
        userSelection = WINDOW_SELECTION;
    }
    //IE浏览器 考虑到Opera，应该放在后面
    else if (DOM_SELECTION) {
        userSelection = DOM_SELECTION.createRange();
    }

    if (!(text = userSelection.text)) {
        text = userSelection;
    }

    // 选择的起点
    let start = text.anchorOffset;
    // 选择的终点
    let end = text.focusOffset;

    return {
        start: start,
        end: end,
        length: end - start,
        text: text.toString(),
        anchorOffset: userSelection.anchorOffset,
        focusOffset: userSelection.focusOffset
    }
}

/**
 * 替换选择的内容
 *
 * @param text
 */
function replaceSelectText(inputValue, text, selected, exit) {
    // 选择开始坐标
    let anchorOffset = selected.anchorOffset;
    // 选择结束坐标
    let focusOffset = selected.focusOffset;
    // 替换内容开始位置
    let replaceStart;
    // 替换内容结束位置
    let replaceEnd;

    if (anchorOffset === 1) {
        anchorOffset = inputValue.length + 1;
        focusOffset = anchorOffset
    }
    console.log(focusOffset)

    // 鼠标反向选择
    if (focusOffset < anchorOffset) {
        replaceStart = inputValue.substr(0, focusOffset);
        replaceEnd = inputValue.substr(anchorOffset, inputValue.length);
    }
    // 鼠标正向选择
    else {
        replaceStart = inputValue.substr(0, anchorOffset);
        replaceEnd = inputValue.substr(focusOffset, inputValue.length);
    }

    if (exit) {
        return text;
    }
    else {
        return `${replaceStart}${text}${replaceEnd}`;
    }
}

/*
 * 提供额外内容方法
 *
 * @param {String}
 * */
function etraContent(selected, text) {
    // 提供额外内容文本
    let etraContent;

    if (selected.length === 0) {
        // 提供额外的内容
        etraContent = text;
    } else {
        etraContent = selected.text;
    }

    return etraContent
}

// 添加粗体
export function addStrong(inputValue, dom) {
    // 获取选择的文本
    let selected = getSelectText();
    // 提供额外内容方法
    let content = etraContent(selected, markdownTab.strongText);
    // 替换的文本
    let replaceText;

    // 替换选择内容并将光标设置到当前
    if ((inputValue.substr(selected.start - 2, 2) === '**' &&
        inputValue.substr(selected.end, 2) === '**')
        ||
        inputValue.substr(selected.end - 2, 2) === '**' &&
        inputValue.substr(selected.start, 2) === '**'
    ) {
        return replaceSelectText(inputValue, content, selected, true);
    }
    else {
        // 替换选择的内容
        return replaceSelectText(inputValue, `**${content}**`, selected);
    }
}

// 添加斜体
export function addItalic(inputValue) {
    // 获取选择的文本
    let selected = getSelectText();
    // 提供额外内容方法
    let content = etraContent(selected, markdownTab.italicText);

    // 替换选择内容并将光标设置到当前
    if ((inputValue.substr(selected.start - 1, 1) === '_' &&
        inputValue.substr(selected.end, 1) === '_')
        ||
        inputValue.substr(selected.end - 1, 1) === '_' &&
        inputValue.substr(selected.start, 1) === '_'
    ) {
        return replaceSelectText(inputValue, content, selected);
    }
    else {
        // 替换选择的内容
        return replaceSelectText(inputValue, `_${content}_`, selected);
    }
}

// 添加标题
export function addHeading(inputValue) {
    // 获取选择的文本
    let selected = getSelectText();
    // 提供额外内容方法
    let content = etraContent(selected, markdownTab.headingText);
    let pointer;
    let prevChar;

    console.log(selected)

    // 替换选择内容并将光标设置到当前
    if ((pointer = 4, content.substr(selected.start - pointer, pointer) === '### ') ||
        (pointer = 3, content.substr(selected.start - pointer, pointer) === '###')
    ) {
        return replaceSelectText(inputValue, content, selected);
    }
    else if (selected.start > 0 && selected.end > 0 && (prevChar = content.substr(selected.start - 1, 1), !!prevChar && prevChar !== '\n')) {
        return replaceSelectText(inputValue, `\n\n###${content}`, selected);
    } else {
        // 元素前的空字符串
        return replaceSelectText(inputValue, `###${content}`, selected);
    }
}
