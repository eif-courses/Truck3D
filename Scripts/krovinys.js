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
var spalva = '#0059ff';

init();
animate();

// FUNCTIONS
function init() {

    // FUROS MODELIO IKROVIMAS
    var DAELoader = new THREE.ColladaLoader();
    DAELoader.options.convertUpAxis = true;
    DAELoader.load( './Models/TruckBlue/model.dae', function ( collada ) {
            var model = collada.scene;
            model.scale.x = model.scale.y = model.scale.z = 0.05;

            model.position.y = 0;
            model.position.x = -5.5;
            model.position.z = 2.5;
            model.rotateX = Math.PI / 2;
            model.updateMatrix();
            scene.add(model);
        },
        function ( xhr ) {
            //console.log( (xhr.loaded / xhr.total * 100) + '% FURA loaded' );
        }
    );





    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.001, FAR = 5000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var light2 = new THREE.DirectionalLight(0xffffff);
    scene.add(camera);
    camera.add(light2);
    camera.position.set(12, 8, -10);
    // RENDERER
    if (Detector.webgl) {
        renderer = new THREE.WebGLRenderer({antialias: true});
    }
    else {
        renderer = new THREE.CanvasRenderer();
    }
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({charCode: 'm'.charCodeAt(0)});
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance =  9;
    controls.minDistance =  9;
    controls.maxDistance = 40;
    //controls.rotateSpeed = 1.0;
    //controls.zoomSpeed = 1.2;
    //controls.panSpeed = 0.2;

    controls.center.set(0,4,-8);

    controls.maxPolarAngle = Math.PI/2;
    //controls.noZoom = false;
    //controls.noPan = false;

   // controls.staticMoving = false;
   // controls.dynamicDampingFactor = 0.3;



    controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]

    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild(stats.domElement);
    // LIGHT
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 0).normalize();
    scene.add(light);
   /* var light3 = new THREE.AmbientLight(0xffffff);
    light3.position.set(0, 100, 0).normalize();
    scene.add(light3);
*/







