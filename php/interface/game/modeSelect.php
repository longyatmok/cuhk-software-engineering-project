	<div class="title"></div>
  <div class="background">
    <table>
    	<tbody class="cHeight">
        <tr>
          <td class="scaleBg" style="background-image:url(img/game/modeSelect/modeSelect.png)"></td>
          <td class="right" rowspan="3">
            <div id="modeselect_rank"  class="scaleBg bgCenter"  style="background-image:url(img/game/modeSelect/rank.png)">
              <img class="link" src="img/t1x1.png" onclick="showRDiv('rank')">
            </div>
          </td>
        </tr>
        <tr>

          <td class="link scaleBg" onclick="hideRDiv();game.setRegion('simple','free');game.overlay.changeState('instruction');" style="background-image:url(img/game/modeSelect/practice.png)"></td>
        </tr>
        <tr>
          <td class="link scaleBg" onclick="game.modules['Room-Module'].requestRoomList('free');" style="background-image:url(img/game/modeSelect/online.png)"></td>

        </tr>
      </tbody>
    </table>
	</div>