<?php


$domain = "http://104.198.0.197:8080";
$apikey = "307a2cb5894d4ba7a98f1f03672d00d3";



//get legislators details
if ($_GET['bioguide_id'] ) {
    $data = file_get_contents($domain . "/legislators?per_page=all&bioguide_id=" . $_GET['bioguide_id'] . "&apikey=" . $apikey);
    header('Content-type: application/json');
    echo  $data;
}

//get committees info from one legislators
if ($_GET['committees'] ) {
    $data = file_get_contents($domain . "/committees?member_ids=" . $_GET['committees'] . "&per_page=5&" . "&apikey=" . $apikey);
    header('Content-type: application/json');
    echo  $data;
}

//get bills info from one legislators
if ($_GET['bills'] ) {
    $data = file_get_contents($domain . "/bills?sponsor_id=" . $_GET['bills'] . "&per_page=5&" .  "&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}


//get all house legislators
if ( $_GET['house'] ) {
    $data = file_get_contents($domain . "/legislators?per_page=all&chamber=house&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}

//get all house legislators
if ( $_GET['senate'] ) {
    $data = file_get_contents($domain . "/legislators?per_page=all&chamber=senate&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}

//get all legislators
if ( $_GET['legislators'] ) {
    $data = file_get_contents($domain . "/legislators?per_page=all&apikey=" . $apikey);
    header('Content-type: application/json');
    echo  $data;
}

//get all bills
if ( $_GET['allbills'] ) {
    $data = file_get_contents($domain . "/bills?per_page=50&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}

//get bill detials
if ( $_GET['bill_details'] && $_GET['chamber_type']) {
    $data = file_get_contents($domain . "/bills?bill_id=" . $_GET['bill_details'] . "&chamber=" . $_GET['chamber_type'] .  "&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}

//get all house committees
if ( $_GET['allhousecommittees'] ) {
    $data = file_get_contents($domain . "/committees?chamber=house&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}
//get all senate committees
if ( $_GET['allsenatecommittees'] ) {
    $data = file_get_contents($domain . "/committees?chamber=senate&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}
//get all joint committees
if ( $_GET['alljointcommittees'] ) {
    $data = file_get_contents($domain . "/committees?chamber=joint&apikey=" . $apikey);
    header('Content-type: application/json');
    echo $data;
}


?>