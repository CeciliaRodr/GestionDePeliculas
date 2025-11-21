<?php

Flight::route('GET /peliculas', function(){
    $db = Flight::db();
    $req = $db->prepare("SELECT * FROM Pelicula");
    $req->execute();
    if (ob_get_length()) ob_clean();
    Flight::json($req->fetchAll());
});

Flight::route('POST /peliculas', function(){
    $db = Flight::db();
    $d = Flight::request()->data;
    if (!isset($d->titulo)) { Flight::json(['error'=>'Faltan datos'],400); return; }
    $req = $db->prepare("INSERT INTO Pelicula (titulo, genero, anio_estreno) VALUES (?,?,?)");
    $req->execute([$d->titulo, $d->genero, $d->anio_estreno]);
    Flight::json(['mensaje'=>'Creado'], 201);
});

Flight::route('PUT /peliculas/@id', function($id){
    $db = Flight::db();
    $d = Flight::request()->data;
    $req = $db->prepare("UPDATE Pelicula SET titulo=?, genero=?, anio_estreno=? WHERE id_pelicula=?");
    $req->execute([$d->titulo, $d->genero, $d->anio_estreno, $id]);
    Flight::json(['mensaje'=>'Actualizado']);
});

Flight::route('DELETE /peliculas/@id', function($id){
    $db = Flight::db();
    $req = $db->prepare("DELETE FROM Pelicula WHERE id_pelicula=?");
    $req->execute([$id]);
    Flight::json(['mensaje'=>'Eliminado']);
});

Flight::route('GET /peliculas/@id/detalle', function($id){
    $db = Flight::db();

    $qPeli = $db->prepare("SELECT * FROM Pelicula WHERE id_pelicula = ?");
    $qPeli->execute([$id]);
    $peli = $qPeli->fetch();

    $qActores = $db->prepare("
        SELECT A.nombre, A.apellido, PA.rol 
        FROM Actor A 
        JOIN Pelicula_Actor PA ON A.id_actor = PA.id_actor 
        WHERE PA.id_pelicula = ?
    ");
    $qActores->execute([$id]);
    $actores = $qActores->fetchAll();

    $qPremios = $db->prepare("
        SELECT PR.nombre, PP.anio_ganado 
        FROM Premio PR 
        JOIN Pelicula_Premio PP ON PR.id_premio = PP.id_premio 
        WHERE PP.id_pelicula = ?
    ");
    $qPremios->execute([$id]);
    $premios = $qPremios->fetchAll();

    Flight::json([
        'info' => $peli,
        'actores' => $actores,
        'premios' => $premios
    ]);
});
