'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var CLOUD_X_PADDING = 20;
var CLOUD_Y_PADDING = 30;
var FONT_GAP = 20;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (times) {
  var maxElement = times[0];

  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_X_PADDING, CLOUD_Y_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_X_PADDING, CLOUD_Y_PADDING + FONT_GAP);

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%)';
    }
    ctx.fillText(players[i], CLOUD_X + (CLOUD_X_PADDING * 2) + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
    ctx.fillRect(CLOUD_X + (CLOUD_X_PADDING * 2) + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - CLOUD_Y_PADDING, COLUMN_WIDTH, -(COLUMN_HEIGHT * Math.round(times[i])) / maxTime);
    ctx.fillText(Math.round(times[i]), CLOUD_X + (CLOUD_X_PADDING * 2) + (COLUMN_WIDTH + COLUMN_GAP) * i, -(COLUMN_HEIGHT * Math.round(times[i])) / maxTime + CLOUD_HEIGHT - CLOUD_Y_PADDING - FONT_GAP);
  }
};
