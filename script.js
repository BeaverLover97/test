// module aliases
//$("#canvas").attr("width", screen.width);
 var canvas = document.getElementById('canvas');

 //poem words:

 var simmer_words = ["Simmer","Watch","a","trail","of","nine","black-necked","cranes","across","the",
 "thinning","sky","Wait","for","them","to","pass","as","you","utter","a","small","prayer","Then","in",
 "an","act","of","repeating","their","migration","by","which","I","mean","of","the","soul","Lightly",
 "parse","the","hard","stones","from","a","bowl","of","black","gram","And","empty","them","in","a","bird-shaped",
 "pool","of","water","It","is","then","alright","to","leave","things","be","till","they","get","soggy","enough",
 "To","simmer","out","of","meaning"
 ];

 var fillet_words = ["Fillet","Stand","with","toes","upturned","like","elven","shoes","As","you",
 "salt","your","foot’s","thumb","Depending","on","how","much","suffering","it","can","take",
 "Then","pour","a","tumbler","of","ice-cold","water","to","numb","the","skin","You","will",
 "see","the","faint","maroon","of","clotted","blood","gathering","like","veins","Feel","a",
 "pachyderm’s","limb","fall","off"
 ];

 var julienne_words = ["Julienne","Pry","open","the","insides","of","an","okra","stem","And",
 "trace","the","old","feeling","of","your","mother’s","fingers","holding","the","knife",
 "Filling","the","stem","with","love","that","smells","of","turmeric","Pulp","the","memory",
 "three","times","to","drain","it","of","emotion","Then","let","your","lips","whistle","as",
 "your","teeth","chew","on","sunflower","seeds","And","try","not","to","think","of","smashing",
 "the","crow’s","blue","eggs","at","your","window"
 ];


document.getElementById("canvas").focus();

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composites = Matter.Composites,
    Detector = Matter.Detector;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    canvas: canvas,
    engine: engine,
       options: {
           width: 1300,
           height: 700,
           background: 'transparent',
           wireframes: false,
           showAngleIndicator: false
       }
});

//creating classes for the interactable boxes
class Box{
  constructor(text_array, x, y, color = "rgb(0, 164, 43", world)
  {
    //create an svg text using d3!
    this.text = d3.select("svg").append("text")
    .html(text_array[0])
    .attr("x", "20")
    .attr("y", "35");

    this.body = Bodies.rectangle(1000, 200, 80, 80, {
      render:{
        fillStyle: color
      }
      });

      World.add(engine.world, this.body);

    this.text_array = text_array;
    this.color = color;
    this.red_color = parseInt((getRGB(this.body.render.fillStyle).red));
    this.green_color = parseInt((getRGB(this.body.render.fillStyle).green));
    this.blue_color = parseInt((getRGB(this.body.render.fillStyle).blue));
    this.i = 0;
    this.k = 0;
}

  increment(num)
  {
    if (Matter.SAT.collides(this.body, pan).collided)
    {
    console.log("incrementing");
    this.i += num;
    this.k+=1;
    }

  }

  update_text_postion()
  {
    this.text.attr("x", this.body.position.x - 30);
    this.text.attr("y", this.body.position.y + 6);
  }

  update_color()
  {
    if (Matter.SAT.collides(this.body, pan).collided) {
        console.log(this.body.render.fillStyle);
        if(this.red_color < 255)
        {
          this.body.render.fillStyle = "rgb(" + (this.red_color += this.i) +","+ this.green_color + ","+ this.blue_color +  ")";
        }
        else if(this.green_color > 0)
        {
          this.body.render.fillStyle = "rgb(" + this.red_color +","+ (this.green_color -= this.i) + ","+ this.blue_color +  ")";
        }
        else if(this.blue_color > 0)
        {
          this.body.render.fillStyle = "rgb(" + this.red_color +","+ this.green_color + ","+ (this.blue_color -= this.i) +  ")";
        }

      }
  }

  update_text()
  {
      this.text.html(this.text_array[this.k]);

  }

}

//create an empty array of object classes
var boxes = [];

var pan = Bodies.rectangle(280, 560, 400, 30, { isStatic: true });

var pan_left = Bodies.rectangle(122, 520, 350, 20, { isStatic: true });
//rotating
Body.rotate(pan_left, 1.309);

var pan_right = Bodies.rectangle(432, 520, 350, 20, { isStatic: true });
//rotating
Body.rotate(pan_right, 1.8326);

var shelf_1 = Bodies.rectangle(1000, 380, 500, 40, { isStatic: true });

var ground = Bodies.rectangle(400, 1078, 2000, 1000, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [ground, pan, pan_left, pan_right, shelf_1]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

//mouse constraint
var mouseConstraint = Matter.MouseConstraint.create(engine, {
  //Create Constraint
  element: render.canvas,
  constraint: {
    render: {
      visible: false
    },
    stiffness:0.8
  }
});
Matter.World.add(engine.world, mouseConstraint);

var kitchen_timer = setInterval(function(){
  for(i = 0; i < boxes.length; i++)
  {
    boxes[i].increment(1);
    boxes[i].update_color();
  }

}, 3000);
//3000
//game loop



(function run() {
    window.requestAnimationFrame(run);
    Engine.update(engine, 1000 / 60);
     for(i = 0; i < boxes.length; i++)
     {
       boxes[i].update_text_postion();
       boxes[i].update_text();
     }

})();

function getRGB(str){
  var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
  return match ? {
    red: match[1],
    green: match[2],
    blue: match[3]
  } : {};
}

function add_fillet()
{
  box = new Box(fillet_words, 2, 2);
  boxes.push(box);
  World.add(engine.world, box);
}

function add_simmer()
{
  box = new Box(simmer_words, 2, 2, "rgb(15,255,27)");
  boxes.push(box);
  World.add(engine.world, box);
}

function add_julienne()
{
  box = new Box(julienne_words, 2, 2, "rgb(0,180,197)");
  boxes.push(box);
  World.add(engine.world, box);
}
