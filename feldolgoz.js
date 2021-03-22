
$(function () {
    $('#varos').keyup(adatBeolvas); //referencia a metodusra
    $("article").delegate("table th" ,"click", rendezes);
});


var tomb = [];

function adatBeolvas() {
    var varosErtek = $('#varos').val();
    //console.log(x);

    $.ajax({
        type: 'GET',
        url: "feldolgoz.php?varos=" + varosErtek,
        success: function (eredmeny) {
            tomb = JSON.parse(eredmeny);
            console.log(eredmeny);
            listaKiir();
        }});
}

function listaKiir() {
    $("article").empty();
    var txt = "<select>";
    for (var i = 0; i < tomb.length; i++) {
        txt += "<option>" + tomb[i].nev + "<option>";
        //$("article").append(tomb[i].nev).append("<br>");
    }
    txt += "</select>";
    $("#lista").html(txt);
    
    tablazatbaKiir();
}

function tablazatbaKiir(){
    var txt = "<table><tr><th id='nev'>nev</th><th id='megye'>megye</th><th id='jaras'>jaras</th></tr>";
    for (var i = 0; i < tomb.length; i++) {
        txt+="<tr><td>" + tomb[i].nev + "</td>";
        txt+="<td>" + tomb[i].megye + "</td>";
        txt+="<td>" + tomb[i].jaras + "</td></tr>";
    }
    txt += "</table>";
    
    $("article").html(txt);
    
}

var irany = true;
function rendezes(){
    var aktOszlop = $(this).attr("id");
    tomb.sort(function (a, b){
        var number;
        if (irany) {
            number = Number(a[aktOszlop] > b[aktOszlop]) * 2 - 1;
        }else{
            number = Number(a[aktOszlop] < b[aktOszlop]) * 2 - 1;
        }
        return number;
        
    });
    
    tablazatbaKiir();
    irany =! irany;
}

