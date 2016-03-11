// MAIN
// standard global variables
var container,
    scene,
    camera,
    renderer,
    controls,
    stats;

var clock = new THREE.Clock();
var keyboard = new KeyboardState();

init();
animate();

// FUNCTIONS
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.001, FAR = 2000000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);

    var light2 = new THREE.PointLight(0xffffff);
    //light2.position.set(-4,0,0);
    //scene.add(light2);

    scene.add(camera);

    camera.add(light2);
    camera.position.set(-4, 0, 0);

    //camera.lookAt(scene);
    // RENDERER
    if ( Detector.webgl ) {
        renderer = new THREE.WebGLRenderer({antialias: true});
    }
    else {
        renderer = new THREE.CanvasRenderer();
    }

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


   var light = new THREE.DirectionalLight(0xffffff);
   light.position.set(0, 20, 0).normalize();
   scene.add(light);


    var light3 = new THREE.AmbientLight(0xffffff);
    light3.position.set(0, 100, 0).normalize();
    scene.add(light3);

    // FLOOR
    var loader = new THREE.TextureLoader();
    // load a resource


    // KELIAS
    loader.load(
        // resource URL
        'images/kelias/kelias.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 12);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });

            var geometry = new THREE.PlaneGeometry(4, 40, 1, 1);
            var floor = new THREE.Mesh(geometry, material);

            floor.position.y = 0;
            floor.rotation.x = Math.PI / 2;

            scene.add(floor);

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '%  KELIAS loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );


    // ZOLE
    loader.load(
        // resource URL
        'images/out.JPG',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });

            var geometry = new THREE.PlaneGeometry(40, 40, 10, 10);

            var grass = new THREE.Mesh(geometry, material);
            grass.position.y = -0.02;
            grass.rotation.x = Math.PI / 2;

           // grass.position.x += 4;


           // grass.position.z += floor.geometry.parameters.width * 4;

            scene.add(grass);
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
        'images/padas.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture

            var skyGeometry = new THREE.CubeGeometry(2.5, 0.5, 16);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 4);


            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.FrontSide
                }));
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
           // skyBox.position.y = -1400;
            skyBox.position.x = 2;
            skyBox.position.z = 5;
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

/*
    // FUROS PRIEKABA
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
*/

    // SIENOS
    loader.load(
        // resource URL
        'images/pp.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
           // var imagePrefix = "images/sky/";
           // var directions = ["posx", "negx", "posy", "negy", "posz", "negz"];
           // var imageSuffix = ".jpg";
            var skyGeometry = new THREE.CubeGeometry(40, 40, 40);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5);


            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.BackSide
                }));
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);

            skyBox.position.y = skyBox.geometry.parameters.height / 2 - 2;

            scene.add(skyBox);

        },
        // Function called when download progresses
        function (xhr) {
            //console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        // Function called when download errors
        function (xhr) {
            //console.log('An error happened');
        }
    );



/*
    var loader2 = new THREE.OBJMTLLoader();

// load an obj / mtl resource pair
    loader2.load(
        // OBJ resource URL
        "objects/truck/truck.obj",
        // MTL resource URL
        "objects/truck/truck.mtl",
        // Function when both resources are loaded
        function ( object ) {

           // object.position.set(0, 0, 0);
           // camera.position.set(0, 12, 0);
           //
            //camera.lookAt(new THREE.Vector3(0,0,0));
            obj = object;
            obj.scale.set(0.1,0.1,0.1);


            var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            directionalLight.position.set( 0, 1, 0 );
            scene.add( directionalLight );



            scene.add( obj );
            //object.scale.set(0.01,0.01,0.01);
            //scene.add( object );
        },
        // Function called when downloads progress
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% Modelis uzsikrove' );
        },
        // Function called when downloads error
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );

*/









