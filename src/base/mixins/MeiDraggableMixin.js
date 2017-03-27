/**
 * Mixin拖放功能
 * @type {Object}
 *
 * .......
 * |     |
 * |A|B| |
 * |     |
 * ```````
 * 现有组件(A)包含一个子组件(B),依次从组件上划过，
 * DOM：document->A->B->A->document
 * 事件触发顺序：dragenter(A)->dragenter(B)->dragleave(A)->dragenter(A)->dragleave(B)->dragleave(A)
 *
 * 遗留问题：
 * 1. 拖动太快造成leave没能正确执行
 */
const MeiDraggableMixin = {
    lastTargetIdx: undefined, //上次拖放的目标序列值
    lastTargetDom: undefined, //上次拖放进入的dom
    lastSourceDom: undefined, //上次拖放的源dom

    /**
     * [allowDrop description]
     * @param ev event
     */
    allowDrop: function(ev) {
        ev.preventDefault();
    },

    /**
     * 拖放开始，每当开始拖放某DOM就会发出该事件
     * @param ev event
     */
    drag: function(ev) {
        console.log('ondrag')
        let tar = this.getTarget(ev.target);
        this.lastSourceDom = tar;
        ev.dataTransfer.setData("source", this.indexOf(tar));
        tar.className = this.addClass(tar.className, 'dragged');
    },

    /**
     * 拖放进入，每当进入某DOM就会触发该事件
     * @param ev event
     */
    dragenter: function(ev) {
        console.log('dragenter ' + this.lastTargetIdx);
        let tar = this.getTarget(ev.target);
        let idx = this.indexOf(tar);

        this.lastTargetDom = ev.target;
        
        this.lastTargetIdx = idx;
        ev.dataTransfer.setData("target", idx);
        tar.className = this.addClass(tar.className, 'active');
    },

    /**
     * 拖放离开，每当离开某DOM就会触发该事件
     * @param ev event
     */
    dragleave: function(ev) {
        console.log('dragleave')
        console.log(ev.target)
        let tar// = this.getTarget(ev.target);

        if(this.hasDragChild){
            if(this.isTarget(ev.target)){
                //如果拖动组件包含子组件则只有恰好在当前组件上触发的leave才生效
                if(this.lastTargetDom != ev.target){
                    // 同时还需要忽略上次enter进入的dom和当前不是同一个dom的（依据事件触发顺序）
                    console.log('target is not last target')
                    return;
                }
                tar = ev.target;
            }else{
                console.log('target is not target')
                return;
            }
        }else{
            console.log('i dont have child')
            tar = this.getTarget(ev.target);
        }

        let className = this.removeClass(tar.className, 'active');
        tar.className = className;
    },

    /**
     * 拖放结束，计算getDragData数据的sortNum
     * @param ev event
     */
    drop: function(ev) {
        console.log('ondrop')
        let tar = this.getTarget(ev.target);
        let source = ev.dataTransfer.getData("source");
        let target = this.indexOf(tar);
        tar.className = this.removeClass(tar.className, 'active');

        if(this.lastSourceDom){
            //移除拖动dom的样式
            this.lastSourceDom.className = this.removeClass(this.lastSourceDom.className, 'dragged');
        }

        console.log(source + ' => ' + target)

        if (typeof source == 'undefined' || typeof target == 'undefined' || source == target) {
            console.log('ondrop source is equals target')
            return;
        }

        let data = this.getDragData();
        let len = data.length;

        if (source > target) {
            //从下拖到上则放到目标之前
            let index = len - 1;
            for (let i = 0; i < len; i++) {
                if (i == source) continue;
                if (i < target) {
                    data[i].sortNum = index;
                } else {
                    data[i].sortNum = index - 1;
                }
                index--;
            }
            data[source].sortNum = data[target].sortNum + 1;
        } else {
            //从上拖到下则放到目标之后
            let index = len - 1;
            for (let i = 0; i < len; i++) {
                if (i == source) continue;
                if (i <= target) {
                    data[i].sortNum = index;
                } else {
                    data[i].sortNum = index - 1;
                }
                index--;
            }
            data[source].sortNum = data[target].sortNum - 1;
        }

        // 倒叙排列
        data = data.sort(function(a, b) {
            return b.sortNum - a.sortNum;
        });

        console.log('sort result')
        console.log(data);

        this.afterDrop(data);

        ev.preventDefault();
    },

    /**
     * 获取拖放目标，找到包含样式名dragClassName的dom
     * @param  {[type]} tar [description]
     * @return {[type]}     [description]
     */
    getTarget: function(tar) {
        if (typeof this.getSlefTarget == 'function') {
            return this.getSlefTarget(tar);
        }

        while (tar.className && tar.className.indexOf(this.dragClassName) == -1) {
            tar = tar.parentNode;
        }
        return tar;
    },

    isTarget: function(tar){
        return tar.className.indexOf(this.dragClassName) != -1;
    },

    /**
     * 添加样式名，在旧样式名中追加某个样式名
     * @param oldClassName 旧样式名
     * @param className 某个样式名
     */
    addClass: function(oldClassName, className) {
        if (oldClassName.indexOf(className) != -1) {
            return oldClassName;
        } else {
            return oldClassName + ' ' + className;
        }
    },

    /**
     * 移除样式名，从旧样式名中移除指定的样式名
     * @param oldClassName 旧样式名
     * @param className 指定的样式名
     */
    removeClass: function(oldClassName, className) {
        if (oldClassName.indexOf(className) != -1) {
            return oldClassName.replace(className, '').replace(/^\s/, '').replace(/\s$/, '');
        } else {
            return oldClassName;
        }
    },

    /**
     * 获取当前DOM在同级元素中的序列值
     * @param tar DOM
     */
    indexOf: function(tar) {
        if (!tar) return -1;

        const par = tar.parentNode;

        if (!par) return -1;

        let result = [];
        for (let i in par.childNodes) {
            result.push(par.childNodes[i]);
        }

        return result.indexOf(tar);
    },
}

export default MeiDraggableMixin;
