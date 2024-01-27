<?php

namespace App\DataFixtures;


use Faker\Factory;
use App\Entity\Article;
use App\Entity\User;
use App\Entity\Bloc;
use App\Entity\Theme;



use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\String\Slugger\SluggerInterface;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher,private SluggerInterface $slugger)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {

        $faker_factory = Factory::create('fr_FR');

        // le visiteur qui ne peut que naviguer sur le site
        // l'abonné qui peut naviguer et noter les différents blocs des articles
        // l'auteur (narrateur) qui peut créer des articles (et ne modifier que ses propres articles)
        // l'éditeur qui peut créer des articles et modifier les siens et ceux des autres
        // le designeur qui peut proposer des modifications du thème des articles
        // le fournisseur de données qui doit pouvoir inclure de nouveaux jeux de données (sous forme de CSV) dont il pourra s'assurer le chargement (sous forme d'un tableau) et que le système a bien identifié les variables et valeurs des tableaux fournis. Pour chaque variable, le fournisseur devra choisir si elle est catégorielle ou si elle est numérique
        // L'administrateur qui peut faire toutes les fonctionnalités

        
        /********************/
        /********USERS*******/
        /********************/

        $userAdmin = new User();
        $userAdmin->setmail("admin");
        $userAdmin->setUsername("admin");
        $userAdmin->setLastName("admin");
        $userAdmin->setFirstName("admin");
        $userAdmin->setRoles(array('ROLE_ADMIN'));
        $userAdmin->setPassword($this->hasher->hashPassword($userAdmin, '1234'));

        $manager->persist($userAdmin);
        $manager->flush();

        $userDesign = new User();
        $userDesign->setmail("design");
        $userDesign->setUsername("design");
        $userDesign->setLastName("design");
        $userDesign->setFirstName("design");
        $userDesign->setRoles(array('ROLE_DESIGN'));
        $userDesign->setPassword($this->hasher->hashPassword($userDesign, '1234'));

        $manager->persist($userDesign);
        $manager->flush();

        $userFournisseur = new User();
        $userFournisseur->setmail("fournisseur");
        $userFournisseur->setUsername("fournisseur");
        $userFournisseur->setLastName("fournisseur");
        $userFournisseur->setFirstName("fournisseur");
        $userFournisseur->setRoles(array('ROLE_FOURNISSEUR'));
        $userFournisseur->setPassword($this->hasher->hashPassword($userFournisseur, '1234'));

        $manager->persist($userFournisseur);
        $manager->flush();


        //SET ROLE

        for($i = 0; $i<10;$i++){
            $user[$i] = new User();
            $user[$i]->setmail($faker_factory->lastName() . $faker_factory->firstNameMale() . "@gmail.com" . $i);
            $user[$i]->setUsername($faker_factory->lastName() . $i);
            $user[$i]->setLastName($faker_factory->lastName() . $i);
            $user[$i]->setFirstName($faker_factory->firstNameMale() . $i);
            $user[$i]->setRoles(array('ROLE_USER'));
            $user[$i]->setPassword($this->hasher->hashPassword($user[$i], '1234'));
            $manager->persist($user[$i]);
            $manager->flush();
        }


        /***********************/
        /*********THEMES********/
        /***********************/

        $Theme = new Theme();
        $Theme->setTextColor("Red");
        $Theme->setBackgroundColor("blue");
        $Theme->setFontFamily("Verdana");
        $Theme->setFontWeight("bold");
        $Theme->setFontSize("20");
        $Theme->setDescription("Default Theme");

        $manager->persist($Theme);
        $manager->flush();


        /***********************/
        /********ARTICLES*******/
        /***********************/

        for($i = 0; $i<5;$i++){
            $article[$i] = new Article();
            $article[$i]->setTitle("Title : " . $i);
            $article[$i]->setUser($userAdmin);
            $article[$i]->setResume("Resume : " . $i);
            $article[$i]->setUserId($userAdmin->getId());
            $article[$i]->setOwner($userAdmin->getUsername());


            $manager->persist($article[$i]);
            $manager->flush();

            for($k = 0; $k<1;$k++){
                $Bloc[$k] = new Bloc();
                $Bloc[$k]->setBlocType('BlocType');
                $Bloc[$k]->setTitle('title');
                $Bloc[$k]->setText('text');
                $Bloc[$k]->setArticles($article[$i]);
                $Bloc[$k]->setArticleId($article[$i]->getId());
                $article[$i]->addBloc( $Bloc[$k]);

                $manager->persist($Bloc[$k]);
                $manager->flush();
            }

        }

        $manager->flush();
    }
}
