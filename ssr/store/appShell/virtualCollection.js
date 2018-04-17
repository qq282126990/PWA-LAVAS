/**
 * @file appShell/appHeader module
 * @author lavas
 */

export const SET_CELLSIZE_AND_POSITION_GETTER = 'SET_CELLSIZE_AND_POSITION_GETTER';
export const SET_COLLENTION = 'SET_COLLENTION';
export const SET_WIDTH = 'SET_WIDTH';
export const SET_HEIGHT = 'SET_HEIGHT';
export const SET_SCROLLTOP = 'SET_SCROLLTOP';

export const state = () => {
    return {
        /**
         * 我们需要一个方法去计算这些块的信息 -> 用于计算每一个块显示的大小和显示的位置
         *
         * @type {Function}
         */
        cellSizeAndPositionGetter: null,
        /**
         * 列表数据
         *
         * @type {Array}
         */
        collection: [],
        /**
         * 收集的宽度
         *
         * @type {Number}
         */
        width: 0,
        /**
         * 收集的高度
         *
         * @type {Number}
         */
        height: 0,
        /**
         * 收集的滚动高度
         *
         * @type {Number}
         */
        scrollTop: 0
    };
};

export const mutations = {
    [SET_CELLSIZE_AND_POSITION_GETTER] (state, cellSizeAndPositionGetter) {
        state.cellSizeAndPositionGetter = cellSizeAndPositionGetter
    },
    [SET_COLLENTION] (state, collection) {
        state.collection = collection
    },
    [SET_WIDTH] (state, width) {
        state.width = width
    },
    [SET_HEIGHT] (state, height) {
        state.height = height
    },
    [SET_SCROLLTOP] (state, scrollTop) {
        state.scrollTop = scrollTop
    }
};

export const actions = {
    /**
     * 一个方法去计算这些块的信息 -> 用于计算每一个块显示的大小和显示的位置
     *
     * @param {Function}
     */
    cellSizeAndPositionGetter ({commit}, cellSizeAndPositionGetter) {
        commit (SET_CELLSIZE_AND_POSITION_GETTER, cellSizeAndPositionGetter);
    },
    /**
     * 列表数据
     *
     * @param {Array}
     */
    collection ({commit}, collection) {
        commit (SET_COLLENTION, collection);
    },
    /**
     * 收集的宽度
     *
     * @param {Number}
     */
    width ({commit}, width) {
        commit (SET_WIDTH, width);
    },
    /**
     * 收集的高度
     *
     * @param {Number}
     */
    height ({commit}, height) {
        commit (SET_HEIGHT, height);
    },
    /**
     * 收集的滚动高度
     *
     * @param {Number}
     */
    scrollTop ({commit}, scrollTop) {
        commit (SET_SCROLLTOP, scrollTop);
    }
};
