define(['src/utils'],
    function (utils) {
        return {
            movingTypeStart: (utils.isTouchDevice()) ? 'touchstart' : 'mousedown',
            movingTypeEnd: (utils.isTouchDevice()) ? 'touchend' : 'mouseup',
            movingMethod: (utils.isTouchDevice()) ? 'touchmove' : 'mousemove',
            clickMethod: (utils.isTouchDevice()) ? 'touchstart' : 'click',
            wheelType: utils.wheelType()
        }
    });