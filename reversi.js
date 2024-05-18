var canvas = document.createElement('canvas');
var board = canvas.getContext('2d');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
document.body.appendChild(canvas);

board.strokeRect(390 , 0 , 560 , 560);
board.fillStyle = 'rgb(0 , 255 , 0)';
board.fillRect(391 , 1 , 558 , 558);

function strokeLine(x,y,X,Y){
    board.beginPath();
    board.moveTo(x,y);
    board.lineTo(X,Y);
    board.stroke();
}

function Circle(num , x , y){
    if(num == 1){
        board.beginPath();
        board.arc(x , y , 30 , 0 , 2 * Math.PI);
        board.stroke();
        board.fillStyle = 'rgb(0 , 0 , 0)';
        board.fill();
    }
    else if(num == 2){
        board.beginPath();
        board.arc(x , y , 30 , 0 , 2 * Math.PI);
        board.stroke();
        board.fillStyle = 'rgb(255 , 255 , 255)';
        board.fill();
    }
}

function Bcircle(x , y){
    board.beginPath();
    board.arc(x , y , 30 , 0 , 2 * Math.PI);
    board.stroke();
    board.fillStyle = 'rgb(0 , 0 , 0)';
    board.fill();
}
function Wcircle(x , y){
    board.beginPath();
    board.arc(x , y , 30 , 0 , 2 * Math.PI);
    board.stroke();
    board.fillStyle = 'rgb(255 , 255 , 255)';
    board.fill();
}

var horizontalsize = 8;
var verticalsize = 8;

for(i = 1 ; i < horizontalsize ; i ++){
    strokeLine(390 + (70 * i) , 0 , 390 + (70 * i) , 560);
    strokeLine(390 , 0 + (70 * i) , 950 , (70 * i));
}

var array = new Array(verticalsize);
for(i = 0 ; i < verticalsize ; i++){
    array[i] = new Array(horizontalsize);
}
for(i = 0 ; i < array.length ; i ++){
    for (j = 0 ; j < array[i].length ; j ++){
        array[i][j] = 0;
    }
}

array[3][3] = 2;
array[3][4] = 1;
array[4][4] = 2;
array[4][3] = 1;
Bcircle(705 , 245);
Wcircle(635 , 245);
Bcircle(635 , 315);
Wcircle(705 , 315);

var turn = 1;
document.body.addEventListener('click' , function(event)
{
    var X = event.offsetX;
    var Y = event.offsetY;
    if(390 < X && X < 950 && 0 < Y && Y < 560){
            Click(event);  
    }
});

function Click(event){
    var X = event.offsetX;
    var Y = event.offsetY;
    for(h = 0 ; h <= 7 ; h ++){
        for(v = 0 ; v <= 7 ; v ++){
            if(390 + (70 * h) < X && X < 460 + (70 * h) && 0 + (70 * v) < Y && Y < 70 + (70 * v) && array[v][h] == 0){
                Reversi(array , turn , h , v);
            }
        }
    }
}

function Reversi(Array , num , h , v){
    var reverse = false;
    if(Right(Array , num , h , v) == true){
        reverse = true;
    }
    if(BottomRight(Array , num , h , v) == true){
        reverse = true;
    }
    if(Bottom(Array , num , h , v) == true){
        reverse = true;
    }
    if(BottomLeft(Array , num , h , v) == true){
        reverse = true;
    }
    if(Left(Array , num  , h , v) == true){
        reverse = true;
    }
    if(TopLeft(Array , num , h , v) == true){
        reverse = true;
    }
    if(Top(Array , num , h , v) == true){
        reverse = true;
    }
    if(TopRight(Array , num , h , v) == true){
        reverse = true;
    }
    if(reverse == true){
        turn = (num == 1) ? 2 : 1;
        JudgeGame(Array);
    }
}

var cannot = 0;
var finished = 0;

setInterval(function(){
    if(finished < 1){
    JudgeCanArrangement(array , turn) 
    }
}, 1000);

