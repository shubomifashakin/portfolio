document.getElementById("totaltip").style.display="none";
document.getElementById("each").style.display="none";


function calculatetip(){
    var billamount = document.getElementById("billamount").value;
    var servicequality = document.getElementById("servicequality").value;
    var totalpeople = document.getElementById("totalpeople").value;

    if(billamount=="" || servicequality=="0" ) {
            window.alert("please enter values");
            return;
    }

    if(totalpeople <= "1" || totalpeople==""){
        totalpeople="1";
        document.getElementById("each").style.display="none";
    }else{
        document.getElementById("each").style.display="block";
    }

    var total = (servicequality * billamount)/totalpeople;
        total = Math.round(total* 100)/100;
        total = total.toFixed(2);

    document.getElementById("totaltip").style.display="block";
    document.getElementById("tip").innerHTML=total;
}