var SITE = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		//this.$test = $('.test');
		this.count = 0;
		
		this.initVars();
		this.initHeadtrackr();
		this.bindEvents();
		setTimeout(this.drawStimuli.bind(this), 5000);
		//this.drawResponse();
		this.drawAllSwarms();
	},

	initVars: function() {
		this.videoInput = document.getElementById('inputVideo');
		this.canvasInput = document.getElementById('inputCanvas');
		this.context = this.canvasInput.getContext('2d');

		this.bigCanvas = document.getElementById('bigCanvas');
		this.bigContext = this.bigCanvas.getContext('2d');

		this.responseCanvas = document.getElementById('responseCanvas');
		this.responseContext = this.responseCanvas.getContext('2d');

		this.stimuliCanvas = document.getElementById('stimuliCanvas');
		this.stimuliContext = this.stimuliCanvas.getContext('2d');

		//this.drawStimuli();

		// this.colors = ['#abbf60', '#403934', '#d95436'];

		//green
		this.one = {
			'color': 'rgba(171,191,96, 0.5)',
			'id': 'one',
			'range': 10,
			'factor': 1,
			'rotate': -30,
			'inc': 100
		}

		//brown
		this.two = {
			'color': 'rgba(64,57,52, 0.2)',
			'id': 'two',
			'range': 10,
			'factor': 1,
			'rotate': 30,
			'inc': 300
		}

		//orange
		this.three = {
			'color': '#d95436',
			'id': 'three',
			'range': 10,
			'factor': 1,
			'rotate': 30,
			'inc': 30
		}

		this.swarmOptions = [this.one, this.two, this.three];//, this.four, this.five];
	},

	drawAllSwarms: function() {
		for (var i = 0; i < this.swarmOptions.length; i++) {
			this.drawSwarm(this.swarmOptions[i]);
		}
	},

	updateAllSwarms: function() {
		for (var i = 0; i < this.swarmOptions.length; i++) {
			this.updateSwarm(this.swarmOptions[i]);
		}
	},

	updateSwarm: function(options) {
		// var xLocInitial = Math.floor((Math.random()*100)-50);
		// var yLocInitial = Math.floor((Math.random()*100)-50);
		var data = d3.range(options.range).map(function() {
		  return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
		});


		var width = 1280,
		    height = 500,
		    angle = 2 * Math.PI;

		var x = d3.scale.linear()
		    .domain([-5, 5])
		    .range([10, width]);

		var y = d3.scale.linear()
		    .domain([-5, 5])
		    .range([10, height]);

		var time0 = Date.now(),
		    time1;

		this.d3Canvas = d3.select("#"+options.id);

		var context = this.d3Canvas.node().getContext("2d");
		context.fillStyle = options.color;//"steelblue";
		context.strokeStyle = "#d9d4d2";
		context.strokeWidth = 0;

		d3.timer(function() {
		  context.clearRect(0, 0, width, height);

		  data.forEach(function(d) {
		    d.xloc += d.xvel*options.factor;
		    d.yloc += d.yvel*options.factor;
		    d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.xloc;
		    d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
		    context.beginPath();
		    context.arc(x(d.xloc), y(d.yloc), Math.min(1 + 1000 * Math.abs(d.xvel * d.yvel), 10), 0, angle);
		    context.fill();
		    //context.stroke();
		  });

		  time1 = Date.now();
		  //fps.text(Math.round(1000 / (time1 - time0)));
		  time0 = time1;
		});

	},


	drawSwarm: function(options) {
		var data = d3.range(options.range).map(function() {
		  return {xloc: 0, yloc: 0, xvel: 0, yvel: 0};
		});

		var width = 1280,
		    height = 500,
		    angle = 2 * Math.PI;

		var x = d3.scale.linear()
		    .domain([-5, 5])
		    .range([10, width]);

		var y = d3.scale.linear()
		    .domain([-5, 5])
		    .range([10, height]);

		var time0 = Date.now(),
		    time1;

		//var fps = d3.select("#fps span");



		this.d3Canvas = d3.select("body").append("canvas")
		    .attr("width", width)
		    .attr("height", height)
		    .attr("id", options.id);

		var context = this.d3Canvas.node().getContext("2d");
		context.fillStyle = options.color;//"steelblue";
		context.strokeStyle = "#d9d4d2";
		context.strokeWidth = 0;
		var that = this;
		d3.timer(function() {
		  context.clearRect(0, 0, width, height);

		  data.forEach(function(d) {
		    d.xloc += d.xvel*options.factor;
		    d.yloc += d.yvel*options.factor;
		    d.xvel += 0.04 * (Math.random() - .5) - 0.05 * d.xvel - 0.0005 * d.xloc;
		    d.yvel += 0.04 * (Math.random() - .5) - 0.05 * d.yvel - 0.0005 * d.yloc;
		    context.beginPath();
		    context.arc(x(d.xloc), y(d.yloc), Math.min(1 + 1000 * Math.abs(d.xvel * d.yvel), 10), 0, angle);
		    context.fill();
		    //context.stroke();
		  });

		  time1 = Date.now();
		  //fps.text(Math.round(1000 / (time1 - time0)));
		  time0 = time1;
		});
	},

	// drawResponse: function() {
	// 	var width = window.innerWidth,
	// 	    height = window.innerHeight;

	// 	var x1 = width / 2,
	// 	    y1 = height / 2,
	// 	    x0 = x1,
	// 	    y0 = y1,
	// 	    i = 0,
	// 	    r = 200,
	// 	    τ = 2 * Math.PI;

	// 	//d3.select('#stimResponseCanvas').remove();

	// 	var canvas = d3.select("body").append("canvas")
	// 	    .attr("width", width)
	// 	    .attr("height", height);
	// 	    //.attr("stimResponseCanvas");
	// 	    //.on("ontouchstart" in document ? "touchmove" : "mousemove", move);

	// 	var context = canvas.node().getContext("2d");
	// 	context.globalCompositeOperation = "lighter";
	// 	context.lineWidth = 0;

	// 	d3.timer(function() {
	// 	  context.clearRect(0, 0, width, height);

	// 	  var z = d3.hsl(++i % 360, 1, .5).rgb(),
	// 	      c = "rgba(" + z.r + "," + z.g + "," + z.b + ",",
	// 	      x = x0 += (x1 - x0) * .1,
	// 	      y = y0 += (y1 - y0) * .1;

	// 	  d3.select({}).transition()
	// 	      .duration(2000)
	// 	      .ease(Math.sqrt)
	// 	      .tween("circle", function() {
	// 	        return function(t) {
	// 	          context.strokeStyle = c + (1 - t) + ")";
	// 	          context.beginPath();
	// 	          context.arc(x, y, r * t, 0, τ);
	// 	          context.stroke();
	// 	        };
	// 	      });
	// 	});

		// function move() {
		//   var mouse = d3.mouse(this);
		//   x1 = mouse[0];
		//   y1 = mouse[1];
		//   d3.event.preventDefault();
		// }




		// this.width = Math.max(960, innerWidth),
		// this.height = Math.max(500, innerHeight);

		// this.x1 = this.width / 2;
		// this.y1 = this.height / 2,
		// this.x0 = this.x1
		// this.y0 = this.y1
		// this.i = 0
		// this.r = 200
		// this.τ = 2 * Math.PI;

		// this.d3Canvas = d3.select("body").append("canvas")
		//     .attr("width", this.width)
		//     .attr("height", this.height)
		//     .on("ontouchstart" in document ? "touchmove" : "mousemove", 
		//     	this.move.bind(this));

		// this.d3Context = this.d3Canvas.node().getContext("2d");
		// this.d3Context.globalCompositeOperation = "lighter";
		// this.d3Context.lineWidth = 2;

		// var that = this;
		// d3.timer(function() {
		//   that.d3Context.clearRect(0, 0, that.width, that.height);

		//   that.z = d3.hsl(++that.i % 360, 1, .5).rgb(),
		//   that.c = "rgba(" + that.z.r + "," + that.z.g + "," + that.z.b + ",",
		//   that.x = that.x0 += (that.x1 - that.x0) * .1,
		//   that.y = that.y0 += (that.y1 - that.y0) * .1;

		//   d3.select({}).transition()
		//       .duration(2000)
		//       .ease(Math.sqrt)
		//       .tween("circle", function() {
		//         return function(t) {
		//           that.d3Context.strokeStyle = that.c + (1 - that.t) + ")";
		//           that.d3Context.beginPath();
		//           that.d3Context.arc(that.x, that.y, that.r * that.t, 0, that.τ);
		//           that.d3Context.stroke();
		//         };
		//       });
		// });

		// function move() {
		//   var mouse = d3.mouse(this);
		//   x1 = mouse[0];
		//   y1 = mouse[1];
		//   d3.event.preventDefault();
		// }
	//},

	// move: function(e) {
	// 	this.mouse = d3.mouse(this);
	// 	this.x1 = this.mouse[0];
	// 	this.y1 = this.mouse[1];
	// 	d3.event.preventDefault();
	// },

	checkRange: function(xPos, yPos, i) {
		var xLow = xPos + 50;
		var xHigh = xPos - 50;

		var yLow = yPos + 120;
		var yHigh = yPos - 120;
		
		var lowX = this.headX - 75;
		var highX = this.headX + 75;
		var lowY = this.headY - 150;
		var highY = this.headY + 150;
		var that = this;
		if ((xLow >= lowX) && (xHigh <= highX)) {
			if ((yLow >= lowY) && (yHigh <= highY)) {
				// 	that.drawAllSwarms();

				//alert("hey");
				this.swarmOptions[i].range += this.swarmOptions[i].inc;
				this.swarmOptions[i].factor += 0.2;
				// var otherOne = (i+1) % 3;
				// var otherOtherOne = (i+2) % 3;
				// console.log(i + "," + otherOne + "," + otherOtherOne);
				// if  (this.swarmOptions[otherOne].range > 10) {
				// 	this.swarmOptions[otherOne].range -= 100;
				// }
				// if  (this.swarmOptions[otherOtherOne].range > 10) {
				// 	this.swarmOptions[otherOtherOne].range -= 100;
				// }

				this.updateSwarm(this.swarmOptions[i]);
				console.log("increasing swarms");
				

				// while (this.swarmOptions[i].range > 10) {
				// 	setTimeout(function() {
				// 		that.swarmOptions[i].range -= 10;
				// 		that.updateAllSwarms();
				// 	// 	console.log("decreasing swarms");
				// 	}, 1000);
				// }

				var randDuration = Math.floor((Math.random()*3000)+3000);

				setTimeout(function() {
					that.swarmOptions[i].range -= this.swarmOptions[i].inc;
					this.swarmOptions[i].factor -= 0.2;
					that.updateSwarm(that.swarmOptions[i]);
					console.log(that.swarmOptions[i].range);
					console.log("decreasing swarms");
				}, randDuration);
			}
		}

	},


	drawStimuli: function() {

		var randIndex = Math.floor((Math.random()*3));
		//console.log(randIndex);

		var width = window.innerWidth,
		    height = window.innerHeight;

		d3.select("#stimulus").remove();

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height)
		    .attr("id", "stimulus");

		//svg.append("g")
		//    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
		
		var randX = Math.floor((Math.random()*window.innerWidth));
		var randY = Math.floor((Math.random()*window.innerHeight));

		svg.append("rect")
			
 			//.attr("transform", "rotate(45)")
			.attr("transform", //"translate(" + randX + "," + randY + ")",
				"rotate(" + this.swarmOptions[randIndex].rotate //+ ")")
				+ "," + (randX) + "," + (randY) +")")
			.attr("width", 100)
			.attr("height", 240)
			.attr("fill", this.swarmOptions[randIndex].color)
			.attr("x", randX)
 			.attr("y", randY);



 		this.checkRange(randX, randY, randIndex);

		  // .append("path")
		  //   .attr("d", d3.svg.symbol().type("cross").size(10000))
		  //   .each(cycle);

		// function cycle() {
		//   d3.select(this).transition()
		//       .duration(10000)
		//       .attrTween("transform", function() { return d3.interpolateString("rotate(0)", "rotate(720)"); })
		//       .each("end", cycle);
		// }

		var that = this;
		var randInterval = Math.floor((Math.random()*1000)+300);//Math.random() * Math.random() * 5000;
		
		//console.log(randInterval);
		// this.stimuliContext.clearRect(0, 0, this.stimuliCanvas.width, 
		// 	this.stimuliCanvas.height);
		
		// this.stimuliContext.beginPath();
		// this.stimuliContext.arc(Math.random()*this.stimuliCanvas.width, 
		// 	Math.random()*this.stimuliCanvas.height, 50, 0, 2 * Math.PI, false);
		// //this.context.globalAlpha = 0.2;
		// this.stimuliContext.lineWidth = 3;
		// this.stimuliContext.strokeStyle = 'green';
		// this.stimuliContext.stroke();
		// this.stimuliContext.globalAlpha = 0.3;
		// this.stimuliContext.fillStyle = 'green';
		// this.stimuliContext.fill();
		// this.stimuliContext.closePath();
		
		setTimeout(function() {
			that.drawStimuli();
		}, randInterval);
	},

	bindEvents: function() {
		//this.$test.on('click', this.doSomething.bind(this));

		document.addEventListener('headtrackingEvent', 
			this.headHandler.bind(this), false);

		document.addEventListener('facetrackingEvent', 
			this.faceHandler.bind(this), false);

		//this.$document.on('headtrackingEvent', 
			//this.trackHandler.bind(this), false);
	},

	initHeadtrackr: function() {
		this.htracker = new headtrackr.Tracker();
		this.htracker.init(this.videoInput, this.canvasInput);
		this.htracker.start();
	},

	headHandler: function(e) {

	},

	faceHandler: function(e) {
		//webcam face tracker
		this.context.beginPath();
		this.context.arc(e.detail.x, e.detail.y, e.detail.width/2, 
			0, 2 * Math.PI, false);
		this.context.lineWidth = 2;
		this.context.strokeStyle = '#d95436';
		this.context.stroke();
		this.context.closePath();

		this.headX = e.detail.x*(1280/280);
		this.headY = e.detail.y*(500/210);

		//stimulus tracker
		this.bigContext.clearRect(0, 0, this.bigCanvas.width, 
			this.bigCanvas.height);
		this.bigContext.beginPath();
		this.bigContext.arc(this.headX, this.headY, 150, 
			0, 2 * Math.PI, false);
		this.bigContext.globalAlpha = 0.2;
		this.bigContext.fillStyle = '#d9d4d2';
		this.bigContext.fill();
		this.bigContext.closePath();





		// var width = window.innerWidth,
		//     height = window.innerHeight;

		// d3.select("#stimulusTracker").remove();

		// var svg = d3.select("body").append("svg")
		//     .attr("width", width)
		//     .attr("height", height)
		//     .attr("id", "stimulusTracker");

		// //svg.append("g")
		// //    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
		
		// svg.append("ellipse")
		// 	.attr("cx", e.detail.x*(1280/280))
 	// 		.attr("cy", e.detail.y*(500/210))
 	// 		.attr("rx", 150)
 	// 		.attr("ry", 300)
		// 	.attr("fill", 'rgba(217, 212, 210, 0.2)');

	}
	

}

SITE.init();