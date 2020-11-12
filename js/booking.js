function myRooms() {
  var x = document.getElementById("select-rooms");
  if (x.className === "rms") {
    x.className += " display";
  } else {
    x.className = "rms";
  }
    
    var y = document.getElementById("myInfo");
    if(y.className === "info-display"){
       y.className = "info-section";
       }else{
           y.className = "info-section";
       }
    
     var z = document.getElementById("payment-info");
    if(z.className === "payment-display"){
        z.className = " payment";
    }else{
        z.className = "payment";
    }
    
} 

function myInfo(){
    var x = document.getElementById("myInfo");
    if (x.className === "info-section"){
        x.className += " info-display";
    }else{
        x.className = "info-section";
    }
    
    var y = document.getElementById("select-rooms");
    if(y.className === "display"){
        y.className = " rms";
    }else{
        y.className = "rms";
    }
    
    var z = document.getElementById("payment-info");
    if(z.className === "payment-display"){
        z.className = " payment";
    }else{
        z.className = "payment";
    }
    
}

function myPayment(){
    var x = document.getElementById("payment-info");
    if(x.className === "payment"){
        x.className += " payment-display";
    }else{
        x.className = "payment";
    }
    
      
    var y = document.getElementById("select-rooms");
    if(y.className === "display"){
        y.className = " rms";
    }else{
        y.className = "rms";
    }
    
     var z = document.getElementById("myInfo");
    if(z.className === "info-display"){
       z.className = "info-section";
       }else{
           z.className = "info-section";
       }
}


function myFunction(){
    var x = document.getElementById("myTopnav");
    if(x.className === "navbar"){
       x.className += " responsive";
       }else{
          x.className = "navbar"; 
       }
}
