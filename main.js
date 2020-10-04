var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var cube = new THREE.Mesh();

var keyLight, backLight;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    initCamera();
    initRenderer();
    initLight();
    initCube();
    //break;
    var g = renderer.domElement;
    g.setAttribute("id", "rotating-container");
    document.body.appendChild(g);
    //document.body.appendChild(renderer.domElement);

}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}

function initLight() {
    keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
    scene.add(keyLight);

    backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
    scene.add(backLight);
}

function initCube() {
	var objLoader = new THREE.OBJLoader();
    //objLoader.setMaterials(materials);
    //objLoader.setMaterials(new THREE.MeshNormalMaterial())
    objLoader.setPath('assets/');
    objLoader.load('malpa.obj', function (object) {
        cube = object;
        scene.add(cube);
        console.log(cube);
    });
}
/*
function initCube() {
    cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
    scene.add(cube);
}
*/

//var SPEED = 0.01;

function rotateCube() {
    cube.rotation.x = -(scrollY * 0.002);
    //cube.rotation.y = SPEED;
    //cube.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    rotateCube();
    //scene.add(cube);
    renderer.render(scene, camera);
}

init();
render();

