<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../model/user.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$product->id = isset($_GET['code']) ? $_GET['code'] : die();
 
// read the details of product to be edited
$product->readOne();
 
$product_arr = array(
    "id" =>  $product->id,
    "name" => $product->name,
    "code" => $product->code,
);
 
// make it json format
print_r(json_encode($product_arr));
?>