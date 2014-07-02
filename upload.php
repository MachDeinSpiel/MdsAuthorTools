<?php

header('Access-Control-Allow-Origin: *');

if (isset($_POST['json'])) {

	$json = $_POST['json'];
	$gamename = $_POST['gamename'];
	$time = time();
	$filename = $gamename."_".$time.".json";
	
	$file = fopen("jsons/".$filename."","w");
	fwrite($file, $json);
	fclose($file);
	echo "mds.informatik.hs-bremen.de:1380/authortools/jsons/".$filename;

} else {
	echo "Error: No JSON ";
	exit();
}

?>