/**
 * Created by Damien on 6/10/14.
 */
function SysInfos(){

    this.Banque = ko.observable(new Banque(20));
    // à remplacer par tab de magasins
    this.Magasins = new MagasinNeutre();

    this.Player = ko.observable(new Player());

    this.DemonicStore = ko.observable(new DemonicStore());

    this.GenererProductionClic = function(){
        return this.Banque.GenererProduction(this);
    }

    // TODO prendre timestamp derniere sauvegarde pour différentiel lorsque reprise
    // if elements lazy (G.Lutins), alors on peut appliquer un coefficient réducteur (voir si on le met pas dans la compétence) en mode "non connecté)
    this.LastTime = 0;

    this.TimeDiff = function(){
        // return dateTime.Now - this.LastTime;
    }

    // applique le différentiel de temps * la production par seconde
    this.ApplyAutoClics  = function(){
        this.Player.LaitAccumule += this.TimeDiff() * this.GenererProductionClic();
    }

    this.SkillBought = function(skill){
        // player achat
        this.Player().BuySkill(skill);

        // competence "level-up"
        skill.GainLevel();
    }

    this.Test = function(){
        alert("à malibouuuuu");
    }

}


ko.applyBindings(new SysInfos());

// commercant : dans un premier temps simple niveau

// evt démonic : production augmentée, population doublée, évolution techno ou particulière, etc
