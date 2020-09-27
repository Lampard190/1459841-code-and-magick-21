'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const TEXT_GAP = 20;
const TITLE_TEXT_X = CLOUD_X + TEXT_GAP * 3;
const TITLE_TEXT_Y = CLOUD_Y + TEXT_GAP;
const BAR_X = CLOUD_X + TEXT_GAP;
const BAR_Y = CLOUD_Y + 80;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT = 150;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const renderText = function (ctx, x, y, text, baseline) {
  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
};

const getMaxElement = function (times) {
  let maxElement = times[0];
  for (let i = 0; i < times.length; i++) {
    if (times[i] > maxElement) {
      maxElement = times[i];
    }
  }
  return maxElement;
};

const getColorBar = function (players) {
  let colorBar = `rgba(2, 14, 134, ` + Math.random(35) + `)`;
  if (players === `Вы`) {
    colorBar = `rgba(255, 0, 0, 1)`;
  }
  return colorBar;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  renderText(ctx, TITLE_TEXT_X, TITLE_TEXT_Y, `Ура! Вы победили!`);
  renderText(ctx, TITLE_TEXT_X, TITLE_TEXT_Y + GAP * 2, `Список результатов:`);

  let maxTime = getMaxElement(times);
  for (let i = 0; i < players.length; i++) {
    let currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    let coordX = BAR_X + (GAP * 4) + (BAR_WIDTH + BAR_GAP) * i;
    let coordY = BAR_Y + (BAR_HEIGHT - currentBarHeight);

    renderText(ctx, coordX, coordY, Math.floor(times[i]), `bottom`);
    renderText(ctx, coordX, BAR_Y + BAR_HEIGHT + GAP, players[i], `hanging`);

    ctx.fillStyle = getColorBar(players[i]);
    ctx.fillRect(coordX, coordY, BAR_WIDTH, currentBarHeight);
  }
};
