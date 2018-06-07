/**
 *窗口的显示部分 -> 当前viewPort显示的部分。
 *把cell(块)组合起来显示在当前的窗口。
 *这使我们能够更快地确定在窗口的给定区域显示哪些单元格。
 *显示具有固定的大小，并包含0到多个块（由其索引跟踪）。
 */


export default class Section {
    constructor({ height, width, x, y }) {
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;

        // 收集当前应该显示那些块
        this._indexMap = {};

        // 收集当前需要显示块的索引
        this._indices = [];
    }

    // 添加块的索引
    addCellIndex({ index }) {
        if (!this._indexMap[index]) {
            this._indexMap[index] = true;
            this._indices.push(index);
        }
    }

    // 获取所有块的索引
    getCellIndices() {
        return this._indices;
    }
}
