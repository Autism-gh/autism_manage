/*
 * @Description: 
 * @Version: 2.0
 * @Autor: wuchuang
 * @Date: 2019-09-23 18:17:27
 * @LastEditors: wuchuang
 * @LastEditTime: 2019-09-23 18:17:27
 */
function geoToPoint(input) {
    var geo = input.substr(1);
    var idx = 0;
    var len = geo.length;
    var points = [];
    while (idx < len) {
        var c = geo.charAt(idx);
        if (c === '=') {
            points.push(incr(geo.substr(idx + 1, 12)));
            idx += 13
        } else {
            if (c === ';') break;
            else {
                var p = dh(geo.substr(idx, 8), points);
                points.push(p);
                idx += 8
            }
        }
    }

    return points.map(item => [item[0] / 100, item[1] / 100])
}

function dh(a, points) {
    if (!points.length) throw new Error('last none is undefined');
    for (var d = 0, e = 0, f = 0, g = 0; 4 > g; g++) {
        f = ch(a.substr(g, 1));
        if (0 > f) return -1 - g;
        d += f << 6 * g;
        f = ch(a.substr(4 + g, 1));
        if (0 > f) return -5 - g;
        e += f << 6 * g
    }
    d > 8388608 && (d = 8388608 - d);
    e > 8388608 && (e = 8388608 - e);
    var last = points[points.length - 1];

    return [last[0] + d, last[1] + e]
}

function ch(a) {
    var b = a.charCodeAt(0);
    return 'A' <= a && 'Z' >= a ? b - 65 : 'a' <= a && 'z' >= a ? 26 + b - 97 : '0' <= a && '9' >= a ? 52 + b - 48 :
        '+' == a ? 62 : '/' == a ? 63 : -1
}


function incr(geo) {
    var T = 0;
    var cF = 0;
    var cE = 0;
    for (var cC = 0; cC < 6; cC++) {
        cE = ch(geo.substr(cC, 1));
        if (cE < 0) {
            throw new Error(-cC)
        }
        T += cE << (6 * cC);
        cE = ch(geo.substr(6 + cC, 1));
        if (cE < 0) {
            throw new Error(-6 - cC)
        }
        cF += cE << (6 * cC)
    }
    return [T, cF]
}


var MCBAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];
var MC2LL = [[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2], [-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37], [-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]];

 function convertMC2LL(cB) {
     var cC, cE;
     cC = [Math.abs(cB[0]), Math.abs(cB[1])];
     for (var cD = 0; cD < MCBAND.length; cD++) {
         if (cC[1] >= MCBAND[cD]) {
             cE = MC2LL[cD];
             break
         }
     }
     var T = convertor(cB, cE);
     return [+T[0].toFixed(6), +T[1].toFixed(6)]
 }
 function convertor(cC, cD) {
     if (!cC || !cD) {
         return
     }
     var T = cD[0] + cD[1] * Math.abs(cC[0]);
     var cB = Math.abs(cC[1]) / cD[9];
     var cE = cD[2] + cD[3] * cB + cD[4] * cB * cB + 
     cD[5] * cB * cB * cB + cD[6] * cB * cB * cB * cB + 
     cD[7] * cB * cB * cB * cB * cB + cD[8] * cB * cB * cB * cB * cB * cB;
     T *= (cC[0] < 0 ? -1 : 1);
     cE *= (cC[1] < 0 ? -1 : 1);
     return [T, cE]
 }


export const geo2coord = (geo) => geoToPoint(geo).map(item => convertMC2LL(item))