/*
    // KONTEINERIS
    loader.load(
        // resource URL
        'images/konteineris.png',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            // var imagePrefix = "images/sky/";
            // var directions = ["posx", "negx", "posy", "negy", "posz", "negz"];
            // var imageSuffix = ".jpg";
            var skyGeometry = new THREE.CubeGeometry(10000, 10000, 60000);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);


            var materialArray = [];
            var skyBox = [];


            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                }));
            var skyGeometry = new THREE.CubeGeometry(10000, 10000, 60000);
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            for(var i=0; i < 10; i++){


            skyBox[i] = new THREE.Mesh(skyGeometry, skyMaterial);
            skyBox[i].position.x += 25000;
                skyBox[i].position.z += 40000;
                skyBox[i].position.y = 2400;

            scene.add(skyBox[i]);
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
*/

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

    var deze = [{ "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 0, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 1200, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 2400, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 3600, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 1100, "posZ": 3600, "tipas": "Batonas" }, { "x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 3600, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1100, "posZ": 3600, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1800, "posZ": 3600, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 700, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 1400, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 0, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 700, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 1400, "posZ": 4800, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 6000, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 6000, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 6000, "tipas": "Batonas" }, { "x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 6000, "tipas": "Batonas" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 800, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 0, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 1600, "posZ": 7200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 800, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 0, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 1600, "posZ": 8200, "tipas": "Duona" }, { "x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 9200, "tipas": "Duona" }, { "x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 700, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 1700, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 0, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 1000, "posZ": 6000, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 800, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 600, "posY": 800, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 0, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 1000, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 0, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 1000, "posZ": 9200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 0, "posZ": 10200, "tipas": "Cukrus" }, { "x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 1000, "posZ": 10200, "tipas": "Cukrus" }
];
    //var testSegments = test2.split("|");

    //for (i = 0; i < testSegments.length; i++) {
     //   deze.push(JSON.parse(testSegments[i]));
    //}




    // DEZES TEKSTUROS
    loader.load(
        // resource URL
        'images/zeme.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);

            var boxTexture = loader.load('images/box.jpg');
            var box2Texture = loader.load('images/box2.jpg');
            var meshes = [];
            var dynamicTexture = [];

            for (var index = 0; index < deze.length; index++) {

                dynamicTexture[index] = new THREEx.DynamicTexture(256, 256);
                dynamicTexture[index].context.font = "bolder 40px Verdana";
                var material = new THREE.MeshBasicMaterial({
                    //color: Math.random() * 0xffffff,
                    //transparent: true,
                    //opacity: 0.5,
                    // overdraw: 0.5,
                    map: dynamicTexture[index].texture


                });
                // Dynamic texture
                dynamicTexture[index].clear('white').drawText(''+deze[index].tipas, undefined, 128, 'black');

                var geometry = new THREE.BoxGeometry((deze[index].x) / 1000, (deze[index].y) / 1000, (deze[index].z) / 1000 );

                if (deze[index].tipas == 'Batonas') {
                    var materials = [new THREE.MeshBasicMaterial({ map: boxTexture}),
                        new THREE.MeshBasicMaterial({
                            map: boxTexture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: boxTexture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: boxTexture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: boxTexture
                        })];
                    meshes[index] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                }
                else if (deze[index].tipas == 'Cukrus') {
                    var materials = [new THREE.MeshBasicMaterial({ map: box2Texture}),
                        new THREE.MeshBasicMaterial({

                            map: box2Texture
                        }),
                       new THREE.MeshBasicMaterial({
                           map: dynamicTexture[index].texture
                       }),
                       new THREE.MeshBasicMaterial({
                           map: box2Texture
                       }),
                       new THREE.MeshBasicMaterial({
                           map: box2Texture
                       }),
                       new THREE.MeshBasicMaterial({
                           map: box2Texture
                       })];
                    meshes[index] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                }
                else if (deze[index].tipas == 'Duona') {
                    var materials = [new THREE.MeshBasicMaterial({ map: texture}),
                        new THREE.MeshBasicMaterial({

                            map: texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: texture
                        })];
                    meshes[index] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                }

                else {
                    meshes[index] = new THREE.Mesh(geometry, material);
                }

                meshes[index].position.set(deze[index].posX / 1000, deze[index].posY / 1000, deze[index].posZ / 1000);

                var edges = new THREE.EdgesHelper(meshes[index], 0x000000);
                scene.add(edges);
                scene.add(meshes[index]);

            }

        },
        // Function called when download progresses
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% DEZES loaded');
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




   // window.onkeydown = checkKey;


}
/*
function checkKey(e) {

    var left = 37,
        up = 38,
        right = 39,
        down = 40,
        increment = 0.01;
    e = e || window.event;

    if (e.keyCode == up) {

        for(var i = 0; i < 20; i++){
            camera.position.z -= increment;
        }

    }
    else if (e.keyCode == down) {
        for(var i = 0; i < 20; i++){
            camera.position.z += increment;
        }
    }
    else if (e.keyCode == left) {
        for (var i = 0; i < 20; i++) {
            camera.position.x -= increment;

        }
    }
    else if (e.keyCode == right) {
        for(var i = 0; i < 20; i++){
        camera.position.x += increment;
        }
    }

}
*/
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