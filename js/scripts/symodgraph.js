'use strict';

/** Funciones JSXGraph */

function clearGraph() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-7, 7, 7, -7], axis: true});
}

function curveGraph(name, color, data_x, data_y) {
    board.create('curve',
        [data_x, data_y],
        {
            strokeColor: color,
            strokeWidth: 2
        });
}


/** Funciones Matematicas */

function evaluateFunction(mathFunction, x, y) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;

    const node2 = math.parse(mathFunction);
    const code2 = node2.compile();

    let scope = {
        x: x,
        y: y
    }

    return code2.evaluate(scope);
}

function findMax(mathFunction, a, b) {
    var max = -999;
    var x = -999;
    var n = (b - a) / 0.1;
    var xEv;

    for (var i = 0; i < n; i++) {
        xEv = a + 0.1 * i;
        let result = evaluateFunction(mathFunction, xEv);

        if (result > max) {
            max = result;
            x = xEv;
        }
    }
    return [max, x];
}

function preprocessMQtoMath(mq) {
    let result;
    result = mq.replace(/\\cdot\\/g, "*");
    result = result.replace(/\\cdot/g, "*");
    result = result.replace(/\\ln/g, "log");
    result = result.replace(/\\frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
    result = result.replace(new RegExp('{'), '(');
    result = result.replace(new RegExp('}'), ')');
    result = result.replace(new RegExp('~'), '');
    return result;
}