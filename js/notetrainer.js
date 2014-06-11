String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

charMap = [];
charMap[65] = "A";
charMap[66] = "B";
charMap[67] = "C";
charMap[68] = "D";
charMap[69] = "E";
charMap[70] = "F";
charMap[71] = "G";
charMap[97] = "A";
charMap[98] = "B";
charMap[99] = "C";
charMap[100] = "D";
charMap[101] = "E";
charMap[102] = "F";
charMap[103] = "G";

availableNotes = [];

trebleNotes = [
	"a/4",
	"b/4",
	"c/4",
	"d/4",
	"e/4",
	"f/4",
	"g/4",
	"a/5",
	"b/5",
	"c/5",
	"d/5",
	"e/5",
	"f/5",
	"g/5"
];

$("body").keypress(function (e) {
	cc = e.charCode;
	if ((97 <= cc && cc <= 103) || (65 <= cc && cc <= 71)){
		inNote = charMap[cc];
		if (currNote.contains(inNote.toLowerCase())) {
			console.log(currNote + " contains " + inNote);
			streak++;
			right++;
			printNote(inNote,"#31708f");
			currNote = pickNote();
		} else {
			console.log(currNote + " does not contain " + inNote);
			streak = 0;
			wrong++;
			printNote(inNote,"#a94442");
		}
		$("#correctQuarter").html(streak);
		$("#wrongQuarter").html(Math.round((right/(right+wrong))*100) + "%");
		drawNote(currNote,"treble");
	};
});

function drawNote(n,c) {
	var canvas = $("#note")[0];
	var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

	var ctx = renderer.getContext();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var stave = new Vex.Flow.Stave(12, 10, 75,
		{
			spacing_between_lines_px: 10,
			space_above_staff_ln: 1,
			space_above_staff_ln: 2
		});
	stave.addClef(c).setContext(ctx).draw();

	var voice = new Vex.Flow.Voice({
	num_beats: 1,
	beat_value: 4,
	resolution: Vex.Flow.RESOLUTION
	});

	var note = [new Vex.Flow.StaveNote({ keys: [n], duration: "q" })];
	voice.addTickables(note);
	var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 75);
	voice.draw(ctx, stave);
}

function printNote(note,color) {
	$("#guessQuarter").html(inNote);
	$("#guessQuarter").css("color", color);
}

function pickNote() {
	if (availableNotes.length <= 0) {
		console.log("Entered, length is " + availableNotes.length);	
		for (var copies = 0; copies < 1; copies++) {
			availableNotes = availableNotes.concat(trebleNotes);
		};
		availableNotes = shuffle(availableNotes);
	}

	return availableNotes.pop();
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

streak = 0;
right = 0;
wrong = 0;
currNote = pickNote();
drawNote(currNote,"treble");