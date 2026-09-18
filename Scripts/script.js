  $(window).load(function () {
    $('.banner').unslider({
        fluid: true,
        dots: true,
        speed: 500,
        delay: 8000
    });
    if (window.chrome) {
        $('.banner li').css('background-size', '100% 100%');
    }
});

$(function () {
    var pull = $('#pull');
    var menu = $('nav ul');

    $(pull).on('click', function (e) {
        e.preventDefault();
        menu.slideToggle();
    });
});
$(window).resize(function () {
    var menu = $('nav ul');
    var w = $(window).width();
    if (w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});

$(function () {

    var chaineSave = getSauvegarde();
    var retrievedObject = JSON.parse(chaineSave);
    var sysinfos = new SysInfos();

    var interval;

    var nbClick = 0;
    var production_manuelle = 1;
    var production_automatique = 0;

    //----------------------------------------------------------
    var mainGoat = $("#mainGoat");
    var lblGoats = $("#lblGoats");
    var goatclickproducer_cost = $("#goatclickproducer_cost");
   
    var btnSave = $("#btnSave");
    var btnImport = $("#btnImport");
    var btnExport = $("#btnExport");
    //----------------------------------------------------------

    if (retrievedObject != null) {

        lblGoats.text(retrievedObject.goats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
        nbClick = retrievedObject.nbClick;
        production_manuelle = retrievedObject.productionManuelle;
        production_automatique = retrievedObject.productionAutomatique;
        sysinfos.Magasins = retrievedObject.magasin;
    }
    else
    {
        retrievedObject = getSauvegardeObject();
        lblGoats.text(retrievedObject.goats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")); 
    }

    function checkCompetences()
    {
        var competences = $(".competence");
        
        // parcourir les div compétences. Pour chaque, vérifier le prix, si argent dispo alors on permet l'achat
        for (var i = 0; i < competences.length; i++) {
            var position = competences[i].getAttribute("position")
            if(sysinfos.Magasins.Competences[position].Prix <= retrievedObject.goats)
            {
                competences[i].removeAttribute('disabled');
            }
            else
            {
                competences[i].setAttribute('disabled', 'disabled');
            }
        };
    }  

    checkCompetences();

    /*
    BLOC TEST DAMIEN
    *
     */
    //var si = new SysInfos();

    //  var banque = si.Banque;
    // var Magasin = si.Magasins
    // var Player = si.Player

    // on click goat
    //qté production lait :
    //var qteLaitProduiteOnClick = si.Banque.GenererProduction(si.Player);
    // et donc si stockage :
    //si.Player.LaitAccumule += si.Banque.GenererProduction(si.Player);
    // or
    //si.GenererProductionClic();
    // TODO : faire chainons manquants pour rattrapage lors chargement sauvegarde
    // si.ApplyAutoClics();

    // génération revenu (si pas stockage, actions liées):
    //var revenuOnClick = si.Banque.GenererRevenu(si.Player);

    // génération de click auto
    // (si.Player.FrequenceAutomaticClic * secondes) * Si.GenererProduction();
    // comme objets "internes" au si =>

    // achat goat => plus de production
    // TODO : ajouter goats aux magasins
  //  var goatAchetee;
  //  var priceAchat;
  //  if (si.Player.CanBuyGoat(goatAchetee, priceAchat)){
  //      si.Player.BuyGoat(goatAchetee, priceAchat);
  //  }
    //influera production future



    /*
               FIN BLOC
                */


   
    interval = setInterval(function() 
    { 
        retrievedObject.goats+= production_automatique; 
        setSauvegarde(retrievedObject);
        lblGoats.text(retrievedObject.goats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")); 
        checkCompetences();
    }, 1000);           

    for (var i = 0; i < sysinfos.Magasins.Competences.length; i++) {
        var blocHtml = competenceToHtml(sysinfos.Magasins.Competences[i], i);

        $("#beginnerStore").append(blocHtml);
    }            

    $(".competence").click(function() {
        var possibiliteAchat = $(this).attr('disabled');

        if(possibiliteAchat == undefined)
        {
            var position = $(this).attr('position');
            var price = sysinfos.Magasins.Competences[position].Prix;
            
            var gain = sysinfos.Magasins.Competences[position].Gain;

            retrievedObject.goats-=  Math.floor(price);  
            
            if(sysinfos.Magasins.Competences[position].GainManuel)
            {
                production_manuelle+= gain;
            }
            else
            {
                production_automatique+= gain;
            }

            sysinfos.Magasins.Competences[position].LevelStore++;
            var niveau = sysinfos.Magasins.Competences[position].LevelStore;

            retrievedObject.productionAutomatique = production_automatique;
            retrievedObject.productionManuelle = production_manuelle;


            // Calcul du prochain prix par rapport au niveau (trop linéaire pour le moment)
            sysinfos.Magasins.Competences[position].Prix = Math.floor((sysinfos.Magasins.Competences[position].Prix * (niveau + 1)) + ((position * 40) * niveau));
            sysinfos.Magasins.Competences[position].Gain = Math.floor((sysinfos.Magasins.Competences[position].Gain * (niveau + 1)) + ((position * 20) * niveau));

            $("#goat" + position + "_cost").text(sysinfos.Magasins.Competences[position].Prix);
            $("#goat" + position + "_gain").text(sysinfos.Magasins.Competences[position].Gain);

            //lblGoats.text(retrievedObject.goats);
            retrievedObject.magasin = sysinfos.Magasins;
            setSauvegarde(retrievedObject);

            checkCompetences();
        }               
    });

    btnSave.click(function() {
        retrievedObject.magasin = sysinfos.Magasins;
        setSauvegarde(retrievedObject);
        alert('Save done');
    });

    mainGoat.click(function (e) {

        // gestion du son aléatoire
        var son = sounds[Math.floor((Math.random() * (sounds.length - 1)) + 0)];
        startSound("Sounds/" + son.src);
        // affichage du son aléatoire
        var id = Date.now();
        var word = '<div id="goatWord'+id+'"><p>' + son.label + '</p></div>'; 
        var style = generationCssSound();                

        $("#goatPart").append(word);
        var goatWord = $("#goatWord"+id);
        goatWord.css(style);
        goatWord.addClass('displayed-label-sound');
        goatWord.fadeIn("slow").delay(500).fadeOut(300, function(){
            $(this).remove();
        });


        mainGoat.animate({
            height : "-=20",
            width : "-=20"
        }, 50, function()
                {
                     mainGoat.animate({
                    height : "+=20",
                    width : "+=20"
                }, 50);  
        });       

        retrievedObject.goats+= Math.floor(production_manuelle);

        retrievedObject.goats = Math.floor(retrievedObject.goats);
        nbClick++;
        lblGoats.text(retrievedObject.goats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
                       
        retrievedObject.nbClick = nbClick;

        setSauvegarde(retrievedObject);

        var label = $("<label>").attr('id', "lblplus");
        label.attr('class', 'plusone');
       
        label.text("+" + production_manuelle);
        label.css({ 'top' : e.clientY -50, 'left' : e.clientX - 10});

        $('html').append(label);

        label.animate({
            opacity: 0,
            top: "-=50"
        }, "slow", function () {
            label.remove();
        });  

        checkCompetences();            
    });

    $("#btnReinit").click(function () {
        clearInterval(interval);
        supprimerSauvegarde();
        location.reload();
    });

    btnExport.click(function(){
        var chaineBase64 = Base64.encode(JSON.stringify(retrievedObject));
        prompt("Please copy and save this string in order to use it later for import game:", chaineBase64);
    });

    btnImport.click(function()
    {
        var chaineBase64 = prompt("Please paste your string save in order to load a game. \n Be aware that an import will erase your current game...");
        retrievedObject = JSON.parse(Base64.decode(chaineBase64));
        setSauvegarde(retrievedObject);
        location.reload();
    });
});