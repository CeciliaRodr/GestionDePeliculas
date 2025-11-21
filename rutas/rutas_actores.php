<?php

Flight::route('GET /actores', function(){
    $db = Flight::db();
    $sentencia = $db->prepare("SELECT * FROM Actor");
    $sentencia->execute();
    if (ob_get_length()) ob_clean();
    Flight::json($sentencia->fetchAll());
});

Flight::route('POST /actores', function(){
    $db = Flight::db();
    $d = Flight::request()->data;
    
    if (!isset($d->nombre) || !isset($d->apellido)) {
        Flight::json(['error' => 'Faltan datos'], 400);
        return;
    }

    $sentencia = $db->prepare("INSERT INTO Actor (nombre, apellido, nacionalidad) VALUES (?, ?, ?)");
    $sentencia->execute([$d->nombre, $d->apellido, $d->nacionalidad]);
    
    Flight::json(['mensaje' => 'Actor creado'], 201);
});

Flight::route('PUT /actores/@id', function($id){
    $db = Flight::db();
    $d = Flight::request()->data;

    $sentencia = $db->prepare("UPDATE Actor SET nombre=?, apellido=?, nacionalidad=? WHERE id_actor=?");
    $sentencia->execute([$d->nombre, $d->apellido, $d->nacionalidad, $id]);

    Flight::json(['mensaje' => 'Actor actualizado']);
});

Flight::route('DELETE /actores/@id', function($id){
    $db = Flight::db();
    $sentencia = $db->prepare("DELETE FROM Actor WHERE id_actor=?");
    $sentencia->execute([$id]);

    Flight::json(['mensaje' => 'Actor eliminado']);
});
