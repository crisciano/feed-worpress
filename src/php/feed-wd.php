<?php
// config header
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
//Include WordPress
define('WP_USE_THEMES', false);
require('../blog/wp-load.php');
// recebe o numero de postes 
$n = $_GET['n']; 

// se houver um numero de post
if($n) {
	$showposts = 'showposts='.$n;
	// echo $showposts;
	query_posts($showposts);
}else{
	//Define quantos posts serão exibidos
	query_posts('showposts=3');
}
// while para percorrer os posts se houver
while (have_posts()): the_post();  
	// get img $post = null e tamanho medium pode ser 'thumbnail', 'medium', 'large', 'full'
	$obj['img'] 		= get_the_post_thumbnail_url(null, 'medium'); 
	// get title do post
	$obj['title'] 		= get_the_title();
	// get description do post
	$obj['description'] = get_the_excerpt();
	// get url referente ao post no blog
	$obj['url'] 		= get_the_permalink();
	// inclui o objt no data
	$data[] 			= $obj;
// fim do while
endwhile;
// transforma o data em um json
echo json_encode($data);
?>