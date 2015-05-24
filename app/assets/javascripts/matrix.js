function MultiplyMatrix(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
    return C;
}

function Matrix(){

}
//СѓРјРЅРѕР¶РµРЅРёРµ РјР°С‚СЂРёС†
Matrix.prototype.MultiplyMatrix = function(A,B)
{
    var rowsA = A.length, colsA = A[0].length,
        rowsB = B.length, colsB = B[0].length,
        C = [];
    if (colsA != rowsB) return false;
    for (var i = 0; i < rowsA; i++) C[i] = [];
    for (var k = 0; k < colsB; k++)
     { for (var i = 0; i < rowsA; i++)
        { var t = 0;
          for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
          C[i][k] = t;
        }
     }
    return C;
}
//РўСЂР°РЅСЃРїРѕРЅРёСЂРѕРІР°РЅРёРµ РјР°С‚СЂРёС†С‹
 Matrix.prototype.TransMatrix = function(A)       //РќР° РІС…РѕРґРµ РґРІСѓРјРµСЂРЅС‹Р№ РјР°СЃСЃРёРІ
{
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
     { AT[i] = [];
       for (var j = 0; j < m; j++) AT[i][j] = A[j][i];
     }
    return AT;
}
//РЎР»РѕР¶РµРЅРёРµ РјР°С‚СЂРёС†
Matrix.prototype.SumMatrix = function(A,B)       //РќР° РІС…РѕРґРµ РґРІСѓРјРµСЂРЅС‹Рµ РјР°СЃСЃРёРІС‹ РѕРґРёРЅР°РєРѕРІРѕР№ СЂР°Р·РјРµСЂРЅРѕСЃС‚Рё
{
    var m = A.length, n = A[0].length, C = [];
    for (var i = 0; i < m; i++)
     { C[i] = [];
       for (var j = 0; j < n; j++) C[i][j] = A[i][j]+B[i][j];
     }
    return C;
}
//РЈРјРЅРѕР¶РµРЅРёРµ РјР°С‚СЂРёС†С‹ РЅР° С‡РёСЃР»Рѕ
Matrix.prototype.multMatrixNumber = function(a,A)  // a - С‡РёСЃР»Рѕ, A - РјР°С‚СЂРёС†Р° (РґРІСѓРјРµСЂРЅС‹Р№ РјР°СЃСЃРёРІ)
{
    var m = A.length, n = A[0].length, B = [];
    for (var i = 0; i < m; i++)
     { B[i] = [];
       for (var j = 0; j < n; j++) B[i][j] = a*A[i][j];
     }
    return B;
}
//Р’РѕР·РІРµРґРµРЅРёРµ РјР°С‚СЂРёС†С‹ РІ СЃС‚РµРїРµРЅСЊ
Matrix.prototype.MatrixPow = function(n,A)
{
    if (n == 1) return A;     // Р¤СѓРЅРєС†РёСЋ MultiplyMatrix СЃРј. РІС‹С€Рµ
    else return MultiplyMatrix( A, MatrixPow(n-1,A) );
}
//РћРїСЂРµРґРµР»РёС‚РµР»СЊ РјР°С‚СЂРёС†С‹
Matrix.prototype.Determinant = function(A)   // РСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ Р°Р»РіРѕСЂРёС‚Рј Р‘Р°СЂРµР№СЃР°, СЃР»РѕР¶РЅРѕСЃС‚СЊ O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}
//Р Р°РЅРі РјР°С‚СЂРёС†С‹
Matrix.prototype.MatrixRank = function(A)
{
    var m = A.length, n = A[0].length, k = (m < n ? m : n), r = 1, rank = 0;
    while (r <= k)
     { var B = [];
       for (var i = 0; i < r; i++) B[i] = [];
       for (var a = 0; a < m-r+1; a++)
        { for (var b = 0; b < n-r+1; b++)
           { for (var c = 0; c < r; c++)
              { for (var d = 0; d < r; d++) B[c][d] = A[a+c][b+d]; }
             if (Determinant(B) != 0) rank = r;
           }       // Р¤СѓРЅРєС†РёСЋ Determinant СЃРј. РІС‹С€Рµ
        }
       r++;
     }
    return rank;
}
//РЎРѕСЋР·РЅР°СЏ РјР°С‚СЂРёС†Р°
Matrix.prototype.AdjugateMatrix = function(A)   // A - РґРІСѓРјРµСЂРЅС‹Р№ РєРІР°РґСЂР°С‚РЅС‹Р№ РјР°СЃСЃРёРІ
{
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[i] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[i][j] = sign*Determinant(B);   // Р¤СѓРЅРєС†РёСЋ Determinant СЃРј. РІС‹С€Рµ
        }
     }
    return adjA;
}
//РћР±СЂР°С‚РЅР°СЏ РјР°С‚СЂРёС†Р°
Matrix.prototype.InverseMatrix = function(A)   // A - РґРІСѓРјРµСЂРЅС‹Р№ РєРІР°РґСЂР°С‚РЅС‹Р№ РјР°СЃСЃРёРІ
{
    var det = Determinant(A);                // Р¤СѓРЅРєС†РёСЋ Determinant СЃРј. РІС‹С€Рµ
    if (det == 0) return false;
    var N = A.length, A = AdjugateMatrix(A); // Р¤СѓРЅРєС†РёСЋ AdjugateMatrix СЃРј. РІС‹С€Рµ
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[i][j] /= det; }
    return A;
}
