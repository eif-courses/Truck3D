// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var clock = new THREE.Clock();

var keyboard = new KeyboardState();

// custom global variables
var mesh;

init();
animate();

// FUNCTIONS
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 200000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(-1500, 5600, -200);
    //camera.lookAt(scene.position);
   // camera.lookAt(scene.position);
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );
    // LIGHT
    var light2 = new THREE.PointLight(0xffffff);
    light2.position.set(100,10000,100);
    scene.add(light2);

   var light = new THREE.DirectionalLight(0xffffff);
   light.position.set(0, 2000, 1000).normalize();
   scene.add(light);


 
    // FLOOR
    
    var loader = new THREE.TextureLoader();
    
    // load a resource
    loader.load(
        // resource URL
        'images/street3.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });

            var geometry = new THREE.PlaneGeometry(4000, 40000, 10, 10);
            var floor = new THREE.Mesh(geometry, material);
            floor.position.y = -1850;
            floor.rotation.x = Math.PI / 2;
            scene.add(floor);

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );
    // load a resource
    loader.load(
        // resource URL
        'images/grass.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });

            var geometry = new THREE.PlaneGeometry(40000, 40000, 10, 10);
            var floor = new THREE.Mesh(geometry, material);
            floor.position.y = -1900;
            floor.rotation.x = Math.PI / 2;
            scene.add(floor);

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );
    // PAKLOTAS KROVINIUI
    loader.load(
        // resource URL
        'images/wi.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture

            var skyGeometry = new THREE.CubeGeometry(3000, 1800, 18000);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 2);


            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                }));
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
            skyBox.position.y = -1400;
            skyBox.position.x = 300;
            scene.add(skyBox);

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );

    // PAKLOTAS KROVINIUI
    loader.load(
        // resource URL
        'images/son.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture

            // Dydis furos priekabos x, y, z
            var skyGeometry = new THREE.CubeGeometry(3200, 4000, 18000);

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            texture.repeat.set(5, 1);


            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.4
                }));
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
            skyBox.position.y = 800;
            skyBox.position.x = 300;
            scene.add(skyBox);

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );


    // SKYBOX


   // var axes = new THREE.AxisHelper(100);
    //scene.add(axes);

    
    
    // load a resource
    loader.load(
        // resource URL
        'images/si.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
           // var imagePrefix = "images/sky/";
           // var directions = ["posx", "negx", "posy", "negy", "posz", "negz"];
           // var imageSuffix = ".jpg";
            var skyGeometry = new THREE.CubeGeometry(40000, 40000, 40000);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5);


            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                }));
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
            scene.add(skyBox);

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );
    
    /////////////////
    // IMPORT MODEL//
    /////////////////
  /*
    var loaderq = new THREE.ObjectLoader();

    loaderq.load("objects/priekabaGood.json", function (obj) {
        obj.rotateY(Math.PI / 2);
        obj.position.x = 1000;

        obj.position.y = -100;//-400

        obj.position.z = -1100;

        obj.scale.set(500, 500, 500);
     
        scene.add(obj);
    });
    */


    /// 
    ///  DEZES
    ///
   /// var test = "" + { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 0, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 0, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 0, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 0, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 1200, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 1200, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 1200, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 1200, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 2400, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 2400, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 2400, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 2400, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 3600, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 3600, "tipas": "Batonas" } | { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 3600, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 3600, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1800, "posZ": 3600, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 700, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 1400, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 0, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 700, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 1400, "posZ": 4800, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 6000, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 6000, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 6000, "tipas": "Batonas" } | { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 6000, "tipas": "Batonas" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 7200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 800, "posZ": 7200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 7200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 0, "posZ": 7200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 7200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 1600, "posZ": 7200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 8200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 800, "posZ": 8200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 8200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 0, "posZ": 8200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 8200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 1600, "posZ": 8200, "tipas": "Duona" } | { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 9200, "tipas": "Duona" } | { "x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 700, "posZ": 6000, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 1700, "posZ": 6000, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 0, "posZ": 6000, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 1000, "posZ": 6000, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 800, "posZ": 9200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 600, "posY": 800, "posZ": 9200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 0, "posZ": 9200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 1000, "posZ": 9200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 0, "posZ": 9200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 1000, "posZ": 9200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 0, "posZ": 10200, "tipas": "Cukrus" } | { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 1000, "posZ": 10200, "tipas": "Cukrus" }+"";
    var deze = [{ "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 3600, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 3600, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 3600, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 3600, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1800, "posZ": 3600, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 700, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 1400, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 0, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 700, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 1400, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 6000, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 6000, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 6000, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 6000, "tipas": "Batonas" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 800, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 0, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 1600, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 800, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 0, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 1600, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 9200, "tipas": "Duona" }, { "x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 700, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 1700, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 0, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 1000, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 800, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 600, "posY": 800, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 0, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 1000, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 0, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 1000, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 0, "posZ": 10200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 1000, "posZ": 10200, "tipas": "Cukrus" }
];
    //var testSegments = test2.split("|");

    //for (i = 0; i < testSegments.length; i++) {
     //   deze.push(JSON.parse(testSegments[i]));
    //}
       
    loader.load(
        // resource URL
        'images/box.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);

            var meshes = [];
            var dynamicTexture = [];
            for (index = 0; index < deze.length; index++) {

                dynamicTexture[index] = new THREEx.DynamicTexture(256, 256);
                dynamicTexture[index].context.font = "bolder 40px Verdana";

                var material = new THREE.MeshBasicMaterial({
                    //color: Math.random() * 0xffffff,
                   // transparent: true,
                   // opacity: 0.5,
                   // overdraw: 0.5,
                    map: dynamicTexture[index].texture
                    

                });
                dynamicTexture[index].clear('white').drawText(''+deze[index].tipas, undefined, 128, 'red');
                //dynamicTexture[index].clear('cyan').drawText('(' + deze[index].posX + ', ' + deze[index].posY +', '+ deze[index].posZ+');', undefined, 256, 'red');
                var geometry = new THREE.BoxGeometry(deze[index].x, deze[index].y, deze[index].z);


                if (deze[index].tipas == 'Batonas') {
                    var materials = [
      new THREE.MeshBasicMaterial({
          map: loader.load('images/box2.jpg')
      }),
      new THREE.MeshBasicMaterial({
          map: loader.load('images/box2.jpg')
      }),
      new THREE.MeshBasicMaterial({
          map: dynamicTexture[index].texture
      }),
      new THREE.MeshBasicMaterial({
          map: loader.load('images/box2.jpg')
      }),
      new THREE.MeshBasicMaterial({
          map: loader.load('images/box2.jpg')
      }),
      new THREE.MeshBasicMaterial({
          map: loader.load('images/box2.jpg')
      })
                    ];





                    meshes[index] = new THREE.Mesh(geometry,
                        new THREE.MeshFaceMaterial(materials))
                }
                else if (deze[index].tipas == 'Cukrus') {

                    var materials = [
       new THREE.MeshBasicMaterial({
           map: loader.load('images/box.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/box.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: dynamicTexture[index].texture
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/box.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/box.jpg')
       }),
       new THREE.MeshBasicMaterial({
           map: loader.load('images/box.jpg')
       })
                    ];





                    meshes[index] = new THREE.Mesh(geometry,
                        new THREE.MeshFaceMaterial(materials))
                }

                else {
                    meshes[index] = new THREE.Mesh(geometry, material);
                }



                meshes[index].position.set(deze[index].posX, deze[index].posY, deze[index].posZ);

                edges = new THREE.EdgesHelper(meshes[index], 0x000000);
                scene.add(edges);
                scene.add(meshes[index]);
                
            }
            
        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );

    //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    //scene.add( light );
	
    // GUI 

    var gui = new dat.GUI();
	 
    var params = {
        FullScreen: "",
        Slider: 100,
        Size: 1,
        x: 0,
        y: 0,
        z: 0

    };
    var FizzyText = function() {
        this.Fullscreen = 'Press M key';
        this.speed = 0.8;
        this.displayOutline = false;
        this.Fullscreen_press_m = function () { };
        // Define render logic ...
    };

    var text = new FizzyText();
    
    gui.add(text, 'Fullscreen');
    //gui.add(text, 'speed', -5, 5);
   // gui.add(text, 'displayOutline');
    //gui.add(text, 'Fullscreen_press_m');

    var f1 = gui.addFolder('Camera position');
    f1.add(params, 'x', -3000, 15000).onChange(function(val){
        camera.position.x = val;
    });
    f1.add(params, 'y', 0, 15000).onChange(function (val) {
        camera.position.y = val;
    });
    f1.add(params, 'z', -3000, 15000).onChange(function (val) {
        camera.position.z = val;
    });




    window.onkeydown = checkKey;
    
}

