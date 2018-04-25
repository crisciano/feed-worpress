$(function() {
    getPosts();
});

function getPosts(){
    $.ajax({
        url: 'php/feed-wd.php',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            // set as variaveis
            var d = document;
            var defaultUrl = 'img/img.jpg';
            var classPost = "col-lg-4 post";
            var classImg = "img-fluid";
            var classIcon = 'fa fa-picture-o fa-4x';
            var classNoImg = 'no-img d-flex align-items-center justify-content-center';
            var textButton = 'Ler mais';
            var textMsg = 'Sem feed no momento..';
            var feedBlog = d.getElementById("feed-blog");
            var loading = d.getElementById("buscando");
            var size = data.length;

            // remove loading
            loading.classList.add('d-none');

            // validação pra exibir msg se nao existir posts
            if (size > 1) {
                // foreach para percorer os resultados
                data.forEach((res) =>{
                    // variaveis
                    var post = d.createElement('div');
                    var dataImg = res.img;
                    var dataTitle = res.title;
                    var dataDescription = res.description.substring(0, 150) + '...';
                    var dataUrl = res.url;

                    // criar o box da img img
                    var boxImg = d.createElement('div');
                    // criar a img
                    var img = d.createElement('img');
                    // atribuir a class img
                    boxImg.setAttribute('class','img');
                    // verificar se existe img relacionada
                    if (dataImg) { 
                        // atribuir a class classImg
                        img.setAttribute('class', classImg);
                        // atribuir o src da data[0]['img'];
                        img.setAttribute('src', dataImg);
                        // appendchild da img no boxImg
                        boxImg.appendChild(img);
                    }else{ 
                        // cria o i
                        var icon = d.createElement('i');
                        // atribui class classIcon
                        icon.setAttribute('class', classIcon);
                        // append i em box img
                        boxImg.appendChild(icon);
                        // atribui o class no-img no box
                        boxImg.setAttribute('class', classNoImg);
                        // img.setAttribute('src',defaultUrl); 
                    }
                    // appendchild boxImg no post
                    post.appendChild(boxImg);

                    // criar a div title
                    var title = d.createElement('div');
                    // criar o h5 
                    var h5 = d.createElement('h5');
                    // atribuir a class title
                    title.setAttribute('class','title');
                    // atribuir o html data[0]['title']
                    h5.innerHTML = dataTitle;
                    // append o h5 no title
                    title.appendChild(h5);
                    // appent title no post
                    post.appendChild(title);

                    // criar a div description
                    var description = d.createElement('div');
                    // criar o p 
                    var p = d.createElement('p');
                    // atribuir a class description
                    description.setAttribute('class','description');
                    // atribuir o text dataDescription ao p
                    p.innerHTML = dataDescription;
                    // append o p na description
                    description.appendChild(p);
                    // append a description no post
                    post.appendChild(description);

                    // criar a div link
                    var link = d.createElement('div');
                    // criar o a
                    var a = d.createElement('a');
                    // atriburir a class link no link
                    link.setAttribute('class', 'link');
                    // atribuir texto Ler mais no a
                    a.innerHTML = textButton;
                    // atribuir o href dataUrl no a
                    a.setAttribute('href', dataUrl);
                    // append o a no link
                    link.appendChild(a);
                    // append o link no post
                    post.appendChild(link);

                    // criar o post
                    post.setAttribute('class', classPost);
                    // incluir o post no feed-blog
                    feedBlog.appendChild(post);
                });
            }else{
                // criar msg para sem feed
                var msg = d.createElement('div');
                // align text no centro
                msg.setAttribute('class','text-center');
                var h5 = d.createElement('h5');
                h5.innerHTML = textMsg;
                // append h5 na msg
                msg.appendChild(h5);
                // append msg no post
                post.appendChild(msg);
            }

        }
    });     
}