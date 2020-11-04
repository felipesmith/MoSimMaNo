'use strict';

/*
*
* JSXGraph added functions
*
*/

function clearAllSingleGraph() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-7, 7, 7, -7], axis: true});
}

function clearAll() {
    JXG.JSXGraph.freeBoard(board);
    JXG.JSXGraph.freeBoard(boardd);
    board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-7, 7, 7, -7], axis: true});
    boardd = JXG.JSXGraph.initBoard('result', {boundingbox: [-7, 5, 7, -5], axis: true});
}

function joinPointsInGraph(name, color, data_x, data_y) {
    board.create('curve',
        [data_x, data_y],
        {
            strokeColor: color,
            strokeWidth: 2
        });
}

function addResultToSecondGraph(mathFunction, a, b) {
    fd = boardd.jc.snippet(mathFunction, true, 'x', true);
    curved = boardd.create('functiongraph', [fd,
        function () {
            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], boardd);
            return c.usrCoords[1];
        },
        function () {
            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [boardd.canvasWidth, 0], boardd);
            return c.usrCoords[1];
        }]);

    var i1 = boardd.create('integral', [[a, b], curved]);
}

function addFunctionToGraph(mathFunction, color) {
    f = board.jc.snippet(mathFunction, true, 'x', true);
    curve = board.create('functiongraph', [f,
        function () {
            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0, 0], board);
            return c.usrCoords[1];
        },
        function () {
            var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [board.canvasWidth, 0], board);
            return c.usrCoords[1];
        }]);
}


/*
*
* Math Equation Utils
*
*/

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
        let resultado = evaluateFunction(mathFunction, xEv);

        if (resultado > max) {
            max = resultado;
            x = xEv;
        }
    }
    return [max, x];
}

function preprocessMQtoMath(mqString) {
    var result;
    result = mqString.replace(/\\cdot\\/g, "*");
    result = result.replace(/\\cdot/g, "*");
    result = result.replace(/\\ln/g, "log");
    result = result.replace(new RegExp('{'), '(');
    result = result.replace(new RegExp('}'), ')');
    result = result.replace(new RegExp('~'), '');
    return result;
}