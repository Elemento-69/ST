var _ARCHIVO_VIDEO = document.getElementById('fileVideoAdjuntar'),
    _VIDEO = document.getElementById('video-element'),
    _CANVAS = document.getElementById('canvas-element'),
    _CANVAS_CTX = _CANVAS.getContext("2d");

// On selecting a video file
_ARCHIVO_VIDEO.addEventListener('change', function () {
    document.getElementById('btnAdjuntarVideo').disabled = true;
    // Set object URL as the video <source>
    _VIDEO.setAttribute('src', URL.createObjectURL(_ARCHIVO_VIDEO.files[0]));
    _VIDEO.load();
});

// Video metadata is loaded
_VIDEO.addEventListener('loadedmetadata', function () {
    document.getElementById('btnAdjuntarVideo').disabled = false;
    // Set canvas dimensions same as video dimensions
    _CANVAS.width = _VIDEO.videoWidth;
    _CANVAS.height = _VIDEO.videoHeight;
});

function fnObtenerImagenThumbnail() {
    _CANVAS_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
    return _CANVAS.toDataURL();
}