//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////




    // FLOOR
    var loader = new THREE.TextureLoader();
    // load a resource
    // KELIAS
    loader.load(
        // resource URL
        'images/kelias.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 12);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide
            });
            var geometry = new THREE.PlaneGeometry(20, 80, 1, 1);
            var floor = new THREE.Mesh(geometry, material);
            floor.position.y = 0.02;
            floor.rotation.x = Math.PI / 2;
            floor.position.x -= 8;
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
            var geometry = new THREE.PlaneGeometry(80, 80, 10, 10);
            var grass = new THREE.Mesh(geometry, material);
            grass.position.y = -0.2;
            grass.rotation.x = Math.PI / 2;
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

            var skyGeometry = new THREE.CubeGeometry(5, 0.5, 19);
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

            skyBox.position.set(1.8, 2.3, -10);

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
            var skyGeometry = new THREE.CubeGeometry(80, 80, 80);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 5);

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


    var skyBox;
    // KONTEINERIS
    loader.load(
        // resource URL
        'images/konteineris.jpg',
        // Function when resource is loaded
        function (texture) {
            // do something with the texture
            // var imagePrefix = "images/sky/";
            // var directions = ["posx", "negx", "posy", "negy", "posz", "negz"];
            // var imageSuffix = ".jpg";
            var skyGeometry = new THREE.CubeGeometry(5, 4, 19);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(3, 1);
            var materialArray = [];
            for (var i = 0; i < 6; i++)
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.FrontSide,
                    transparent: true,
                    opacity: 0.2
                }));
            // var skyGeometry = new THREE.CubeGeometry(10000, 10000, 60000);
            var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
            //4.3,0,-31
            skyBox.position.x = 1.8;
            skyBox.position.z = -10;
            skyBox.position.y = 4.5;

            var helper = new THREE.EdgesHelper( skyBox, 0x00ff00 );

            scene.add(helper);
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










    ///
    ///  DEZES
    ///

    var deze = [{"x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 0, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 0,
        "posY": 1100,
        "posZ": 0,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 0, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 1000,
        "posY": 1100,
        "posZ": 0,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 1200, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 0,
        "posY": 1100,
        "posZ": 1200,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 1200, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 1000,
        "posY": 1100,
        "posZ": 1200,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 0 , "posY": 0, "posZ": 2400, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 0,
        "posY": 1100,
        "posZ": 2400,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 2400, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 1000,
        "posY": 1100,
        "posZ": 2400,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 0, "posY": 0, "posZ": 3600, "tipas": "Batonas"}, {
        "x": 1000,
        "y": 1100,
        "z": 1200,
        "posX": 0,
        "posY": 1100,
        "posZ": 3600,
        "tipas": "Batonas"
    }, {"x": 1000, "y": 1100, "z": 1200, "posX": 1000, "posY": 0, "posZ": 3600, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 1000,
        "posY": 1100,
        "posZ": 3600,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 1000, "posY": 1800, "posZ": 3600, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 0,
        "posY": 0,
        "posZ": 4800,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 700, "posZ": 4800, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 0,
        "posY": 1400,
        "posZ": 4800,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 0, "posZ": 4800, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 700,
        "posY": 700,
        "posZ": 4800,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 700, "posY": 1400, "posZ": 4800, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 1400,
        "posY": 0,
        "posZ": 4800,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 1400, "posY": 700, "posZ": 4800, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 1400,
        "posY": 1400,
        "posZ": 4800,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 0, "posZ": 6000, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 0,
        "posY": 700,
        "posZ": 6000,
        "tipas": "Batonas"
    }, {"x": 700, "y": 700, "z": 1200, "posX": 0, "posY": 1400, "posZ": 6000, "tipas": "Batonas"}, {
        "x": 700,
        "y": 700,
        "z": 1200,
        "posX": 700,
        "posY": 0,
        "posZ": 6000,
        "tipas": "Batonas"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 7200, "tipas": "Duona"}, {
        "x": 1200,
        "y": 800,
        "z": 1000,
        "posX": 0,
        "posY": 800,
        "posZ": 7200,
        "tipas": "Duona"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 7200, "tipas": "Duona"}, {
        "x": 1200,
        "y": 800,
        "z": 1000,
        "posX": 1200,
        "posY": 0,
        "posZ": 7200,
        "tipas": "Duona"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 7200, "tipas": "Duona"}, {
        "x": 1200,
        "y": 800,
        "z": 1000,
        "posX": 1200,
        "posY": 1600,
        "posZ": 7200,
        "tipas": "Duona"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 8200, "tipas": "Duona"}, {
        "x": 1200,
        "y": 800,
        "z": 1000,
        "posX": 0,
        "posY": 800,
        "posZ": 8200,
        "tipas": "Duona"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 1600, "posZ": 8200, "tipas": "Duona"}, {
        "x": 1200,
        "y": 800,
        "z": 1000,
        "posX": 1200,
        "posY": 0,
        "posZ": 8200,
        "tipas": "Duona"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 1200, "posY": 800, "posZ": 8200, "tipas": "Duona"}, {
        "x": 1200,
        "y": 800,
        "z": 1000,
        "posX": 1200,
        "posY": 1600,
        "posZ": 8200,
        "tipas": "Duona"
    }, {"x": 1200, "y": 800, "z": 1000, "posX": 0, "posY": 0, "posZ": 9200, "tipas": "Duona"}, {
        "x": 600,
        "y": 1000,
        "z": 800,
        "posX": 700,
        "posY": 700,
        "posZ": 6000,
        "tipas": "Cukrus"
    }, {"x": 600, "y": 1000, "z": 800, "posX": 700, "posY": 1700, "posZ": 6000, "tipas": "Cukrus"}, {
        "x": 600,
        "y": 1000,
        "z": 800,
        "posX": 1400,
        "posY": 0,
        "posZ": 6000,
        "tipas": "Cukrus"
    }, {"x": 600, "y": 1000, "z": 800, "posX": 1400, "posY": 1000, "posZ": 6000, "tipas": "Cukrus"}, {
        "x": 600,
        "y": 1000,
        "z": 800,
        "posX": 0,
        "posY": 800,
        "posZ": 9200,
        "tipas": "Cukrus"
    }, {"x": 600, "y": 1000, "z": 800, "posX": 600, "posY": 800, "posZ": 9200, "tipas": "Cukrus"}, {
        "x": 600,
        "y": 1000,
        "z": 800,
        "posX": 1200,
        "posY": 0,
        "posZ": 9200,
        "tipas": "Cukrus"
    }, {"x": 600, "y": 1000, "z": 800, "posX": 1200, "posY": 1000, "posZ": 9200, "tipas": "Cukrus"}, {
        "x": 600,
        "y": 1000,
        "z": 800,
        "posX": 1800,
        "posY": 0,
        "posZ": 9200,
        "tipas": "Cukrus"
    }, {"x": 600, "y": 1000, "z": 800, "posX": 1800, "posY": 1000, "posZ": 9200, "tipas": "Cukrus"}, {
        "x": 600,
        "y": 1000,
        "z": 800,
        "posX": 0,
        "posY": 0,
        "posZ": 10200,
        "tipas": "Cukrus"
    }, {"x": 600, "y": 1000, "z": 800, "posX": 0, "posY": 1000, "posZ": 10200, "tipas": "Cukrus"}
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

            var boxTexture = loader.load('images/paper.jpg');
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
                dynamicTexture[index].clear('#aaddcc').drawText('' + deze[index].tipas, undefined, 128, 'black');

                var geometry = new THREE.BoxGeometry((deze[index].x) / 1000, (deze[index].y) / 1000, (deze[index].z) / 1000);

                if (deze[index].tipas == 'Batonas') {
                    dynamicTexture[index].clear('red').drawText('' + deze[index].tipas, undefined, 128, 'black');
                    var materials = [new THREE.MeshBasicMaterial({map: dynamicTexture[index].texture}),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        })];
                    meshes[index] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                }
                else if (deze[index].tipas == 'Cukrus') {
                    dynamicTexture[index].clear('yellow').drawText('' + deze[index].tipas, undefined, 128, 'black');
                    var materials = [new THREE.MeshBasicMaterial({map: dynamicTexture[index].texture}),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        })];
                    meshes[index] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                }
                else if (deze[index].tipas == 'Duona') {
                    dynamicTexture[index].clear('green').drawText('' + deze[index].tipas, undefined, 128, 'black');
                    var materials = [new THREE.MeshBasicMaterial({map: dynamicTexture[index].texture}),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        }),
                        new THREE.MeshBasicMaterial({
                            map: dynamicTexture[index].texture
                        })];
                    meshes[index] = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
                }
                else {
                    meshes[index] = new THREE.Mesh(geometry, material);
                }

                meshes[index].position.set(deze[index].posX / 1000, deze[index].posY / 1000, deze[index].posZ / 1000);

                var edges = new THREE.EdgesHelper(meshes[index], 0x000000);
                scene.add(edges);

                // DEZIU POZICIJA KONTEINERYJE
                meshes[index].position.x += 1.6;
                meshes[index].position.y += 3.2;
                meshes[index].position.z += -15;
                scene.add(meshes[index]);
            }

        },
        // Function called when download progresses
        function (xhr) {
           // console.log((xhr.loaded / xhr.total * 100) + '% DEZES loaded');
        },
        // Function called when download errors
        function (xhr) {
            console.log('An error happened');
        }
    );
    
    // GUI

    var gui = new dat.GUI();

    var FizzyText = function () {
        this.Fullscreen = 'Press M key';
        this.containerPosition = 0.8;
        this.SuPriekaba = true;
        this.Fullscreen_press_m = function () {
        };
        this.FullScreen = "";
        this.Slider = 100;
        this.Size = 1;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.color = [0, 255, 0]; // RGB array
    };

    var text = new FizzyText();

    gui.add(text, 'Fullscreen');

    var f1 = gui.addFolder('Kameros nustatymai');
    f1.add(text, 'x', -20, 40).onChange(function (val) {
        camera.position.x = val;
    });
    f1.add(text, 'y', 0, 40).onChange(function (val) {
        camera.position.y = val;
    });
    f1.add(text, 'z', -20, 40).onChange(function (val) {
        camera.position.z = val;
    });

    var light5 = new THREE.PointLight(spalva+'', 1, 100 );
    light5.position.set( 12, 10, 0 );
    light5.intensity = 0.01;
    scene.add( light5 );

    var f2 = gui.addFolder('Spalvos nustatymai');
    f2.addColor(text, 'color').onChange(function(rgb){
        spalva = ''+rgb;
        light5.color.setRGB(rgb[0], rgb[1], rgb[2]);
    });

    var f3 = gui.addFolder('Atvaizdavimas');
    f3.add(text, 'containerPosition', { moveDown: 4.2, MoveUP: 8 }).onChange(function(values){
        if(text.SuPriekaba){
            skyBox.position.y = values;
        }
    });
    f3.add(text, 'SuPriekaba').onChange(function (a) {
        skyBox.visible = a;
    });
}

function animate()
{

    requestAnimationFrame( animate );
    render();
    update();
}



function update()
{


    //window.onkeydown = checkKey;
    var delta = clock.getDelta();
    keyboard.update();
    controls.update(delta);
    stats.update();
}
function render()
{
    renderer.render( scene, camera );
}