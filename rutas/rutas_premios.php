<?php
Flight::route('GET /premios', function(){
    $db = Flight::db();
    $req = $db->prepare("SELECT * FROM Premio");
    $req->execute();
    if (ob_get_length()) ob_clean();
    Flight::json($req->fetchAll());
});

Flight::route('POST /premios', function(){
    $db = Flight::db();
    $d = Flight::request()->data;
    
    if (!isset($d->nombre)) {
        Flight::json(['error' => 'Falta nombre'], 400);
        return;
    }
    
    $req = $db->prepare("INSERT INTO Premio (nombre, organizacion) VALUES (?,?)");
    $req->execute([$d->nombre, $d->organizacion]);
    
    Flight::json(['mensaje' => 'Premio creado'], 201);
});

Flight::route('PUT /premios/@id', function($id){
    $db = Flight::db();
    $d = Flight::request()->data;
    
    $req = $db->prepare("UPDATE Premio SET nombre=?, organizacion=? WHERE id_premio=?");
    $req->execute([$d->nombre, $d->organizacion, $id]);
    
    Flight::json(['mensaje' => 'Premio actualizado']);
});

Flight::route('DELETE /premios/@id', function($id){
    $db = Flight::db();
    $req = $db->prepare("DELETE FROM Premio WHERE id_premio=?");
    $req->execute([$id]);
    
    Flight::json(['mensaje' => 'Premio borrado']);
});
