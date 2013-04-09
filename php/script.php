<?php
//header("Content-Type: text/javascript");
require_once('Init.php');
if($Account->login()){
  if(!isset($_GET['stat'])){
?>
Game={
	'scene' : <?php echo json_encode(Scene::getInfo());?>,
	'character' : <?php echo json_encode(Character::getInfo());?>,
};
<?php
	}
?>
Game.stat = {
  'self' : {
    'history' : <?php echo json_encode(Stat::getHistory());?>,
    'rank' : <?php echo json_encode(Stat::getSelfRankList());?>,
    'height':<?php echo json_encode(Stat::getSelfHeightList());?>,
    'time':<?php echo json_encode(Stat::getSelfTimeList());?>,
    'highest':<?php echo json_encode(Stat::getSelfHighest());?>,
    'fasteest':<?php echo json_encode(Stat::getSelfFastest());?>,
  },
  'global' : {
    'height':<?php echo json_encode(Stat::getGlobalHeight());?>,
    'time':<?php echo json_encode(Stat::getGlobalTime());?>,
  },
  'sself' : {
    'history' : <?php echo json_encode(Stat::getSceneHistory());?>,
    'rank' : <?php echo json_encode(Stat::getSceneSelfRankList());?>,
    'height':<?php echo json_encode(Stat::getSceneSelfHeightList());?>,
    'time':<?php echo json_encode(Stat::getSceneSelfTimeList());?>,
    'highest':<?php echo json_encode(Stat::getSceneSelfHighest());?>,
    'fasteest':<?php echo json_encode(Stat::getSceneSelfFastest());?>,
  },
  'sglobal' : {
    'height':<?php echo json_encode(Stat::getSceneGlobalHeight());?>,
    'time':<?php echo json_encode(Stat::getSceneGlobalTime());?>,
  },
};
<?php
}