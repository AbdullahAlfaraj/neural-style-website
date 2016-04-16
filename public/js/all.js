        (function(){



//create our app module
var app = angular.module('mainApp', ['log']);

app.controller('NeuralStyleController',['$http',function($http){

  var neuralStyleRef = this;
  // this.content_img = 'http://images6.fanpop.com/image/photos/32700000/Anime-guitar-girl-msyugioh123-32779625-1600-1163.jpg';
  this.content_img = "/uploads/brad_pitt.jpg";
  this.style_img = "/uploads/picasso_selfport1907.jpg";
  this.output_img = "";
  this.output_imgs = [];
  this.output_img_basename = "bio"
  this.content_idx = -1;
  this.uploaded_imgs = [];
  this.b_selected = []; 
  this.max_itr = 200;
  this.num_ready_imgs = this.max_itr/100;
  this.reset = function ()
  {
    $("#message-log").text("");
    alert("reset2!");
  };

  this.isImageSelected = function(idx) {
    return this.b_selected[idx] === true;
  }
  this.selectContent = function(idx)
  {
    this.content_idx = idx;
    this.content_img = this.uploaded_imgs[idx];
  };
  this.selectStyle = function(idx)
  {
    this.b_selected[idx] = !this.b_selected[idx];

    for(var i = 0; i < this.b_selected.length;++i)
    {
      if(this.b_selected[i] === true)
      {
        this.style_img =  this.uploaded_imgs[i];
        break;
      }


    }
  };

  for(var i = 0; i < this.num_ready_imgs; ++i)
  {
    var filename = this.output_img_basename+".png";
    if(i < this.num_ready_imgs - 1)
      filename = this.output_img_basename +"_"+((i+1)*100)+".png";
    // else
    //  this.output_imgs[i] = this.output_img_basename+".png";


    this.output_imgs.push(filename);
  }



  this.outputImageName = function(idx){
    if(idx < this.num_ready_imgs - 1)
      return this.output_img_basename +"_"+((idx+1)*100)+".png";

    return this.output_img_basename+".png";
  };

  // $http.get('js/uploaded_images.json').success(function (data) {


    $http.get('/data/uploaded-images').success(function (data) {
      neuralStyleRef.uploaded_imgs = data;

      //unselect all images
      for(var i =0; i < data.length; ++i)
      {
        neuralStyleRef.b_selected.push(false);
      }


    });

    this.run = function (){
       console.log("sent data: %o",{"style":neuralStyleRef.style_img,
        "content":neuralStyleRef.content_img,"num_itr":neuralStyleRef.max_itr,
        "tab_id":tab_id});
      $http.post('/neural-style/run',{"style":neuralStyleRef.style_img,
        "content":neuralStyleRef.content_img,"num_itr":neuralStyleRef.max_itr,
        "tab_id":tab_id});



    }



    this.range = function(count){

      var arr = []; 

      for (var i = 0; i < count; ++i) { 
        arr.push(i) 
      } 

      return arr;
    }

  }]);




})();
(function(){
	var app = angular.module("log",[]); 

	// app.controller("logController",function($scope){
	// 	$scope.message = "message added from the message log";
	// 	$scope.newMessage = function(message){
	// 		$sope.message += message;
	// 	};
	// 	$scope.reset = function ()
	// 	{
	// 		$scope.message = "";

	// 	};


	// });
	// app.controller("logController",function(){
	// 	this.message = "message added from the message log";
	// 	var logRef = this;
	// 	// this.newMessage = function(message){
	// 	// 	logRef.message += message;
	// 	// };
	// 	this.reset = function ()
	// 	{
	// 		logRef.message = "";

	// 	};

	// });
	app.controller("logController",function($scope){
		$scope.myMessage = "my message";
		// $scope.log = {"message":"message added from the message log",
		// "rest": function(){
		// 	var logObj = $scope.log;

		// 	logObj.message = "";
		// }

	});

})();
(function(){
    var socket = io.connect('http://localhost:3000',{query: 'tab_id='+tab_id});
        // var socket = io('http://192.168.10.10:3000');
        socket.on("test-channel-"+tab_id+":App\\Events\\NewFileHasCreated", function(message){
            // increase the power everytime we load test route
            console.log(message.data);
            $("#hid-output-img").val(message.data.image_url).trigger("change");


            $('#power').text(parseInt($('#power').text()) + parseInt(message.data.power));
        });
        socket.on("test-channel-"+tab_id+":App\\Events\\NewLogMessage", function(data){
            // increase the power everytime we load test route
            console.log(data.message);

            var message_log = $("#message-log").text();
            message_log += data.message;
            $("#message-log").text(message_log);
            console.log("data: %o",data);
            console.log("user_id: %o",data.user_id);

            
            // $('#power').text(parseInt($('#power').text()) + parseInt(message.data.power));
        });


        socket.on('connect2',function(data){
      // alert('You are connected!' + data);

      $("#user_id").val(data.user_id);
      console.log("data: %o",data);
  });

    })();
    

//# sourceMappingURL=all.js.map
