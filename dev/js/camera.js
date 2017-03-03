class CameraController extends Speaker {
    constructor(communications) {
        super(communications);
        this.mainContainer = document.getElementById('mainContainer');
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.camera = document.getElementById('layout');
        this.cameraWidth = this.getCameraWidth();
        this.cameraHeight = this.getCameraHeight();
        this.listenTo('requestCameraOn');
        this.setMainContainerSize();
    }

    setMainContainerSize() {
        this.mainContainer.style.width = this.cameraWidth * globalparams.cellSize + 'px';
        this.mainContainer.style.height = this.cameraHeight * globalparams.cellSize + 'px';
    }

    getCameraWidth() {
        return Math.min(Math.floor((this.windowWidth * 0.8) / globalparams.cellSize), globalparams.dunWidth);
    }

    getCameraHeight() {
        return Math.min(Math.floor((this.windowHeight * 0.8) / globalparams.cellSize), globalparams.dunHeight);
    }

    getMaxOffsetX() {
        return globalparams.dunWidth - this.cameraWidth;
    }

    getMaxOffsetY() {
        return globalparams.dunHeight - this.cameraHeight;
    }

    setCameraPositionCell(x, y) {
        //make sure the value is between 0 and the maximum possible offset for the camera/map size
        this.camera.style.top = -(Math.max(0, Math.min(y, this.getMaxOffsetY())) * globalparams.cellSize) + 'px';
        this.camera.style.left = -(Math.max(0, Math.min(x, this.getMaxOffsetX())) * globalparams.cellSize) + 'px';
    }

    setCameraCenterCell(x, y) {
        this.setCameraPositionCell(x - Math.floor(this.cameraWidth / 2), y - Math.floor(this.cameraHeight / 2))
    }

    onRequestCameraOn(data) {
        Array.isArray(data) ? 
        this.setCameraCenterCell(data[0], data[1]) :
        this.setCameraCenterCell(arguments[0], arguments[1])
    }

}