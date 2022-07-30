var player1=prompt("Player one, Enter your name : ");
var p1c ='rgb(86, 151 ,255)';

var player2=prompt("Player two, Enter your name : ");
var p2c = 'rgb(237, 45, 73)';

var table = $('table tr');


function win(row,col){
  console.log("You won starting at this row, column");
  console.log(row);
  console.log(col);
}

function changecolor(row, col, color)
{
  return (table.eq(row).find('td').eq(col).find('button').css('background-color',color));
}

function returncolor(row, col)
{
  return (table.eq(row).find('td').eq(col).find('button').css('background-color'));
}

function checkbottom(col)
{
  var color=returncolor(5,col);
  for(var row=5;row>-1;row--)
  {
    color=returncolor(row,col);
    if(color==='rgb(128, 128, 128)')
    {
      return row;
    }
  }
}



function colormatch(p,q,r,s)
{
  return (p===q && p===r && p===s && p!=='rgb(128, 128, 128)' && p!==undefined);
}

function horizontacheck() {
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colormatch(returncolor(row,col), returncolor(row,col+1) ,returncolor(row,col+2), returncolor(row,col+3))) {
        console.log('horizontal');
        win(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}



function verticalcheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colormatch(returncolor(row,col), returncolor(row+1,col) ,returncolor(row+2,col), returncolor(row+3,col))) {
        console.log('vertical');
        win(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}



function diagonalcheck()
{
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colormatch(returncolor(row,col), returncolor(row+1,col+1) ,returncolor(row+2,col+2), returncolor(row+3,col+3))) {
        console.log('diagonal');
        Win(row,col);
        return true;
      }else if (colormatch(returncolor(row,col), returncolor(row-1,col+1) ,returncolor(row-2,col+2), returncolor(row-3,col+3))) {
        console.log('diagonal');
        Win(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}



function endgame(player)
{
  for(var col = 0; col<7;col++)
  {
    for(var row=0; row<7;row++)
    {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(player+" has won");
    }
  }
}


var cp=1;
var cn=player1;
var cc=p1c;

$('h3').text(player1+" it is your turn");

$('.board button').on('click',function(){

  var col=$(this).closest("td").index();
  var bottom=checkbottom(col);
  changecolor(bottom,col,cc);
  if(horizontacheck() || verticalcheck() || diagonalcheck())
  {
    endgame(cn);
  }
  cp=cp*-1;
  if(cp === 1)
  {
    cn=player1;
    $('h3').text(cn+" it is your turn");
    cc=p1c;
  }
  else {
    cn=player2;
    $('h3').text(cn+" it is your turn");
    cc=p2c;
  }
})
