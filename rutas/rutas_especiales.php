<?php
Flight::route('POST /peliculas/@id_p/actores', function($id_p){
    $db = Flight::db();
    $d = Flight::request()->data;
    $req = $db->prepare("INSERT INTO Pelicula_Actor (id_pelicula, id_actor, rol) VALUES (?,?,?)");
    $req->execute([$id_p, $d->id_actor, $d->rol]);
    Flight::json(['mensaje' => 'Asignado']);
});

Flight::route('POST /peliculas/@id_p/premios', function($id_p){
    $db = Flight::db();
    $d = Flight::request()->data;
    $req = $db->prepare("INSERT INTO Pelicula_Premio (id_pelicula, id_premio, anio_ganado) VALUES (?,?,?)");
    $req->execute([$id_p, $d->id_premio, $d->anio_ganado]);
    Flight::json(['mensaje' => 'Asignado']);
});

Flight::route('POST /actores/@id_a/premios', function($id_a){
    $db = Flight::db();
    $d = Flight::request()->data;
    $req = $db->prepare("INSERT INTO Actor_Premio (id_actor, id_premio, anio_ganado) VALUES (?,?,?)");
    $req->execute([$id_a, $d->id_premio, $d->anio_ganado]);
    Flight::json(['mensaje' => 'Asignado']);
});


Flight::route('GET /peliculas/buscar/por_genero', function(){
    $db = Flight::db();
    $g = Flight::request()->query['genero'];
    $req = $db->prepare("SELECT * FROM Pelicula WHERE genero=?");
    $req->execute([$g]);
    
    if (ob_get_length()) ob_clean();
    Flight::json($req->fetchAll());
});

Flight::route('GET /peliculas/buscar/por_actor', function(){
    $db = Flight::db();
    $n = Flight::request()->query['nombre'];
    
    $sql = "SELECT P.* FROM Pelicula P 
            JOIN Pelicula_Actor PA ON P.id_pelicula = PA.id_pelicula 
            JOIN Actor A ON PA.id_actor = A.id_actor 
            WHERE A.nombre LIKE ? OR A.apellido LIKE ?";
            
    $req = $db->prepare($sql);
    $req->execute(["%$n%", "%$n%"]);
    
    if (ob_get_length()) ob_clean();
    Flight::json($req->fetchAll());
});

Flight::route('GET /reportes/peliculas_mas_premiadas', function(){
    $db = Flight::db();
    
    $sql = "SELECT P.id_pelicula, P.titulo, COUNT(PP.id_premio) as total 
            FROM Pelicula P LEFT JOIN Pelicula_Premio PP ON P.id_pelicula = PP.id_pelicula 
            GROUP BY P.id_pelicula, P.titulo ORDER BY total DESC";
            
    $req = $db->prepare($sql);
    $req->execute();
    
    if (ob_get_length()) ob_clean();
    Flight::json($req->fetchAll());
});