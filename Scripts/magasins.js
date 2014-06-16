/**
 * Created by Damien on 6/10/14.
 */
// magasin générique avec les fonctions de magasins
function Magasin(texte){
    this.Texte = texte;
}


// Car c'est là que s'achètent les compétences brave gens!
// un arbre de compétences à imaginer avec des effets divers et variés... compliquer la gestion permettrait de plus varier : ajout d'une chèvre oui mais si espace suffisant ou compétences de nanochèvre
// ou chèvre de l'espace qui se nourrit de je ne sais quoi débile et ne prend plus d'espace, etc...
// un magasin par type ? (pour séparation logique && graphique) avec notamment une ptite image de fond et à terme un style ? (et un son de chèvre ?)
function MagasinNeutre(){
    this.Magasin = new Magasin("Magasin neutre");

    // pour test
    this.Competences = [];
    this.Competences.push(new CompetenceBeginner("Automatic click", "This will help you to increase your click productivity.", "Content/img/store/hand.png", 10, 1, 0, true));
    this.Competences.push(new CompetenceBeginner("Goat Queen", "No more click again ! Thanks to this beautiful queen, no need to click again.", "Content/img/store/goat-queen.jpg", 100, 5, 0, false));
    this.Competences.push(new CompetenceBeginner("Lannister Goat", "A Lannister Goat always produce goat.", "Content/img/store/lannister-goat.jpg", 1000, 100, 0, false));
    this.Competences.push(new CompetenceBeginner("Viagra Goat", "If you're under age do not click here ! (Increase productivity and goat coït)", "Content/img/store/viagra-goat.jpg", 5000, 1000, 0, false));

   /* this.Competences = [];
    this.Competences.push(
        new Competence("qualite",
            "image",
            new Effet(EVariableEffet.qualiteLait,
                new Modificateur(EModificateur.fois, 1.1)),
            [],
            200)
    );

    this.Competences.push(
        new Competence("espace",
            "image",
            new Effet(EVariableEffet.espaceConsomme,
                new Modificateur(EModificateur.plus, 4)),
            [],
            200)
    );*/
}

// magasin doit vendre des goats (1 goat de + = plus de lait consommé).
function FirstMagasin(){
    this.Magasin = new Magasin(premierMagasin);

    this.Competences = new Array();

    // arbre "qualiteLait"
    var compLevel3 = new Competence("level 3",
                            "",
                            new Effet(EVariableEffet.qualiteLait,
                            new Modificateur(EModificateur.fois, 1.3)),
                            [],
                            1000
                            );
    var sousComps2 = [];
    sousComps2.push(compLevel3);

    var compLevel2 = new Competence("level 2",
                            "",
                            new Effet(EVariableEffet.qualiteLait,
                                new Modificateur(EModificateur.fois, 1.2)),
                            sousComps2,
                            1000
                        );

    var sousComps1 = [];
    sousComps1.push(compLevel2);

    this.Competences.push(
        new Competence("qualite",
            "image",
            new Effet(EVariableEffet.freqAutoClic,
                new Modificateur(EModificateur.fois, 1.1)),
            sousComps1,
            200)
    );

    // arbre automatic clic
    var c3 = new Competence("Trayeuse de compétition",
        "Best in the business",
        new Effet(EVariableEffet.freqAutoClic,
            new Modificateur(EModificateur.fois, 1.3)),
        [],
        10000
    );
    var s2 = [];
    s2.push(c3);

    var c2 = new Competence("Trayeuse automatique moyen de gamme",
        "Still not as fast as wished ?",
        "image",
        new Effet(EVariableEffet.freqAutoClic,
            new Modificateur(EModificateur.fois, 1.2)),
        s2,
        1000
    );

    var s1= [];
    s1.push(c2);

    this.Competences.push(
        new Competence("Trayeuse automatique de base",
            "Sick having dirty hands ? Try this!",
            "image",
            new Effet(EVariableEffet.qualiteLait,
                new Modificateur(EModificateur.fois, 1.1)),
            s1,
            200)
    );

    // arbre espace
    this.Competences.push(
        new Competence("espace",
            "image",
            new Effet(EVariableEffet.espaceConsomme,
                new Modificateur(EModificateur.plus, 4)),
            [],
            200)
    );
}

function MagasinDemonique(){
    this.Magasin = new Magasin("Magasin démoniaque");
}