function checkKey(e) {

    var left = 37,
        up = 38,
        right = 39,
        down = 40,
        increment = 500;
    e = e || window.event;

    if (e.keyCode == up) {
        camera.position.z -= increment;
    }
    else if (e.keyCode == down) {
        camera.position.z += increment;
    }
    else if (e.keyCode == left) {
        camera.position.x -= increment;
    }
    else if (e.keyCode == right) {
        camera.position.x += increment;
    }

}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function update()
{
    
    keyboard.update();

    var delta = clock.getDelta();
    controls.update(delta);
    //controls2.update(delta);
    /*
   
    var moveDistance = 50 * clock.getDelta();


    if (keyboard.down("left")) {
        mesh.translateX(-50);
    }
    if ( keyboard.down("right") )
        mesh.translateX(  50 );

    if ( keyboard.pressed("A") )
        mesh.translateX( -moveDistance );

    if (keyboard.pressed("D")) {
        mesh.translateX(moveDistance);
    
    }
    if (keyboard.down("R")) {
        mesh.material.color = new THREE.Color(0xff0000);
        
    }
        if ( keyboard.up("R") )
        mesh.material.color = new THREE.Color(0x0000ff);

        controls.update();
    */
    stats.update();
}

function render()
{
    renderer.render( scene, camera );
}