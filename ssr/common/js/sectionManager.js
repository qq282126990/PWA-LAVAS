// 用于创建每一个块所包含的信息
import Section from "./section";

// 默认视图大小 600
const SECTION_SIZE = 600;

export default class SectionManager {
    constructor (sectionSize = SECTION_SIZE) {
        // 设置默认视图大小
        this._sectionSize = sectionSize;

        // 收集所有块的数据
        this._cellMetadata = [];

        // 用于收集一个块所包含的信息
        this._sections = {};
    }

    // 创建块
    registerCell ({cellMetadatum, index}) {
        // 收集所有块的数据
        this._cellMetadata[index] = cellMetadatum;

        // 该方法会返回所有的块的信息
        this.getSections (cellMetadatum).forEach (section => section.addCellIndex ({index}));
    }

    // 该方法会返回所有的块的信息
    getSections ({height, width, x, y}) {
        /*
          =>┏━━━━┯━━━━┯━━━━┓ 分割线 sectionX
           0┃0 0 ┊1 3 ┊6 6 ┃
           1┃0 0 ┊2 3 ┊6 6 ┃
          =>┠┈┈┈┈┼┈┈┈┈┼┈┈┈┈┨ 分割线 sectionX
           2┃4 4 ┊4 3 ┊7 8 ┃
           3┃4 4 ┊4 5 ┊9 9 ┃
            ┗━━━━┷━━━━┷━━━━┛
                 ↑    ↑
           分割线 sectionY 分割线sectionY
        */

        // 设置该块X轴的分割线
        const sectionXStart = Math.floor (x / this._sectionSize);
        const sectionXStop = Math.floor ((x + width - 1) / this._sectionSize);

        // 设置该块Y轴的分割线
        const sectionYStart = Math.floor (y / this._sectionSize);
        const sectionYStop = Math.floor ((y + height - 1) / this._sectionSize);

        // 设置用于保存所有重叠的块
        const sections = [];

        // 创建块的范围
        for (let sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
            for (let sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {

                // 为每一块都创建一个key用于查找
                const key = `${sectionX}.${sectionY}`;
                if (!this._sections[key]) {
                    this._sections[key] = new Section ({
                        height: this._sectionSize,
                        width: this._sectionSize,
                        x: sectionX * this._sectionSize,
                        y: sectionY * this._sectionSize
                    });
                }

                // 把每个块所包含的信息都保存起来
                sections.push (this._sections[key]);
            }
        }

        // 返回所有的块的信息
        return sections;
    }

    /** 基于当前注册单元的区段总数 */
    getTotalSectionCount () {
        return Object.keys (this._sections).length;
    }

    // 获取需要渲染那些块的索引
    // 一个块中可能会包含其他块的部分范围
    getCellIndices ({height, width, x, y}) {
        const indices = {};

        this.getSections ({height, width, x, y}).forEach ((section) => {

                // 获取所有块的索引
                return section.getCellIndices ().forEach ((index) => {
                    return indices[index] = index;
                });
            }
        );

        /// 因为indices是一个Object所以我们要把它转换成Number来得到索引
        return Object.keys(indices).map((index) => {
            return indices[index];
        });
    }

    // 获取单元元数据
    getCellMetadata (index) {
        return this._cellMetadata[index]
    }
}
