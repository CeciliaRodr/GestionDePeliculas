<?php
require 'vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$config = [
    'host' => '127.0.0.1',
    'db'   => 'TP_SEMINARIO_CINE',
    'user' => 'root',
    'pass' => '' 
];

Flight::register('db', 'PDO', array(
    "mysql:host={$config['host']};dbname={$config['db']};charset=utf8", 
    $config['user'], 
    $config['pass'],
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
));

require 'rutas/rutas_peliculas.php';
require 'rutas/rutas_actores.php';
require 'rutas/rutas_premios.php';
require 'rutas/rutas_especiales.php';

Flight::route('/', function(){
    if(file_exists('index.html')) readfile('index.html');
    else echo "Falta el archivo index.html";
});

Flight::start();