function JudgeCanArrangement(Array , num){
    var canarrangement = false;
    for(i = 0 ; i < horizontalsize ; i ++){
        for(j = 0 ; j < verticalsize ; j ++){
            canarrangement = JudgeRight(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeBottomRight(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeBottom(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeBottomLeft(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeLeft(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeTopLeft(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeTop(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
            canarrangement = JudgeTopRight(Array , num , i , j);
            if(canarrangement == true){
                break;
            }
        }
        if(canarrangement == true){
            break;
        }
    }
    if(canarrangement == true){
        cannot = 0;
    }else{
        cannot ++;
        if(num == 1){
            alert('打てる場所がありません。白の番です');
        }else if(num){
            alert('打てる場所がありません。黒の番です');
        }
        turn = (num == 1) ? 2 : 1;
    }
    JudgeGame(Array);
}
function JudgeRight(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var x = i + 1;
    while(i < Array[j].length && Array[j][x] == opponent) {
        x ++;
    }
    if(Array[j][i] == 0 && x < Array[j].length && Array[j][x] == num && i + 1 < x) {
        return true;
    }
}
function JudgeBottomRight(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var x = i + 1;
    var y = j + 1;
    while(x < horizontalsize && y < Array.length && Array[y][x] == opponent){
        x ++;
        y ++;
    }
    if(Array[j][i] == 0 && x < horizontalsize && y < Array.length && Array[y][x] == num && i + 1 < x && j + 1 < y){
        return true;
    }
}
function JudgeBottom(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var y = j + 1;
    while(y < Array.length && Array[y][i] == opponent){
        y ++;
    }
    if(Array[j][i] == 0 && y < Array.length && Array[y][i] == num && j + 1 < y){
        return true;
    }
}
function JudgeBottomLeft(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var x = i - 1;
    var y = j + 1;
    while(0 <= x && y < Array.length && Array[y][x] == opponent){
        x --;
        y ++;
    }
    if(Array[j][i] == 0 && 0 <= x && y < Array.length && Array[y][x] == num && x < i - 1 && j + 1 < y){
        return true;
    }
}
function JudgeLeft(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var x = i - 1;
    while(0 <= x && Array[j][x] == opponent){
        x --;
    }
    if(Array[j][i] == 0 && 0 <= x && Array[j][x] == num && x < i - 1){
        return true;
    }
}
function JudgeTopLeft(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var x = i - 1;
    var y = j - 1;
    while(0 <= x && 0 <= y && Array[y][x] == opponent){
        x --;
        y --;
    }
    if(Array[j][i] == 0 && 0 <= x && 0 <= y && Array[y][x] == num && x < i - 1 && y < j - 1){
        return true;
    }
}
function JudgeTop(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    y = j - 1;
    while(0 <= y && Array[y][i] == opponent){
        y --;
    }
    if(Array[j][i] == 0 && 0 <= y && Array[y][i] == num && y < j - 1){
        return true;
    }
}
function JudgeTopRight(Array , num , i , j){
    var opponent = (num == 1) ? 2 : 1;
    var x = i + 1;
    var y = j - 1;
    while(x < horizontalsize && 0 <= y && Array[y][x] == opponent){
        x ++;
        y --;
    }
    if(Array[j][i] == 0 && x < horizontalsize && 0 <= y && Array[y][x] == num && i + 1 < x && y < j - 1){
        return true;
    }
}

function JudgeGame(Array){
    var count0 = 0 , count1 = 0 , count2 = 0;
    for(i = 0 ; i < horizontalsize ; i ++){
        for(j = 0 ; j < verticalsize ; j ++){
            if(Array[j][i] == 0){
                count0 ++;
            }else if(Array[j][i] == 1){
                count1 ++;
            }else if(Array[j][i] == 2){
                count2 ++;
            }
        }
    }
    if(cannot == 2 || count0 == 0){
        if(count2 < count1){
            setTimeout(function(){
            alert('黒の勝ち');
            } , 500);
        }else if(count1 < count2){
            setTimeout(function(){
                alert('白の勝ち');
                } , 500);
        }else{
            setTimeout(function(){
                alert('引き分け');
                } , 500);
        }
        turn = 0;
        finished ++;
    }
}

function Arrangement(Array , num , h , v){
    Array[v][h] = num;
    Circle(num, 425 + (70 * h), 35 + (70 * v));
}
function DiagonalReverse(Array , num , i , j){
    Array[j][i] = num;
    Circle(num , 425 + (70 * i), 35 + (70 * j));
}
function HorizontalReverse(Array , num , i , v){
    Array[v][i] = num;
    Circle(num , 425 + (70 * i), 35 + (70 * v));
}
function VerticalReverse(Array , num , h , j){
    Array[j][h] = num;
    Circle(num , 425 + (70 * h), 35 + (70 * j));
}

function Right(Array, num, h, v) {
    var opponent = (num == 1) ? 2 : 1;
    var x = h + 1;
    while(x < Array[v].length && Array[v][x] == opponent) {
        x ++;
    }
    if(x < Array[v].length && Array[v][x] == num && h + 1 < x) {
        Arrangement(Array , num , h , v);
        for (i = h + 1 ; i < x ; i ++) {
            HorizontalReverse(Array , num , i , v);
        }
        return true;
    }
}
function BottomRight(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    var x = h + 1;
    var y = v + 1;
    while(x < horizontalsize && y < Array.length && Array[y][x] == opponent){
        x ++;
        y ++;
    }
    if(x < horizontalsize && y < Array.length && Array[y][x] == num && h + 1 < x && v + 1 < y){
        Arrangement(Array , num , h , v);
        var i = h + 1;
        var j = v + 1;
        while(i < x && j < y){
            DiagonalReverse(Array , num , i , j);
            i ++;
            j ++;
        }
        return true;
    }
}
function Bottom(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    var y = v + 1;
    while(y < Array.length && Array[y][h] == opponent){
        y ++;
    }
    if(y < Array.length && Array[y][h] == num && v + 1 < y){
        Arrangement(Array , num , h , v);
        for(j = v + 1 ; j < y ; j ++){
            VerticalReverse(Array , num , h , j);
        }
        return true;
    }
}
function BottomLeft(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    var x = h - 1;
    var y = v + 1;
    while(0 <= x && y < Array.length && Array[y][x] == opponent){
        x --;
        y ++;
    }
    if(0 <= x && y < Array.length && Array[y][x] == num && x < h - 1 && v + 1 < y){
        Arrangement(Array , num , h , v);
        var i = h - 1;
        var j = v + 1;
        while(x < i && j < y){
            DiagonalReverse(Array , num , i , j);
            i --;
            j ++;
        }
        return true;
    }
}
function Left(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    var x = h - 1;
    while(0 <= x && Array[v][x] == opponent){
        x --;
    }
    if(0 <= x && Array[v][x] == num && x < h - 1){
        Arrangement(Array , num , h , v);
        for(i = h - 1 ; x < i ; i --){
            HorizontalReverse(Array , num , i , v);
        }
        return true;
    }
}
function TopLeft(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    var x = h - 1;
    var y = v - 1;
    while(0 <= x && 0 <= y && Array[y][x] == opponent){
        x --;
        y --;
    }
    if(0 <= x && 0 <= y && Array[y][x] == num && x < h - 1 && y < v - 1){
        Arrangement(Array , num , h , v);
        var i = h - 1;
        var j = v - 1;
        while(x < i && y < j){
            DiagonalReverse(Array , num , i , j);
            i --;
            j --;
        }
        return true;
    }
}
function Top(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    y = v - 1;
    while(0 <= y && Array[y][h] == opponent){
        y --;
    }
    if(0 <= y && Array[y][h] == num && y < v - 1){
        Arrangement(Array , num , h , v);
        for(j = v - 1 ; y < j ; j --){
            VerticalReverse(Array , num , h , j);
        }
        return true;
    }
}
function TopRight(Array , num , h , v){
    var opponent = (num == 1) ? 2 : 1;
    var x = h + 1;
    var y = v - 1;
    while(x < horizontalsize && 0 <= y && Array[y][x] == opponent){
        x ++;
        y --;
    }
    if(x < horizontalsize && 0 <= y && Array[y][x] == num && h + 1 < x && y < v - 1){
        Arrangement(Array , num , h , v);
        var i = h + 1;
        var j = v - 1;
        while(i < x && y < j){
            DiagonalReverse(Array , num , i , j);
            i ++;
            j --;
        }
        return true;
    }
}