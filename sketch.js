let classifier;
let video;
let label = "Waiting...";
let emoji = "📦🔲🦢";

const modelURL = "https://teachablemachine.withgoogle.com/models/-jaEhG5_a/";

function setup() {
  let canvas = createCanvas(640, 520);
  canvas.parent("canvas-container"); // Attach canvas to HTML div

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  classifier = ml5.imageClassifier(modelURL + "model.json", modelReady);
}

function modelReady() {
  console.log("✅ Model Loaded");
  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function draw() {
  background(0);
  image(video, 0, 0);

  fill(255);
  textSize(32);
  textAlign(CENTER);
  text(label, width / 2, height - 20);
  textSize(64);
  text(emoji, width / 2, 60);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  if (results[0].confidence > 0.3) {
    label = results[0].label;
    
  }

  classifyVideo();
}
