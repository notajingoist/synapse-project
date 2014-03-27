var SITE = {
	init: function() {
		this.$document = $(window.document);
		this.$body = $('body');
		
		this.initVars();
		this.initHeadtrackr();
		this.bindEvents();
		setTimeout(this.drawStimuli.bind(this), 5000);
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
			'color': 'rgba(171,191,96, 0.15)', //#abbf60
			'id': 'one',
			'range': 10,
			'factor': 1,
			'rotate': -30,
			'inc': 150,
			'factorinc': 0.2,
			'fullcolor': '#abbf60'
		}

		//brown
		this.two = {
			'color': 'rgba(64,57,52, 0.3)', //#403934
			'id': 'two',
			'range': 10,
			'factor': 1,
			'rotate': 30,
			'inc': 100,
			'factorinc': 0.2,
			'fullcolor': '#403934'
		}

		//orange
		this.three = {
			'color': 'rgba(217,84,54, 1)', //#d95436
			'id': 'three',
			'range': 10,
			'factor': 1,
			'rotate': 30,
			'inc': 30,
			'factorinc': 0.2,
			'fullcolor': '#d95436'
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
		context.fillStyle = options.fullcolor;//"steelblue";
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
		context.fillStyle = options.fullcolor;//"steelblue";
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
	
				this.swarmOptions[i].range += this.swarmOptions[i].inc;
				this.swarmOptions[i].factor += this.swarmOptions[i].factorinc;
	
				this.updateSwarm(this.swarmOptions[i]);
				//console.log("increasing swarms");
				
				var randDuration = Math.floor((Math.random()*3000)+1000);
				console.log(randDuration);
				setTimeout(function() {
					that.swarmOptions[i].range -= that.swarmOptions[i].inc;
					that.swarmOptions[i].factor -= that.swarmOptions[i].factorinc;
					that.updateSwarm(that.swarmOptions[i]);
					//console.log(that.swarmOptions[i].range);
					//console.log("decreasing swarms");
				}, randDuration);
			}
		}

	},

	drawStimuli: function() {
		var randIndex = Math.floor((Math.random()*3));

		var width = window.innerWidth,
		    height = window.innerHeight;

		d3.select("#stimulus").remove();

		var svg = d3.select("body").append("svg")
		    .attr("width", width)
		    .attr("height", height)
		    .attr("id", "stimulus");


		var randX = Math.floor((Math.random()*window.innerWidth));
		var randY = Math.floor((Math.random()*window.innerHeight));

		svg.append("rect")
			.attr("transform", 
				"rotate(" + this.swarmOptions[randIndex].rotate
				+ "," + (randX) + "," + (randY) +")")
			.attr("width", 100)
			.attr("height", 240)
			.attr("fill", this.swarmOptions[randIndex].color)
			.attr("x", randX)
 			.attr("y", randY);



 		this.checkRange(randX, randY, randIndex);

		var that = this;
		var randInterval = Math.floor((Math.random()*1000)+300);//Math.random() * Math.random() * 5000;
		
		
		setTimeout(function() {
			that.drawStimuli();
		}, randInterval);
	},

	bindEvents: function() {

		document.addEventListener('headtrackingEvent', 
			this.headHandler.bind(this), false);

		document.addEventListener('facetrackingEvent', 
			this.faceHandler.bind(this), false);
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

	}
	

}

SITE.init();