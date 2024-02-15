/* Lecture 10
 * CSCI 4611, Spring 2024, University of Minnesota
 * Instructor: Evan Suma Rosenberg <suma@umn.edu>
 * License: Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 */ 

// suggest a topic
// z.umn.edu/4611

import * as gfx from 'gophergfx'

export class App extends gfx.GfxApp
{
    private ground: gfx.Mesh3;
    private skybox: gfx.Mesh3;
    private cylinder: gfx.Mesh3;

    private cameraControls: gfx.OrbitControls;

    // --- Create the App class ---
    constructor()
    {
        // initialize the base class gfx.GfxApp
        super();

        this.ground = gfx.Geometry3Factory.createBox(50, 1, 50);
        this.skybox = gfx.Geometry3Factory.createBox(100, 100, 100);
        this.cylinder = gfx.Geometry3Factory.createCylinder(20, 1, 1);
    
        this.cameraControls = new gfx.OrbitControls(this.camera);
    }


    // --- Initialize the graphics scene ---
    createScene(): void 
    {
        // Setup the camera projection matrix and position.
        // We will learn more about camera models later in this course.
        this.camera.setPerspectiveCamera(60, 1920/1080, 0.1, 100);

        // Set the camera controls to orbit around the target at a distance
        // of 4 meters away, with a starting view angle 22 degrees downward
        // towards the origin
        this.cameraControls.setDistance(4);
        this.cameraControls.setOrbit(gfx.MathUtils.degreesToRadians(-22), 0);

        // Create an ambient light that illuminates everything in the scene
        const ambientLight = new gfx.AmbientLight(new gfx.Color(0.4, 0.4, 0.4));
        
        // Create a directional light that is infinitely far away (sunlight)
        const directionalLight = new gfx.DirectionalLight(new gfx.Color(0.6, 0.6, 0.6));
        directionalLight.position.set(1, 2, 1);

        this.ground.position.set(0, -1, 0);
        this.ground.material.setColor(new gfx.Color(83/255, 209/255, 110/255));

        const cylinderMaterial = new gfx.GouraudMaterial();
        this.cylinder.material = cylinderMaterial;

        this.skybox.material = new gfx.UnlitMaterial();
        this.skybox.material.side = gfx.Side.BACK;
        this.skybox.material.setColor(new gfx.Color(0.698, 1, 1));

        this.scene.add(ambientLight);
        this.scene.add(directionalLight);
        this.scene.add(this.ground);
        this.scene.add(this.skybox);
        this.scene.add(this.cylinder);
    }

    
    // --- Update is called once each frame by the main graphics loop ---
    update(deltaTime: number): void 
    {
        this.cameraControls.update(deltaTime);
    }
}