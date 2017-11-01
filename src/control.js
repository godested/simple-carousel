define(function () {
    var control = {};
    if ('ontouchstart' in window) {
        control.movingTypeStart = 'touchstart';
        control.movingTypeEnd = 'touchend';
        control.movingMethod = 'touchmove';
        control.clickMethod = 'touchstart';
    } else {
        control.movingTypeStart = 'mousedown';
        control.movingTypeEnd ='mouseup';
        control.movingMethod = 'mousemove';
        control.clickMethod = 'click';
    }
    return control
});